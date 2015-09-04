import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  }

  render() {
    return (
      <section>
        <header>
          <ul>
            <li><Link to='/'>Comments</Link></li>
            <li><Link to='/about'>About</Link></li>
          </ul>
        </header>
        { this.props.children }
      </section>
    );
  }
}
