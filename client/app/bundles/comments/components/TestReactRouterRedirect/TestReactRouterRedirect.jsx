import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class TestReactRouterRedirect extends React.Component {
  shouldComponentUpdate() {
    return PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  }

  static checkAuth(nextState, replaceState) {
    // Hard code this to demonstrate the effect
    const notAuthorized = true;
    if (notAuthorized) {
      replaceState({ redirectFrom: nextState.location.pathname }, '/');
    }
  }

  render() {
    return (
      <div>Nope.</div>
    );
  }

}
