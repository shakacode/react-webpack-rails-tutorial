// https://github.com/eslint/eslint/issues/6876
// eslint-disable new-cap

import classNames from 'classnames';
import React, { PropTypes } from 'react';

import CommentsCount from './CommentsCount';
import * as paths from '../../constants/paths';

const NavigationBar = (props) => {
  const { commentsCount, pathname } = props;

  /* eslint-disable new-cap */
  return (
    <nav className="navbar navbar-default" role="navigation">
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
            <li className={classNames({ active: (pathname === paths.ROUTER_PATH) })}>
              <a href={paths.ROUTER_PATH}>React Router Demo</a>
            </li>
            <li className={classNames({ active: (pathname === paths.NO_ROUTER_PATH) })}>
              <a href={paths.NO_ROUTER_PATH}>React Demo</a>
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
                Source on Github
              </a>
            </li>
            <li>
              <a
                href={
                  'http://www.railsonmaui.com/' +
                  'blog/2014/10/03/integrating' +
                  '-webpack-and-the-es6-transpiler' +
                  '-into-an-existing-rails-project/'
               }
              >Tutorials</a>
            </li>
            <li>
              <a
                href={
                  'http://forum.shakacode.com/' +
                  't/fast-rich-client-rails-development' +
                  '-with-webpack-and-the-es6-transpiler/82/22'
               }
              >Forum</a>
            </li>
            {commentsCount && CommentsCount({ commentsCount })}
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
