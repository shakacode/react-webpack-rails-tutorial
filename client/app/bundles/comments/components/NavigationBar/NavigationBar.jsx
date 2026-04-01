// https://github.com/eslint/eslint/issues/6876
// eslint-disable new-cap

import classNames from 'classnames';
import _ from 'lodash';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CommentsCount from './CommentsCount.jsx';
import * as paths from '../../constants/paths';

function NavigationBar(props) {
  const { commentsCount, pathname } = props;

  const [isOpen, setIsOpen] = useState(false);

  const menuWrapperClasses = 'flex flex-col lg:flex-row flex-wrap lg:items-center lg:visible';

  return (
    <nav className="bg-yellow-50">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex justify-between items-center align-middle">
            <a className="p-3 text-2xl" href="http://www.shakacode.com">
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

          <ul className={`${menuWrapperClasses} ${isOpen ? '' : ' collapse'}`}>
            <li
              className={classNames({
                'bg-yellow-100': pathname === paths.ROUTER_PATH || pathname === paths.REACT_ROUTER_PATH,
              })}
            >
              <a
                className="px-2 py-4 w-full inline-block text-gray-500 hover:text-gray-700"
                href={paths.ROUTER_PATH}
              >
                React Router Demo
              </a>
            </li>
            <li className={classNames({ 'bg-yellow-100': pathname === paths.NO_ROUTER_PATH })}>
              <a
                className="px-2 py-4 w-full inline-block text-gray-500 hover:text-gray-700"
                href={paths.NO_ROUTER_PATH}
              >
                React Demo
              </a>
            </li>
            <li className={classNames({ 'bg-yellow-100': pathname === paths.SIMPLE_REACT_PATH })}>
              <a
                className="px-2 py-4 w-full inline-block text-gray-500 hover:text-gray-700"
                href={paths.SIMPLE_REACT_PATH}
              >
                Simple React
              </a>
            </li>
            <li className={classNames({ 'bg-yellow-100': pathname === paths.HOTWIRED_PATH })}>
              <a
                className="px-2 py-4 w-full inline-block text-gray-500 hover:text-gray-700"
                href={paths.HOTWIRED_PATH}
              >
                HotWired
              </a>
            </li>
            <li className={classNames({ 'bg-yellow-100': pathname === paths.STIMULUS_PATH })}>
              <a
                className="px-2 py-4 w-full inline-block text-gray-500 hover:text-gray-700"
                href={paths.STIMULUS_PATH}
              >
                Stimulus Demo
              </a>
            </li>
            <li className={classNames({ 'bg-yellow-100': pathname === paths.RAILS_PATH })}>
              <a
                className="px-2 py-4 w-full inline-block text-gray-500 hover:text-gray-700"
                href={paths.RAILS_PATH}
              >
                Classic Rails
              </a>
            </li>
            <li className={classNames({ 'bg-yellow-100': pathname === paths.RESCRIPT_PATH })}>
              <a
                className="px-2 py-4 w-full inline-block text-gray-500 hover:text-gray-700"
                href={paths.RESCRIPT_PATH}
              >
                Rescript
              </a>
            </li>
            <li>
              <a
                className="px-2 py-4 w-full inline-block text-gray-500 hover:text-gray-700"
                href="https://github.com/shakacode/react-webpack-rails-tutorial"
              >
                Source
              </a>
            </li>
            <li>
              <a
                className="px-2 py-4 w-full inline-block text-gray-500 hover:text-gray-700"
                href="https://forum.shakacode.com/c/reactjs"
              >
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
