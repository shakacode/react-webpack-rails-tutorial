import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from 'libs/components/BaseComponent';

// Reusable icon components to reduce SVG duplication
const CheckmarkIcon = ({ className = 'w-4 h-4', color = 'text-green-400' }) => (
  <svg className={`${className} ${color}`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

CheckmarkIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};

const CheckmarkCircleIcon = ({ className = 'w-4 h-4', color = 'text-green-400' }) => (
  <svg className={`${className} ${color}`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

CheckmarkCircleIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};

const InfoIcon = ({ className = 'w-4 h-4', color = 'text-yellow-400' }) => (
  <svg className={`${className} ${color}`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clipRule="evenodd"
    />
  </svg>
);

InfoIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};

export default class Footer extends BaseComponent {
  render() {
    return (
      <footer className=" text-neutral-200 bg-[#222] py-8 mt-16">
        <div className="container mx-auto px-4">
          <a href="http://www.shakacode.com">
            <h3 className="flex gap-4 items-center">
              <div className="w-[146px] h-[40px] bg-[url('../images/railsonmaui.png')]" />
              Example of styling using image-url and Open Sans Light custom font
            </h3>
          </a>
          <a href="https://x.com/railsonmaui" className="flex gap-4 items-center">
            <div className="w-16 h-16 bg-[url('../images/twitter_64.png')]" />
            Rails On Maui on Twitter
          </a>
          <div className="mt-6 pt-6 border-t border-neutral-700 text-sm text-neutral-400">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <CheckmarkCircleIcon className="w-4 h-4" color="text-green-400" />
                <span>
                  Powered by{' '}
                  <a
                    href="https://github.com/basecamp/thruster"
                    className="text-blue-400 hover:text-blue-300 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Thruster HTTP/2
                  </a>{' '}
                  for optimized performance
                </span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 ml-6">
                <div className="flex items-center gap-1.5">
                  <CheckmarkIcon className="w-3.5 h-3.5" color="text-emerald-400" />
                  <span className="text-xs">HTTP/2 Enabled</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <InfoIcon className="w-3.5 h-3.5" color="text-yellow-400" />
                  <span className="text-xs" title="Configured in Rails but stripped by Cloudflare CDN">
                    Early Hints (Configured)
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckmarkIcon className="w-3.5 h-3.5" color="text-emerald-400" />
                  <span className="text-xs">
                    Supports{' '}
                    <a
                      href="https://shakacode.controlplane.com"
                      className="text-blue-400 hover:text-blue-300 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Control Plane
                    </a>
                    {' '}hosting
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
