import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NavLink as Link } from 'react-router-dom';

const routeLinkClassName = ({ isActive }) =>
  classNames(
    'inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold transition',
    isActive
      ? 'border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-200'
      : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700',
  );

/* eslint-disable react/prefer-stateless-function */
export default class Layout extends Component {
  render() {
    const { children } = this.props;

    return (
      <section className="space-y-6">
        <header className="rounded-[2rem] border border-slate-200 bg-white/90 px-6 py-7 shadow-[0_24px_60px_-46px_rgba(15,23,42,0.35)] sm:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">
              React Router Demo
            </p>
            <h2 className="mt-3 text-3xl text-slate-900 sm:text-4xl">The same comments app, with routing.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Sasah, Use the pills to view the comments route, a plain routed screen, and a redirect back to root.
            </p>
          </div>

          <details className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <summary className="cursor-pointer text-sm font-semibold text-slate-900">
              What this demo proves
            </summary>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>Server render first, then hydrate on the client.</li>
              <li>Keep routing and comments in the same Redux-backed flow.</li>
              <li>Verify redirects still resolve cleanly after SSR.</li>
            </ul>
          </details>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link end to="/" className={routeLinkClassName}>
              Comments
            </Link>
            <Link to="/react-router" className={routeLinkClassName}>
              Route
            </Link>
            <Link to="/react-router/redirect" className={routeLinkClassName}>
              Redirect
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
