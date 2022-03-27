// https://github.com/eslint/eslint/issues/6876
// eslint-disable new-cap

import classNames from 'classnames';
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import CommentsCount from './CommentsCount.jsx';
import * as paths from '../../constants/paths';

function NavigationBar(props) {
  const { commentsCount, pathname } = props;

  /* eslint-disable new-cap */
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-ligth navbar-default">
      <div className="container-fluid">
        <a className="navbar-brand" href="http://www.shakacode.com">
          ShakaCode
        </a>
        <button
          type="button"
          className="navbar-toggler collapsed"
          data-bs-toggle="collapse"
          data-bs-target="#bs-example-navbar-collapse-1"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="navbar-nav me-auto">
            <li
              className={classNames({
                active: pathname === paths.ROUTER_PATH || pathname === paths.REACT_ROUTER_PATH,
              })}
            >
              <a className='nav-link' href={paths.ROUTER_PATH}>React Router Demo</a>
            </li>
            <li className={classNames({ active: pathname === paths.NO_ROUTER_PATH })}>
              <a className='nav-link' href={paths.NO_ROUTER_PATH}>React Demo</a>
            </li>
            <li className={classNames({ active: pathname === paths.SIMPLE_REACT_PATH })}>
              <a className='nav-link' href={paths.SIMPLE_REACT_PATH}>Simple React</a>
            </li>
            <li className={classNames({ active: pathname === paths.RAILS_PATH })}>
              <a className='nav-link' href={paths.RAILS_PATH}>Classic Rails</a>
            </li>
            <li>
              <a className='nav-link' href="https://github.com/shakacode/react-webpack-rails-tutorial">Source</a>
            </li>
            <li>
              <a className='nav-link' href="https://forum.shakacode.com/c/reactjs">Forum</a>
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
