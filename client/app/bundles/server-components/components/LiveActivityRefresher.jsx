'use client';

import React, { useState, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import RSCRoute from 'react-on-rails-pro/RSCRoute';
import { useRSC } from 'react-on-rails-pro/RSCProvider';
import { ServerComponentFetchError } from 'react-on-rails-pro/ServerComponentFetchError';

// Same shape and dimensions as the rendered LiveActivity card. Local Suspense
// fallback prevents the RSCRoute suspension from bubbling to an outer
// boundary, which would collapse the whole page during in-flight fetches.
function ActivityCardSkeleton() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-5">
      <div className="grid grid-cols-3 gap-4 text-sm">
        {['Server Time', 'Free RAM', 'Uptime (hrs)'].map((label) => (
          <div key={label}>
            <div className="text-xs text-indigo-600 font-medium uppercase tracking-wide mb-1">{label}</div>
            <div className="font-mono text-indigo-300 animate-pulse">—</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityErrorFallback({ error, onRetry }) {
  return (
    <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
      <p className="text-rose-700 font-semibold mb-1">Server component fetch failed</p>
      <p className="text-rose-600 text-sm font-mono mb-3">{error.message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="px-3 py-1.5 text-sm bg-rose-600 text-white rounded hover:bg-rose-700"
      >
        Retry
      </button>
    </div>
  );
}

function toServerComponentFetchError(error, componentProps) {
  if (error instanceof ServerComponentFetchError) {
    return error;
  }

  const originalError = error instanceof Error ? error : new Error(String(error));
  return new ServerComponentFetchError(originalError.message, 'LiveActivity', componentProps, originalError);
}

function ThrowActivityError({ error }) {
  throw error;
}

function LiveActivityRefresher() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [fetchError, setFetchError] = useState(null);
  const { refetchComponent } = useRSC();

  const refetchLiveActivity = (componentProps) =>
    refetchComponent('LiveActivity', componentProps, true).then((payload) => {
      if (payload instanceof Error) {
        throw payload;
      }
    });

  const handleRefresh = () => {
    setFetchError(null);
    setRefreshKey((k) => k + 1);
  };

  const handleSimulateError = () => {
    const nextKey = refreshKey + 1;
    const errorProps = { simulateError: true, refreshKey: nextKey };

    setFetchError(null);
    setRefreshKey(nextKey);
    refetchLiveActivity(errorProps).catch((error) => {
      setFetchError(toServerComponentFetchError(error, errorProps));
    });
  };

  // refetchComponent primes the cache with corrected props before resetting
  // the boundary, so the post-reset render hits cache instead of re-fetching.
  const handleRetry = () => {
    const newKey = refreshKey + 1;
    const correctedProps = { simulateError: false, refreshKey: newKey };

    setFetchError(null);
    setRefreshKey(newKey);
    refetchLiveActivity(correctedProps)
      // eslint-disable-next-line no-console
      .catch((err) => {
        console.error('Retry refetch failed:', err);
        setFetchError(toServerComponentFetchError(err, correctedProps));
      });
  };

  const buildBoundaryRetry = (resetErrorBoundary) => () => {
    handleRetry();
    resetErrorBoundary();
  };

  const componentProps = { simulateError: false, refreshKey };

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
        // the closure captures retry state from this component.
        // eslint-disable-next-line react/no-unstable-nested-components
        fallbackRender={({ error, resetErrorBoundary }) => (
          <ActivityErrorFallback error={error} onRetry={buildBoundaryRetry(resetErrorBoundary)} />
        )}
        resetKeys={[refreshKey]}
      >
        {fetchError ? (
          <ThrowActivityError error={fetchError} />
        ) : (
          <Suspense fallback={<ActivityCardSkeleton />}>
            <RSCRoute componentName="LiveActivity" componentProps={componentProps} />
          </Suspense>
        )}
      </ErrorBoundary>
    </div>
  );
}

export default LiveActivityRefresher;
