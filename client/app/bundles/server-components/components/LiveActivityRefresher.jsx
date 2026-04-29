'use client';

import React, { useState, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import RSCRoute from 'react-on-rails-pro/RSCRoute';
import { useRSC } from 'react-on-rails-pro/RSCProvider';

// Same shape and dimensions as the rendered LiveActivity card. Local Suspense
// fallback prevents the RSCRoute suspension from bubbling to an outer
// boundary, which would collapse the whole page during in-flight fetches.
const ActivityCardSkeleton = () => (
  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-5">
    <div className="grid grid-cols-3 gap-4 text-sm">
      {['Server Time', 'Free RAM', 'Uptime (hrs)'].map((label) => (
        <div key={label}>
          <div className="text-xs text-indigo-600 font-medium uppercase tracking-wide mb-1">
            {label}
          </div>
          <div className="font-mono text-indigo-300 animate-pulse">—</div>
        </div>
      ))}
    </div>
  </div>
);

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
        // react-error-boundary's fallbackRender is a render-prop API by design;
        // the closure captures buildRetry which depends on parent state.
        // eslint-disable-next-line react/no-unstable-nested-components
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
        <Suspense fallback={<ActivityCardSkeleton />}>
          <RSCRoute componentName="LiveActivity" componentProps={{ simulateError, refreshKey }} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default LiveActivityRefresher;
