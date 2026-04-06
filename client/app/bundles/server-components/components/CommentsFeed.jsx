// Server Component - fetches comments directly from the Rails API on the server.
// Uses marked for markdown rendering. Both fetch and marked stay server-side.

import React from 'react';
import { Marked } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import sanitizeHtml from 'sanitize-html';
import _ from 'lodash';
import TogglePanel from './TogglePanel';

const marked = new Marked();
marked.use(gfmHeadingId());

function resolveRailsBaseUrl() {
  if (process.env.RAILS_INTERNAL_URL) {
    return process.env.RAILS_INTERNAL_URL;
  }

  // Local defaults are okay in development/test, but production should be explicit.
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    return 'http://localhost:3000';
  }

  throw new Error('RAILS_INTERNAL_URL must be set outside development/test');
}

async function CommentsFeed() {
  // Simulate network latency only when explicitly enabled for demos.
  if (process.env.RSC_SUSPENSE_DEMO_DELAY === 'true') {
    await new Promise((resolve) => {
      setTimeout(resolve, 800);
    });
  }

  let recentComments = [];
  try {
    // Fetch comments directly from the Rails API — no client-side fetch needed
    const baseUrl = resolveRailsBaseUrl();
    const response = await fetch(`${baseUrl}/comments.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch comments: ${response.status} ${response.statusText}`);
    }
    const comments = await response.json();

    // Use lodash to process (stays on server)
    const sortedComments = _.orderBy(comments, ['created_at'], ['desc']);
    recentComments = _.take(sortedComments, 10);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('CommentsFeed failed to load comments', error);
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-lg p-6 text-center">
        <p className="text-rose-700">Could not load comments right now. Please try again later.</p>
      </div>
    );
  }

  if (recentComments.length === 0) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
        <p className="text-amber-700">
          No comments yet. Add some comments from the{' '}
          <a href="/" className="underline font-medium">
            home page
          </a>{' '}
          to see them rendered here by server components.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {recentComments.map((comment) => {
        // Render markdown on the server using marked + sanitize-html.
        // sanitize-html strips any dangerous HTML before rendering.
        // These libraries (combined ~200KB) never reach the client.
        const rawHtml = marked.parse(comment.text || '');
        const safeHtml = sanitizeHtml(rawHtml, {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
          allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            img: ['src', 'alt', 'title', 'width', 'height'],
          },
          allowedSchemes: ['https', 'http'],
        });

        return (
          <div
            key={comment.id}
            className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-slate-800">{comment.author}</span>
              <span className="text-xs text-slate-400">
                {new Date(comment.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            <TogglePanel title="Show rendered markdown">
              {/* Content is sanitized via sanitize-html before rendering */}
              {/* eslint-disable-next-line react/no-danger */}
              <div
                className="prose prose-sm prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: safeHtml }}
              />
            </TogglePanel>
            <p className="text-slate-600 text-sm mt-1">{comment.text}</p>
          </div>
        );
      })}
      <p className="text-xs text-slate-400 text-center pt-2">
        {recentComments.length} comment{recentComments.length !== 1 ? 's' : ''} rendered on the server using{' '}
        <code>marked</code> + <code>sanitize-html</code> (never sent to browser)
      </p>
    </div>
  );
}

export default CommentsFeed;
