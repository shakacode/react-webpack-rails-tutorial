#!/usr/bin/env python3
import json
import urllib.request
import websocket
import ssl

# Get the WebSocket debugger URL
response = urllib.request.urlopen('http://localhost:9222/json')
tabs = json.loads(response.read())

if not tabs:
    print("No Chrome tabs found")
    exit(1)

# Use the first tab (the one we saw with the PR review app)
tab = tabs[0]
ws_url = tab['webSocketDebuggerUrl']

print(f"📱 Connecting to tab: {tab['title']}")
print(f"🔗 URL: {tab['url']}\n")

# Connect via WebSocket
ws = websocket.create_connection(ws_url, sslopt={"cert_reqs": ssl.CERT_NONE})

# Enable Network domain
ws.send(json.dumps({"id": 1, "method": "Network.enable"}))
response = json.loads(ws.recv())
print(f"✅ Network enabled: {response}\n")

# Enable Page domain
ws.send(json.dumps({"id": 2, "method": "Page.enable"}))
response = json.loads(ws.recv())
print(f"✅ Page enabled: {response}\n")

# Get the current HTML content
ws.send(json.dumps({
    "id": 3,
    "method": "Runtime.evaluate",
    "params": {
        "expression": "document.documentElement.outerHTML"
    }
}))

# Collect responses
responses = []
found_early_hints = False

for i in range(10):  # Read a few messages
    try:
        msg = ws.recv()
        data = json.loads(msg)

        if 'id' in data and data['id'] == 3:
            # This is our HTML response
            if 'result' in data and 'result' in data['result']:
                html = data['result']['result']['value']

                # Search for Early Hints debug comments
                if 'Early Hints' in html:
                    print("🎉 Found Early Hints debug comments in HTML!\n")

                    # Extract the comments
                    import re
                    matches = re.findall(r'<!--[\s\S]*?Early Hints[\s\S]*?-->', html)
                    for match in matches:
                        print(match)
                        print()
                    found_early_hints = True
                else:
                    print("❌ No Early Hints debug comments found in HTML")

                # Check for Link headers in the HTML head
                if 'rel=preload' in html or 'rel="preload"' in html:
                    print("\n✅ Found preload links in HTML:")
                    preload_matches = re.findall(r'<link[^>]*rel=["\']preload["\'][^>]*>', html)
                    for link in preload_matches[:5]:
                        print(f"  {link}")
                break

    except Exception as e:
        break

ws.close()

if found_early_hints:
    print("\n✅ SUCCESS: Early Hints are working!")
else:
    print("\n⚠️  Could not verify Early Hints in the current page state")
    print("The page may need to be reloaded to capture HTTP 103 responses")
