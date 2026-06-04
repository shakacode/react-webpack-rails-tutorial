'use client';

import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from 'libs/components/BaseComponent';

const primaryLinkClassName =
  'inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm shadow-slate-200 transition hover:border-sky-300 hover:text-sky-700';

// Reusable icon components to reduce SVG duplication
function CheckmarkIcon({ className = 'w-4 h-4', color = 'text-green-400' }) {
  return (
    <svg className={`${className} ${color}`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

CheckmarkIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};

function CheckmarkCircleIcon({ className = 'w-4 h-4', color = 'text-green-400' }) {
  return (
    <svg className={`${className} ${color}`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

CheckmarkCircleIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};

function InfoIcon({ className = 'w-4 h-4', color = 'text-yellow-400' }) {
  return (
    <svg className={`${className} ${color}`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      />
    </svg>
  );
}

InfoIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};

function ShakaCodeLogo({ className = 'h-12 w-auto' }) {
  const uniqueId = React.useId();
  const gradientId = `${uniqueId}-footer-shaka-b`;
  const highlightId = `${uniqueId}-footer-shaka-c`;
  const pathId = `${uniqueId}-footer-shaka-a`;
  const maskId = `${uniqueId}-footer-shaka-d`;

  return (
    <svg
      viewBox="0 0 206 47"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="ShakaCode"
    >
      <defs>
        <linearGradient id={gradientId} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop stopColor="#F32B05" offset="0%" />
          <stop stopColor="#B00012" offset="100%" />
        </linearGradient>
        <linearGradient id={highlightId} x1="50%" y1="24.608%" x2="50%" y2="72.622%">
          <stop stopColor="#FF6956" offset=".792%" />
          <stop stopColor="#FF6956" stopOpacity=".01" offset="96.579%" />
        </linearGradient>
        <path
          d="M11.207 10h41.586a2 2 0 011.77 1.069l8.702 16.534a2 2 0 01-.453 2.437L33.317 55.848a2 2 0 01-2.634 0L1.188 30.04a2 2 0 01-.453-2.437l8.703-16.534A2 2 0 0111.208 10z"
          id={pathId}
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <text
          fontFamily="'Montserrat Bold', Montserrat, 'Open Sans', Arial, sans-serif"
          fontSize="20"
          fontWeight="bold"
          fill="#333738"
          transform="translate(0 -10)"
        >
          <tspan x="80" y="41">
            ShakaCode
          </tspan>
        </text>
        <g transform="translate(0 -10)">
          <path d="M0 0h64v64H0z" />
          <mask id={maskId} fill="#fff">
            <use href={`#${pathId}`} />
          </mask>
          <use fill={`url(#${gradientId})`} href={`#${pathId}`} />
          <path
            d="M7 43c22.118-2.144 33.57-6.578 34.354-13.303 1.178-10.088-17.4-1.454-20.927-1 9.658-7.17 22.018-11.721 37.08-13.652H66V57H7V43z"
            fill={`url(#${highlightId})`}
            mask={`url(#${maskId})`}
          />
        </g>
      </g>
    </svg>
  );
}

ShakaCodeLogo.propTypes = {
  className: PropTypes.string,
};

export default class Footer extends BaseComponent {
  render() {
    return (
      <footer className="mt-16 border-t border-slate-200/80 bg-white/75 py-12 text-slate-700 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-start">
            <div className="space-y-5">
              <a
                href="https://www.shakacode.com"
                className="inline-flex items-center rounded-[1.5rem] border border-slate-200 bg-white px-4 py-3 shadow-sm shadow-slate-200 hover:no-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ShakaCodeLogo className="h-10 w-auto sm:h-12" />
              </a>

              <div className="space-y-3">
                <p className="max-w-2xl text-sm leading-7 text-slate-600">
                  ShakaCode builds the open source tools, docs, and deployment workflows around this tutorial.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.shakacode.com"
                  className={primaryLinkClassName}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ShakaCode.com
                </a>
                <a
                  href="https://github.com/shakacode"
                  className={primaryLinkClassName}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/company/shakacode"
                  className={primaryLinkClassName}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href="https://x.com/shakacode"
                  className={primaryLinkClassName}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  X
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span>React Webpack Rails Tutorial by ShakaCode.</span>
                <span className="hidden text-slate-300 sm:inline">•</span>
                <span>Official mark sourced from ShakaCode branding.</span>
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-slate-200 bg-slate-50/90 p-5 shadow-sm shadow-slate-200">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">Platform Notes</p>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <CheckmarkCircleIcon className="mt-0.5 w-4 h-4" color="text-emerald-500" />
                  <span>
                    Powered by{' '}
                    <a
                      href="https://github.com/basecamp/thruster"
                      className="font-semibold text-sky-700 underline hover:text-sky-800"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Thruster HTTP/2
                    </a>{' '}
                    for the modern Rails serving layer.
                  </span>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <CheckmarkIcon className="mt-0.5 w-4 h-4" color="text-emerald-500" />
                  <span>HTTP/2 is enabled for the tutorial app.</span>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <InfoIcon className="mt-0.5 w-4 h-4" color="text-amber-500" />
                  <span title="Configured in Rails but stripped by Cloudflare CDN">
                    Early Hints are configured in Rails.
                  </span>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <CheckmarkIcon className="mt-0.5 w-4 h-4" color="text-emerald-500" />
                  <span>
                    Ready for{' '}
                    <a
                      href="https://shakacode.controlplane.com"
                      className="font-semibold text-sky-700 underline hover:text-sky-800"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Control Plane
                    </a>{' '}
                    hosting.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span>Copyright {new Date().getFullYear()} ShakaCode</span>
            <span>Open source Rails and React tooling by ShakaCode.</span>
          </div>
        </div>
      </footer>
    );
  }
}
