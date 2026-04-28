// Server Component - this entire component runs on the server.
// It can use Node.js APIs and server-only dependencies directly.
// None of these imports are shipped to the client bundle.

/* eslint-disable react/prop-types -- React 19 no longer validates propTypes at runtime; using ES default destructuring instead */

import React, { Suspense } from 'react';
import ServerInfo from '../components/ServerInfo';
import CommentsFeed from '../components/CommentsFeed';
import TogglePanel from '../components/TogglePanel';
import LiveActivityRefresher from '../components/LiveActivityRefresher';

const ServerComponentsPage = ({ comments = [] }) => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          React Server Components Demo
        </h1>
        <p className="text-slate-600 text-lg">
          This page is rendered using <strong>React Server Components</strong> with React on Rails Pro.
          Server components run on the server and stream their output to the client, keeping
          heavy dependencies out of the browser bundle entirely.
        </p>
      </header>

      <div className="space-y-8">
        {/* Server Info - uses Node.js os module (impossible on client) */}
        <section>
          <h2 className="text-xl font-semibold text-slate-700 mb-4 flex items-center gap-2">
            Server Environment
            <span className="text-xs font-normal bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
              Server Only
            </span>
          </h2>
          <ServerInfo />
        </section>

        {/* Interactive toggle - demonstrates mixing server + client components */}
        <section>
          <h2 className="text-xl font-semibold text-slate-700 mb-4 flex items-center gap-2">
            Interactive Client Component
            <span className="text-xs font-normal bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
              Client Hydrated
            </span>
          </h2>
          <TogglePanel title="How does this work?">
            <div className="prose prose-slate max-w-none text-sm">
              <p>
                This toggle is a <code>&apos;use client&apos;</code> component, meaning it ships JavaScript
                to the browser for interactivity. But the content inside is rendered on the server
                and passed as children — a key RSC pattern called the <strong>donut pattern</strong>.
              </p>
              <ul>
                <li>The <code>TogglePanel</code> wrapper runs on the client (handles click events)</li>
                <li>The children content is rendered on the server (no JS cost)</li>
                <li>Heavy libraries used by server components never reach the browser</li>
              </ul>
            </div>
          </TogglePanel>
        </section>

        {/* Client-fetched server component via RSCRoute + ErrorBoundary */}
        <section>
          <h2 className="text-xl font-semibold text-slate-700 mb-4 flex items-center gap-2">
            Live Server Activity
            <span className="text-xs font-normal bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
              RSCRoute + ErrorBoundary
            </span>
          </h2>
          <p className="text-slate-500 text-sm mb-4">
            Click <strong>Refresh</strong> to fetch a new RSC payload — the server re-renders
            this section and streams the result back, no client-side JSON parsing or loading
            state plumbing. Click <strong>Simulate Error</strong> to make the server component
            throw; the failure surfaces as <code>ServerComponentFetchError</code> and is
            caught by <code>&lt;ErrorBoundary&gt;</code>, which renders a Retry button that
            calls <code>refetchComponent</code> with corrected props.
          </p>
          <LiveActivityRefresher />
        </section>

        {/* Async data fetching with Suspense streaming */}
        <section>
          <h2 className="text-xl font-semibold text-slate-700 mb-4 flex items-center gap-2">
            Streamed Comments
            <span className="text-xs font-normal bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
              Async + Suspense
            </span>
          </h2>
          <p className="text-slate-500 text-sm mb-4">
            Comments come from the Rails controller as props — the canonical React on Rails Pro
            pattern. The page shell renders immediately while this section streams in
            progressively as Suspense boundaries resolve.
          </p>
          <Suspense
            fallback={
              <div className="animate-pulse space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-slate-100 rounded-lg p-4">
                    <div className="h-4 bg-slate-200 rounded w-1/4 mb-2" />
                    <div className="h-3 bg-slate-200 rounded w-3/4" />
                  </div>
                ))}
              </div>
            }
          >
            <CommentsFeed comments={comments} />
          </Suspense>
        </section>

        {/* Architecture explanation */}
        <section className="bg-slate-50 border border-slate-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-700 mb-3">
            What makes this different?
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600">
            <div>
              <h3 className="font-medium text-slate-800 mb-1">Smaller Client Bundle</h3>
              <p>
                Libraries like <code>lodash</code>, <code>marked</code>, and Node.js <code>os</code> module
                are used on this page but never downloaded by the browser.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-slate-800 mb-1">Direct Data Access</h3>
              <p>
                Server components fetch data by calling your Rails API internally — no
                client-side fetch waterfalls or loading spinners for initial data.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-slate-800 mb-1">Progressive Streaming</h3>
              <p>
                The page shell renders instantly. Async components (like the comments feed)
                stream in as their data resolves, with Suspense boundaries showing fallbacks.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-slate-800 mb-1">Selective Hydration</h3>
              <p>
                Only client components (like the toggle above) receive JavaScript.
                Everything else is pure HTML — zero hydration cost.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServerComponentsPage;
