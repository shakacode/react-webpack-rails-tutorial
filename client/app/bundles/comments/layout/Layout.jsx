import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink as Link } from 'react-router-dom';

import './Layout.scss';

/* eslint-disable react/prefer-stateless-function */
export default class Layout extends Component {
  /* eslint-disable react/no-unescaped-entities */
  render() {
    const { children } = this.props;
    return (
      <section className="prose prose-a:text-sky-700 prose-li:my-0">
        <header>
          <ul>
            <li>
              <Link end to="/" className={({ isActive }) => (isActive ? ' activated' : '')}>
                Comments (Root URL)
              </Link>
            </li>
            <li>
              <Link to="/react-router" className={({ isActive }) => (isActive ? ' activated' : '')}>
                Test React Router ('/react-router')
              </Link>
            </li>
            <li>
              <Link to="/react-router/redirect" className={({ isActive }) => (isActive ? ' activated' : '')}>
                Test Redirect (url to '/react-router/redirect' which goes to root '/')
              </Link>
            </li>
          </ul>
        </header>
        {children}
      </section>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
