'use client';

import React, { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import RSCRoute from 'react-on-rails-pro/RSCRoute';
import { useRSC } from 'react-on-rails-pro/RSCProvider';

const LiveActivityRefresher = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [simulateError, setSimulateError] = useState(false);
  const { refetchComponent } = useRSC();

  const handleRefresh = () => {
    setSimulateError(false);
    setRefreshKey((k) => k + 1);
  };

  const handleSimulateError = () => {
    setSimulateError(true);
    setRefreshKey((k) => k + 1);
  };

  // refetchComponent primes the cache with corrected props before resetting
  // the boundary, so the post-reset render hits cache instead of re-fetching.
  const buildRetry = (resetErrorBoundary) => () => {
    const newKey = refreshKey + 1;
    setSimulateError(false);
    setRefreshKey(newKey);
    refetchComponent('LiveActivity', { simulateError: false, refreshKey: newKey })
      // eslint-disable-next-line no-console
      .catch((err) => console.error('Retry refetch failed:', err))
      .finally(() => resetErrorBoundary());
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleRefresh}
          className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Refresh
        </button>
        <button
          type="button"
          onClick={handleSimulateError}
          className="px-3 py-1.5 text-sm bg-amber-100 text-amber-800 border border-amber-300 rounded hover:bg-amber-200"
        >
          Simulate Error
        </button>
        <span className="text-xs text-slate-500 ml-2">Refresh count: {refreshKey}</span>
      </div>
      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => (
          <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
            <p className="text-rose-700 font-semibold mb-1">Server component fetch failed</p>
            <p className="text-rose-600 text-sm font-mono mb-3">{error.message}</p>
            <button
              type="button"
              onClick={buildRetry(resetErrorBoundary)}
              className="px-3 py-1.5 text-sm bg-rose-600 text-white rounded hover:bg-rose-700"
            >
              Retry
            </button>
          </div>
        )}
        resetKeys={[refreshKey]}
      >
        <RSCRoute componentName="LiveActivity" componentProps={{ simulateError, refreshKey }} />
      </ErrorBoundary>
    </div>
  );
};

export default LiveActivityRefresher;
