import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class TestReactRouter extends React.Component {
  shouldComponentUpdate() {
    return PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  }

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
