import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import _ from 'lodash';
import { injectIntl } from 'react-intl';
import BaseComponent from 'libs/components/BaseComponent';
import SelectLanguage from 'libs/i18n/selectLanguage';
import { defaultMessages, defaultLocale } from 'libs/i18n/default';
import CommentForm from './CommentForm/CommentForm';
import CommentList, { commentPropTypes } from './CommentList/CommentList';
import css from './CommentBox.module.scss';

class CommentBox extends BaseComponent {
  static propTypes = {
    pollInterval: PropTypes.number.isRequired,
    actions: PropTypes.shape({
      fetchComments: PropTypes.func,
    }),
    data: PropTypes.shape({
      isFetching: PropTypes.func,
      isSaving: PropTypes.bool,
      submitCommentError: PropTypes.string,
      $$comments: PropTypes.arrayOf(commentPropTypes),
    }).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    intl: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  constructor() {
    super();
    _.bindAll(this, ['refreshComments']);
    this.cable = null;
  }

  subscribeChannel() {
    const { messageReceived } = this.props.actions;
    const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const cableUrl = `${protocol}${window.location.hostname}:${window.location.port}/cable`;
    // ActionCable is a global added through webpack.providePlugin
    // eslint-disable-next-line no-undef
    this.cable = ActionCable.createConsumer(cableUrl);

    /* eslint no-console: ["error", { allow: ["log"] }] */
    this.cable.subscriptions.create(
      { channel: 'CommentsChannel' },
      {
        connected: () => {
          console.log('connected');
        },
        disconnected: () => {
          console.log('disconnected');
        },
        received: (comment) => {
          messageReceived(Immutable.fromJS(comment));
        },
      },
    );
  }

  componentDidMount() {
    const { fetchComments } = this.props.actions;
    fetchComments();
    this.subscribeChannel();
  }

  componentWillUnmount() {
    this.cable.subscriptions.remove({ channel: 'CommentsChannel' });
  }

  refreshComments() {
    const { fetchComments } = this.props.actions;
    fetchComments();
  }

  render() {
    const { actions, data, intl } = this.props;
    const { formatMessage } = intl;
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      exit: css.elementLeave,
      exitActive: css.elementLeaveActive,
    };
    const locale = data.get('locale') || defaultLocale;
    const isFetching = data.get('isFetching');
    const notes = [
      {
        eyebrow: 'Markdown',
        body: formatMessage(defaultMessages.descriptionSupportMarkdown),
      },
      {
        eyebrow: 'Cleanup',
        body: formatMessage(defaultMessages.descriptionDeleteRule),
      },
      {
        eyebrow: 'Validation',
        body: formatMessage(defaultMessages.descriptionSubmitRule),
      },
      {
        eyebrow: 'Realtime',
        body: formatMessage(defaultMessages.descriptionSeeActionCable),
      },
    ];

    return (
      <div className="commentBox space-y-8">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
          <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-[0_24px_60px_-42px_rgba(14,165,233,0.45)] sm:p-7">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">Live Data</p>
                <h2 className="mt-3 text-4xl text-slate-900">
                  {formatMessage(defaultMessages.comments)}
                  {isFetching && ` ${formatMessage(defaultMessages.loading)}`}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                  This widget exercises the tutorial&apos;s full stack: Rails endpoints, server rendering,
                  Redux state, Markdown rendering, and Action Cable updates.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 shadow-sm shadow-slate-200">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Language</p>
                <div className="mt-2">{SelectLanguage(actions.setLocale, locale)}</div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                className="inline-flex items-center rounded-full bg-sky-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-800"
                onClick={this.refreshComments}
                type="button"
              >
                {formatMessage(defaultMessages.descriptionForceRefrech)}
              </button>
              <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
                Polling every 60 seconds
              </div>
              <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-800">
                {isFetching ? 'Refreshing comments now' : 'Action Cable subscription active'}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            {notes.map((note) => (
              <div
                key={note.eyebrow}
                className="rounded-[1.6rem] border border-slate-200 bg-slate-50/90 p-5 shadow-sm shadow-slate-200"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                  {note.eyebrow}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{note.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-[0_24px_70px_-52px_rgba(15,23,42,0.5)] sm:p-7">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                Write Something
              </p>
              <h3 className="mt-3 text-3xl text-slate-900">
                Post a new comment in the layout that fits your use case.
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Switch between horizontal, stacked, and inline form layouts to see how the same Rails-backed
                workflow adapts to different interface constraints.
              </p>
            </div>

            <CommentForm
              isSaving={data.get('isSaving')}
              error={{ error: data.get('submitCommentError'), nodeRef: React.createRef(null) }}
              actions={actions}
              cssTransitionGroupClassNames={cssTransitionGroupClassNames}
            />
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-[0_24px_70px_-52px_rgba(15,23,42,0.5)] sm:p-7">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">Stream</p>
              <h3 className="mt-3 text-3xl text-slate-900">
                Recent comments render below with Markdown support.
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Submitted Markdown is sanitized before display, so the example demonstrates both richer
                content and safe rendering.
              </p>
            </div>

            <CommentList
              $$comments={data.get('$$comments')}
              error={data.get('fetchCommentError')}
              cssTransitionGroupClassNames={cssTransitionGroupClassNames}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(CommentBox);
