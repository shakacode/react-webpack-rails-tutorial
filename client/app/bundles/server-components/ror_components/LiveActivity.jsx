import React from 'react';
import os from 'os';

async function LiveActivity({ simulateError = false }) {
  if (simulateError) {
    throw new Error('Simulated server-side render failure (demo)');
  }

  // Small delay so the refresh-in-flight state is visible.
  await new Promise((resolve) => {
    setTimeout(resolve, 300);
  });

  const stats = {
    serverTime: new Date().toISOString(),
    freeMemoryMB: Math.round(os.freemem() / (1024 * 1024)),
    uptimeHours: Math.floor(os.uptime() / 3600),
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-5">
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <div className="text-xs text-indigo-600 font-medium uppercase tracking-wide mb-1">
            Server Time
          </div>
          <div className="font-mono text-indigo-900">{stats.serverTime}</div>
        </div>
        <div>
          <div className="text-xs text-indigo-600 font-medium uppercase tracking-wide mb-1">
            Free RAM
          </div>
          <div className="font-mono text-indigo-900">{stats.freeMemoryMB} MB</div>
        </div>
        <div>
          <div className="text-xs text-indigo-600 font-medium uppercase tracking-wide mb-1">
            Uptime (hrs)
          </div>
          <div className="font-mono text-indigo-900">{stats.uptimeHours}</div>
        </div>
      </div>
    </div>
  );
}

export default LiveActivity;
