import React from 'react';

import BaseComponent from '../../../../libs/components/BaseComponent.jsx';

export default class TestReactRouter extends BaseComponent {
  render() {
    return (
      <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-[0_24px_70px_-52px_rgba(15,23,42,0.5)] sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">Route Example</p>
        <h1 className="mt-3 text-4xl text-slate-900">React Router is working!</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
          This route swaps the content area without leaving the router-enabled demo shell.
        </p>
      </div>
    );
  }
}
