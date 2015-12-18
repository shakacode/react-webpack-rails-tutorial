import React from 'react';

import BaseComponent from 'libs/components/BaseComponent';

export default class TestReactRouter extends BaseComponent {
  render() {
    return (
      <div className="container">
        <h1>React Router is working!</h1>
        <p>
          Woohoo, we can use <code>react-router</code> here!
        </p>
      </div>
    );
  }

}
