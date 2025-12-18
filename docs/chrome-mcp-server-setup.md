# Chrome MCP Server Setup Guide

This guide explains how to start and use the Chrome MCP (Model Context Protocol) server for browser automation and inspection.

## What is the Chrome MCP Server?

The Chrome MCP server allows Claude to:
- Open URLs in your browser
- Take screenshots
- Inspect network traffic
- Check browser console logs
- Run accessibility/performance audits
- Get DOM elements

This is useful for verifying features like HTTP 103 Early Hints that require browser-level inspection.

## Current Status

According to Conductor settings, the browser MCP server is **enabled** but not currently running.

Error message:
```
Failed to discover browser connector server. Please ensure it's running.
```

## How to Start the Chrome MCP Server

### Method 1: Check Conductor Settings

1. Open **Conductor** preferences/settings
2. Look for **MCP Servers** or **Extensions** section
3. Find **Browser Tools** or **Chrome Connector**
4. Check if there's a **Start** or **Enable** button
5. Verify the status shows "Running" or "Connected"

### Method 2: Chrome Extension (Most Likely)

The browser MCP server typically requires a Chrome extension to act as a bridge:

1. **Check if extension is installed:**
   - Open Chrome
   - Go to `chrome://extensions/`
   - Look for "Conductor Browser Connector" or similar

2. **If not installed, you may need to:**
   - Contact Conductor support (humans@conductor.build)
   - Check Conductor documentation for extension link
   - Install from Chrome Web Store

3. **Enable the extension:**
   - Make sure it's toggled ON
   - Check for any permission requests
   - Look for a Conductor icon in Chrome toolbar

### Method 3: Local Server Process

Some MCP servers run as separate processes:

1. **Check if a process needs to be started:**
   ```bash
   # Check for any conductor or mcp processes
   ps aux | grep -i "conductor\|mcp\|browser"
   ```

2. **Look for startup scripts:**
   ```bash
   # Check Conductor app directory
   ls ~/Library/Application\ Support/com.conductor.app/

   # Look for browser-related scripts
   find ~/Library/Application\ Support/com.conductor.app/ -name "*browser*"
   ```

### Method 4: Browser with DevTools API

The MCP server might require Chrome to be launched with specific flags:

1. **Close all Chrome windows**

2. **Launch Chrome with remote debugging:**
   ```bash
   # macOS
   /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
     --remote-debugging-port=9222 \
     --remote-debugging-address=127.0.0.1

   # Or for Arc browser
   /Applications/Arc.app/Contents/MacOS/Arc \
     --remote-debugging-port=9222
   ```

3. **Verify debugging port is open:**
   ```bash
   curl http://localhost:9222/json
   # Should return JSON with browser tabs info
   ```

4. **In Conductor:** Try using the browser tools again

## Verification Steps

Once you think the server is running:

1. **Test basic connectivity:**
   - Ask Claude to take a screenshot
   - Ask Claude to open a URL
   - Check if errors are gone

2. **Example test in Conductor:**
   ```
   Can you take a screenshot of the current browser window?
   ```

3. **If successful, you should see:**
   - No "Failed to discover" error
   - Screenshot returned or action completed

## Troubleshooting

### "Failed to discover browser connector server"

**Possible causes:**
1. Chrome extension not installed or disabled
2. Chrome not running with debugging port
3. MCP server process not started
4. Firewall blocking localhost:9222
5. Wrong browser (need Chrome/Arc, not Safari/Firefox)

**Solutions:**
1. Restart Chrome with `--remote-debugging-port=9222`
2. Check Chrome extensions are enabled
3. Restart Conductor app
4. Check Conductor logs for errors

### "Extension installed but not connecting"

1. **Check extension permissions:**
   - Click the extension icon
   - Look for permission requests
   - Grant access to all sites if prompted

2. **Verify localhost access:**
   ```bash
   # Test if debugging port is accessible
   curl -v http://localhost:9222/json/version
   ```

