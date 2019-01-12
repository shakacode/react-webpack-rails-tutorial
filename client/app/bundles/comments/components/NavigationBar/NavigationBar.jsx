// https://github.com/eslint/eslint/issues/6876
// eslint-disable new-cap

import classNames from 'classnames';
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import CommentsCount from './CommentsCount';
import * as paths from '../../constants/paths';

const NavigationBar = (props) => {
  const { commentsCount, pathname } = props;

  /* eslint-disable new-cap */
  return (
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <a className="navbar-brand" href="http://www.shakacode.com">ShakaCode</a>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li className={classNames(
              { active: (pathname === paths.ROUTER_PATH || pathname === paths.REACT_ROUTER_PATH) },
            )}>
              <a href={paths.ROUTER_PATH}>React Router Demo</a>
            </li>
            <li className={classNames({ active: (pathname === paths.NO_ROUTER_PATH) })}>
              <a href={paths.NO_ROUTER_PATH}>React Demo</a>
            </li>
            <li className={classNames({ active: (pathname === paths.SIMPLE_HOOKS_REACT_PATH) })}>
              <a href={paths.SIMPLE_HOOKS_REACT_PATH}>Simple Hooks React</a>
            </li>
            <li className={classNames({ active: (pathname === paths.SIMPLE_REACT_PATH) })}>
              <a href={paths.SIMPLE_REACT_PATH}>Simple React</a>
            </li>
            <li className={classNames({ active: (pathname === paths.RAILS_PATH) })}>
              <a href={paths.RAILS_PATH}>Classic Rails</a>
            </li>
            <li>
              <a
                href={
                  'https://github.com/' +
                  'shakacode/react-webpack-rails-tutorial'
                }
              >
                Source
              </a>
            </li>
            <li>
              <a href="https://forum.shakacode.com/c/reactjs">Forum</a>
            </li>
            {_.isNumber(commentsCount) && CommentsCount({ commentsCount })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

NavigationBar.propTypes = {
  commentsCount: PropTypes.number,
  pathname: PropTypes.string.isRequired,
};

export default NavigationBar;
