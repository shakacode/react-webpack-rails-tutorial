// Server Component - uses Node.js os module, which only exists on the server.
// This component and its dependencies are never sent to the browser.

import React from 'react';
import os from 'os';
import _ from 'lodash';

async function ServerInfo() {
  const serverInfo = {
    platform: os.platform(),
    arch: os.arch(),
    nodeVersion: process.version,
    uptime: Math.floor(os.uptime() / 3600),
    totalMemory: (os.totalmem() / (1024 * 1024 * 1024)).toFixed(1),
    freeMemory: (os.freemem() / (1024 * 1024 * 1024)).toFixed(1),
    cpus: os.cpus().length,
    hostname: os.hostname(),
  };

  // Using lodash on the server — this 70KB+ library stays server-side
  const infoEntries = _.toPairs(serverInfo);
  const grouped = _.chunk(infoEntries, 4);

  const labels = {
    platform: 'Platform',
    arch: 'Architecture',
    nodeVersion: 'Node.js',
    uptime: 'Uptime (hrs)',
    totalMemory: 'Total RAM (GB)',
    freeMemory: 'Free RAM (GB)',
    cpus: 'CPU Cores',
    hostname: 'Hostname',
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
      <p className="text-xs text-emerald-600 mb-4 font-medium">
        This data comes from the Node.js <code className="bg-emerald-100 px-1 rounded">os</code> module
        — it runs only on the server. The <code className="bg-emerald-100 px-1 rounded">lodash</code> library
        used to format it never reaches the browser.
      </p>
      <div className="grid md:grid-cols-2 gap-x-8 gap-y-1">
        {grouped.map((group, gi) => (
          <div key={gi} className="space-y-1">
            {group.map(([key, value]) => (
              <div key={key} className="flex justify-between py-1.5 border-b border-emerald-100 last:border-0">
                <span className="text-sm text-emerald-700 font-medium">{labels[key] || key}</span>
                <span className="text-sm text-emerald-900 font-mono">{value}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServerInfo;
