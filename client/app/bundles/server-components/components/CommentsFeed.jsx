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

async function CommentsFeed() {
  // Simulate network latency to demonstrate streaming
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Fetch comments directly from the Rails API — no client-side fetch needed
  const response = await fetch('http://localhost:3000/comments.json');
  const comments = await response.json();

  // Use lodash to process (stays on server)
  const sortedComments = _.orderBy(comments, ['created_at'], ['desc']);
  const recentComments = _.take(sortedComments, 10);

  if (recentComments.length === 0) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
        <p className="text-amber-700">
          No comments yet. Add some comments from the{' '}
          <a href="/" className="underline font-medium">home page</a> to see them rendered here
          by server components.
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
        {recentComments.length} comment{recentComments.length !== 1 ? 's' : ''} rendered on the server using
        {' '}<code>marked</code> + <code>sanitize-html</code> (never sent to browser)
      </p>
    </div>
  );
}

export default CommentsFeed;
