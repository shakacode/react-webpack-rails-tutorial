import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NavLink as Link } from 'react-router-dom';

const routeLinkClassName = ({ isActive }) =>
  classNames(
    'inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold transition',
    isActive
      ? 'border-amber-300 bg-amber-300 text-slate-900 shadow-lg shadow-amber-200'
      : 'border-white/10 bg-white/5 text-slate-100 hover:border-sky-300/50 hover:bg-white/10 hover:text-white',
  );

/* eslint-disable react/prefer-stateless-function */
export default class Layout extends Component {
  render() {
    const { children } = this.props;

    return (
      <section className="space-y-8">
        <header className="overflow-hidden rounded-[2rem] bg-slate-900 px-6 py-7 text-slate-100 shadow-[0_26px_70px_-42px_rgba(15,23,42,0.7)] sm:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">
              Router Playground
            </p>
            <h2 className="mt-3 text-3xl text-white sm:text-4xl">Switch between the three router states.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Root comments, a route transition, and a redirect all live in this same server-rendered bundle.
            </p>
          </div>

          <details className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
            <summary className="cursor-pointer text-sm font-semibold text-white">
              Why this section exists
            </summary>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>Server render first, then hydrate on the client.</li>
              <li>Keep routing and comments in the same Redux-backed flow.</li>
              <li>Verify redirects still resolve cleanly after SSR.</li>
            </ul>
          </details>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link end to="/" className={routeLinkClassName}>
              Comments (Root URL)
            </Link>
            <Link to="/react-router" className={routeLinkClassName}>
              Test React Router (&apos;/react-router&apos;)
            </Link>
            <Link to="/react-router/redirect" className={routeLinkClassName}>
              Test Redirect (url to &apos;/react-router/redirect&apos; which goes to root &apos;/&apos;)
            </Link>
          </div>
        </header>

        {children}
      </section>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
