# Manual Verification Guide: Early Hints

This guide shows you how to manually verify that HTTP 103 Early Hints are working using Chrome DevTools.

## Prerequisites

- Chrome, Edge, or Firefox browser (with HTTP/2 103 support)
- Access to the PR review app URL: https://rails-pdzxq1kxxwqg8.cpln.app/

## Method 1: Chrome DevTools Network Tab (Recommended)

### Step 1: Open the PR Review App

1. Open Chrome/Edge in **Incognito/Private mode** (to avoid cache)
2. Press `Cmd+Option+I` (Mac) or `F12` (Windows/Linux) to open DevTools
3. Click the **Network** tab
4. **Important:** Check "Disable cache" checkbox in Network tab
5. Navigate to: https://rails-pdzxq1kxxwqg8.cpln.app/

### Step 2: Look for Early Hints Evidence

#### What You Should See (if early hints work):

In the Network tab, look at the very first request (the document):

**Option A: Separate 103 Entry (Best Case)**
```
Name                    Status    Protocol    Type
/                       103       h2          early-hints
/                       200       h2          document
```

You'll see **two entries** for the same URL - one with status 103, then 200.

**Option B: Headers Tab (More Common)**

Click on the main document request, then check the **Headers** tab. Look for:

1. **Response Headers** section might show informational responses
2. Look for `Link:` headers with `rel=preload`
3. Check the **Timing** tab - early hints may show up as negative start time

#### What Proves Early Hints Are Working:

✅ **CSS/JS files start loading before HTML finishes**
- In the Network waterfall, look at the timing
- CSS files like `RouterApp-xxx.css` and `stimulus-bundle-xxx.css` should:
  - Start downloading VERY early (before HTML response completes)
  - Show earlier "Start Time" than expected
  - Have overlapping time with the document request

✅ **HTML contains debug comments**
- Click on the document request
- Go to **Response** tab
- Search for "Early Hints" in the HTML
- Look for comments like:
  ```html
  <!-- Shakapacker Early Hints: HTTP/1.1 103 SENT -->
  <!--   Total Links: 2 -->
  ```

### Step 3: Take Screenshots

For documentation, take screenshots of:
1. Network tab showing the waterfall with early asset loading
2. Response tab showing the HTML debug comments
3. Headers tab showing Link headers

## Method 2: Firefox Developer Tools

Firefox has better support for displaying informational responses:

1. Open Firefox
2. Press `Cmd+Option+I` or `F12`
3. Go to **Network** tab
4. Load: https://rails-pdzxq1kxxwqg8.cpln.app/
5. Look in the **Status** column for `103` entries

Firefox tends to show HTTP 103 responses more explicitly than Chrome.

## Method 3: curl with HTTP/2 Debugging

For command-line verification:

```bash
# Verbose curl to see all HTTP frames
curl -v --http2 https://rails-pdzxq1kxxwqg8.cpln.app/ 2>&1 | less

# Look for lines like:
# < HTTP/2 103
# < link: ...
# < HTTP/2 200
```

**Note:** curl may not display 103 responses clearly. The HTML debug comments are more reliable.

## Method 4: Chrome Network Log Export

For detailed analysis:

1. Open DevTools → Network tab
2. Load the page
3. Right-click in the Network tab → **Save all as HAR with content**
4. Save the file as `early-hints-test.har`
5. Open the HAR file in a text editor
6. Search for `"status": 103` to find early hints responses

## Expected Results

### ✅ Working Early Hints

You should observe:

1. **HTML debug comments present:**
   ```html
   <!-- Shakapacker Early Hints: HTTP/1.1 103 SENT -->
   <!--   Total Links: 2 -->
   <!--   CSS Packs: generated/RouterApp, stimulus-bundle -->
   ```

2. **Link headers in response:**
   ```
   link: </packs/css/generated/RouterApp-xxx.css>; rel=preload; as=style
   ```

3. **Early asset loading:**
   - CSS files start loading very early in the waterfall
   - Assets load in parallel with HTML being received

4. **Possible HTTP 103 status in Network tab** (browser-dependent)

### ❌ NOT Working Early Hints

If early hints aren't working, you'd see:

1. No HTML debug comments about early hints
2. No Link headers in response
3. Assets only start loading AFTER HTML fully received
4. No 103 status codes anywhere

## What We Already Know from curl

From curl testing the PR review app:

```bash
$ curl https://rails-pdzxq1kxxwqg8.cpln.app/ 2>&1 | grep -A5 "Early Hints"
```

**Result:**
```html
<!-- Shakapacker Early Hints: HTTP/1.1 103 SENT -->
<!--   Total Links: 2 -->
<!--   Packs: generated/RouterApp, generated/NavigationBarApp, generated/Footer, stimulus-bundle -->
<!--   CSS Packs: generated/RouterApp, generated/NavigationBarApp, generated/Footer, stimulus-bundle -->
<!--   Headers: -->
<!--     </packs/css/generated/RouterApp-f6749bde.css>; rel=preload; as=style; crossorigin="anonymous" -->
<!--     </packs/css/stimulus-bundle-165ebf44.css>; rel=preload; as=style; crossorigin="anonymous" -->
<!--   Note: Browsers only process the FIRST 103 response -->
<!--   Note: Puma only supports HTTP/1.1 Early Hints (not HTTP/2) -->
```

✅ This proves Rails is **attempting** to send early hints.
❓ Browser verification needed to confirm they're **received**.

## Troubleshooting

### "I don't see any 103 responses"

This is normal! Many browsers don't display 103 in the UI clearly. Instead:
- Check for early asset loading in the waterfall
- Look for the HTML debug comments
- Verify Link headers are present

### "Assets aren't loading early"

Possible reasons:
1. Browser cache is active (use Incognito mode)
2. Browser doesn't support HTTP/2 103
3. Connection is too fast to see the benefit
4. Early hints are being stripped by a proxy

### "Only seeing HTTP 200 responses"

Check:
1. Are you testing the correct URL? (PR review app, not production)
2. Is the PR deployed? Check GitHub Actions status
3. Try Firefox instead of Chrome (better 103 support)

## Comparing With and Without Cloudflare

To see the difference Cloudflare makes:

**With Cloudflare (Production):**
```bash
curl -I https://reactrails.com/ | grep -E "server:|cf-"
# Should show:
# server: cloudflare
# cf-ray: xxxx
```

**Without Cloudflare (PR Review App):**
```bash
curl -I https://rails-pdzxq1kxxwqg8.cpln.app/ | grep -E "server:|cf-"
# Should show:
# server: undefined
# (no cf-ray header)
```

Only the PR review app (direct Control Plane) will show early hints working.

## Next Steps

After manual verification:

1. **If early hints work:** Document the browser screenshots in the PR
2. **If they don't work:** Investigate Rails/Puma configuration
3. **Compare production:** Test production after merging to see Cloudflare impact

## Additional Resources

- [Chrome DevTools Network Tab Guide](https://developer.chrome.com/docs/devtools/network/)
- [HTTP 103 Early Hints Spec (RFC 8297)](https://datatracker.ietf.org/doc/html/rfc8297)
- [Web.dev: Early Hints](https://web.dev/early-hints/)
- [Shakapacker Early Hints PR #722](https://github.com/shakacode/shakapacker/pull/722)
