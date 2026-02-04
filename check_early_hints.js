const http = require('http');
const WebSocket = require('ws');

// Fetch Chrome tabs
const req = http.get('http://localhost:9222/json', (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    const tabs = JSON.parse(data);

    if (tabs.length === 0) {
      console.log('No Chrome tabs found');
      process.exit(1);
    }

    const tab = tabs[0];
    console.log(`📱 Tab: ${tab.title}`);
    console.log(`🔗 URL: ${tab.url}\n`);

    // Connect to WebSocket
    const ws = new WebSocket(tab.webSocketDebuggerUrl);

    let msgId = 1;

    ws.on('open', () => {
      console.log('✅ Connected to Chrome DevTools Protocol\n');

      // Enable Runtime
      ws.send(
        JSON.stringify({
          id: msgId,
          method: 'Runtime.enable',
        }),
      );
      msgId += 1;

      // Get HTML content
      setTimeout(() => {
        ws.send(
          JSON.stringify({
            id: msgId,
            method: 'Runtime.evaluate',
            params: {
              expression: 'document.documentElement.outerHTML',
            },
          }),
        );
        msgId += 1;
      }, 500);
    });

    ws.on('message', (msgData) => {
      try {
        const msg = JSON.parse(msgData);

        if (msg.result && msg.result.result && msg.result.result.value) {
          const html = msg.result.result.value;

          // Look for Early Hints debug comments
          const earlyHintsMatch = html.match(/<!--[\s\S]*?Early Hints[\s\S]{0,500}?-->/g);

          let earlyHintsFound = false;

          if (earlyHintsMatch) {
            earlyHintsFound = true;
            console.log('🎉 Found Early Hints debug comments in HTML!\n');
            earlyHintsMatch.forEach((match) => {
              console.log(match);
              console.log();
            });
            console.log('\n✅ SUCCESS: Early Hints are configured and working!');
          } else {
            console.log('❌ No Early Hints debug comments found in HTML');
            console.log('This might mean:');
            console.log('  - Early hints are not enabled');
            console.log('  - The deployment is not running the latest code');
            console.log('  - The page needs to be reloaded');
          }

          // Also check for Link headers with preload
          const linkMatches = html.match(/<link[^>]*rel=["']preload["'][^>]*>/g);
          if (linkMatches) {
            console.log(`\n📦 Found ${linkMatches.length} preload links in HTML head:`);
            linkMatches.slice(0, 5).forEach((link) => {
              console.log(`  ${link}`);
            });
          }

          ws.close();
          process.exit(earlyHintsFound ? 0 : 1);
        }
      } catch (e) {
        // Ignore parse errors for other messages
      }
    });

    ws.on('error', (err) => {
      console.error('❌ WebSocket error:', err.message);
      process.exit(1);
    });

    // Timeout after 5 seconds
    setTimeout(() => {
      console.log('⏱️ Timeout - no HTML received');
      ws.close();
      process.exit(1);
    }, 5000);
  });
});

req.on('error', (err) => {
  console.error('❌ Error connecting to Chrome:', err.message);
  console.log('\nMake sure Chrome is running with:');
  console.log('  --remote-debugging-port=9222');
  process.exit(1);
});
