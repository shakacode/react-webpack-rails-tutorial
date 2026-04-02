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
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">
                Router Playground
              </p>
              <h2 className="mt-3 text-3xl text-white sm:text-4xl">
                Compare the root comments flow, route transitions, and redirects in one live bundle.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                This section is server-rendered first, then hydrated on the client. Use the route pills to
                inspect how the demo behaves across navigation states without leaving the page.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">Server First</p>
                <p className="mt-2 text-sm text-slate-200">
                  HTML arrives ready to read before JavaScript takes over.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">Shared Store</p>
                <p className="mt-2 text-sm text-slate-200">
                  Routes and comments run off the same Redux-backed data flow.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">Redirect Test</p>
                <p className="mt-2 text-sm text-slate-200">
                  The redirect route proves navigation still resolves cleanly after SSR.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link end to="/" className={routeLinkClassName}>
              Comments Root
            </Link>
            <Link to="/react-router" className={routeLinkClassName}>
              Route Transition
            </Link>
            <Link to="/react-router/redirect" className={routeLinkClassName}>
              Redirect Demo
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