3. **Check browser console:**
   - Open DevTools in Chrome
   - Look for errors about MCP or Conductor

### "Process running but Claude can't connect"

1. **Check port conflicts:**
   ```bash
   lsof -i :9222
   # Should show Chrome process
   ```

2. **Verify MCP server config:**
   - Check Conductor settings for correct port
   - Ensure localhost/127.0.0.1 is allowed

3. **Restart both:**
   - Quit Chrome completely
   - Restart Conductor
   - Start Chrome with debugging port
   - Try MCP tools again

## Contact Conductor Support

If you can't get it working, contact Conductor support:

**Email:** humans@conductor.build

**In your message, include:**
1. Conductor version
2. macOS version
3. Browser (Chrome/Arc) and version
4. Screenshot of the error
5. Output of:
   ```bash
   ps aux | grep -i chrome
   lsof -i :9222
   curl http://localhost:9222/json/version
   ```

They can provide:
- Specific installation instructions
- Chrome extension download link
- Configuration settings
- Debugging steps for your setup

## What to Do Meanwhile

While waiting to get the MCP server working, you can:

1. **Use manual verification:**
   - Follow `docs/verify-early-hints-manual.md`
   - Take screenshots manually
   - Export HAR files from DevTools

2. **Use curl for basic testing:**
   ```bash
   # Check HTML debug comments
   curl -s https://rails-pdzxq1kxxwqg8.cpln.app/ | grep -A10 "Early Hints"

   # Check Link headers
   curl -I https://rails-pdzxq1kxxwqg8.cpln.app/ | grep -i link
   ```

3. **Document findings manually:**
   - Open the PR review app in browser
   - Take screenshots of Network tab
   - Share with the PR for review

## Once MCP Server is Running

When the Chrome MCP server works, Claude will be able to:

1. **Open the PR review app:**
   ```
   Open https://rails-pdzxq1kxxwqg8.cpln.app/ in Chrome
   ```

2. **Inspect network traffic:**
   ```
   Show me the network logs for that page
   ```

3. **Take screenshots:**
   ```
   Take a screenshot of the Network tab waterfall
   ```

4. **Check for early hints:**
   ```
   Look for HTTP 103 responses in the network traffic
   ```

5. **Verify console output:**
   ```
   Are there any console errors?
   ```

This will provide definitive proof of whether early hints are working at the browser level.

## Alternative: Use Selenium/Playwright Directly

If the MCP server is too complex, you could also:

1. **Install Playwright:**
   ```bash
   npm install -g playwright
   playwright install chromium
   ```

2. **Create a test script:**

   > **Note:** Playwright's `page.on('response')` does not capture HTTP 1xx informational
   > responses (status 103). The browser handles 103 Early Hints as preload hints without
   > exposing them as regular Response objects. To detect Early Hints programmatically,
   > you need to use the Chrome DevTools Protocol (CDP) directly.

   ```javascript
   // verify-early-hints.js
   const { chromium } = require('playwright');

   (async () => {
     const browser = await chromium.launch();
     const context = await browser.newContext();
     const page = await context.newPage();

     // Use CDP to detect Early Hints (103 responses)
     const client = await context.newCDPSession(page);
     await client.send('Network.enable');

     // Listen for Early Hints via CDP
     client.on('Network.responseReceivedEarlyHints', (params) => {
       console.log('✅ Early Hints detected!');
       console.log('Headers:', params.headers);
     });

     // Regular responses (won't include 103)
     page.on('response', response => {
       console.log(`${response.status()} ${response.url()}`);
     });

     await page.goto('https://rails-pdzxq1kxxwqg8.cpln.app/');
     await page.screenshot({ path: 'page.png' });
     await browser.close();
   })();
   ```

3. **Run the test:**
   ```bash
   node verify-early-hints.js
   ```

This would give you programmatic verification without needing the MCP server.
