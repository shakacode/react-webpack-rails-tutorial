import React from 'react';
import { Marked } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import sanitizeHtml from 'sanitize-html';
import TogglePanel from './TogglePanel';

const marked = new Marked();
marked.use(gfmHeadingId());

// Opt-in delay so the surrounding <Suspense> fallback is visible in the demo.
// Set RSC_SUSPENSE_DEMO_DELAY=true to enable; defaults off in production.
async function CommentsFeed({ comments = [] }) {
  if (process.env.RSC_SUSPENSE_DEMO_DELAY === 'true') {
    await new Promise((resolve) => {
      setTimeout(resolve, 800);
    });
  }

  if (comments.length === 0) {
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
      {comments.map((comment) => {
        // marked + sanitize-html (~200KB combined) stay server-side.
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
        {comments.length} comment{comments.length !== 1 ? 's' : ''} rendered on the server using{' '}
        <code>marked</code> + <code>sanitize-html</code> (never sent to browser)
      </p>
    </div>
  );
}

export default CommentsFeed;
