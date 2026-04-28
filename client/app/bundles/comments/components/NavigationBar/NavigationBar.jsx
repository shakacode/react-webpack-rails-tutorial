// https://github.com/eslint/eslint/issues/6876
// eslint-disable new-cap

import classNames from 'classnames';
import _ from 'lodash';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CommentsCount from './CommentsCount.jsx';
import * as paths from '../../constants/paths';

const navItemClassName = (isActive) =>
  classNames(
    'inline-flex w-full rounded-full px-4 py-2.5 text-sm font-semibold transition lg:w-auto',
    isActive
      ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
      : 'text-slate-600 hover:bg-sky-50 hover:text-sky-700',
  );

function NavigationBar(props) {
  const { commentsCount, pathname } = props;

  const [isOpen, setIsOpen] = useState(false);

  const menuWrapperClasses = 'flex-col gap-1 pb-4 lg:flex lg:flex-row lg:flex-wrap lg:items-center lg:pb-0';

  return (
    <nav className="border-b border-white/70 bg-white/80 backdrop-blur">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex justify-between items-center align-middle">
            <a
              className="py-4 text-2xl font-semibold tracking-tight text-slate-900 hover:text-sky-700"
              href="http://www.shakacode.com"
            >
              ShakaCode
            </a>

            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Toggle navigation</span>
              <div className="p-4 lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
            </button>
          </div>

          <ul className={`${menuWrapperClasses} ${isOpen ? 'flex' : 'hidden'}`}>
            <li>
              <a
                className={navItemClassName(
                  pathname === paths.ROUTER_PATH || pathname === paths.REACT_ROUTER_PATH,
                )}
                href={paths.ROUTER_PATH}
              >
                React Router Demo
              </a>
            </li>
            <li>
              <a className={navItemClassName(pathname === paths.NO_ROUTER_PATH)} href={paths.NO_ROUTER_PATH}>
                React Demo
              </a>
            </li>
            <li>
              <a
                className={navItemClassName(pathname === paths.SIMPLE_REACT_PATH)}
                href={paths.SIMPLE_REACT_PATH}
              >
                Simple React
              </a>
            </li>
            <li>
              <a className={navItemClassName(pathname === paths.STIMULUS_PATH)} href={paths.STIMULUS_PATH}>
                Stimulus Demo
              </a>
            </li>
            <li>
              <a className={navItemClassName(pathname === paths.RAILS_PATH)} href={paths.RAILS_PATH}>
                Classic Rails
              </a>
            </li>
            <li>
              <a className={navItemClassName(pathname === paths.RESCRIPT_PATH)} href={paths.RESCRIPT_PATH}>
                Rescript
              </a>
            </li>
            <li>
              <a
                className={navItemClassName(pathname === paths.SERVER_COMPONENTS_PATH)}
                href={paths.SERVER_COMPONENTS_PATH}
              >
                RSC Demo
              </a>
            </li>
            <li>
              <a
                className={navItemClassName(false)}
                href="https://github.com/shakacode/react-webpack-rails-tutorial"
              >
                Source
              </a>
            </li>
            <li>
              <a className={navItemClassName(false)} href="https://forum.shakacode.com/c/reactjs">
                Forum
              </a>
            </li>
            {_.isNumber(commentsCount) && CommentsCount({ commentsCount })}
          </ul>
        </div>
      </div>
    </nav>
  );
}

NavigationBar.propTypes = {
  commentsCount: PropTypes.number,
  pathname: PropTypes.string.isRequired,
};

export default NavigationBar;
