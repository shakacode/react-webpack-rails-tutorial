import React from 'react';
import pureRender from 'pure-render-decorator';

@pureRender
export default class TestReactRouterRedirect extends React.Component {

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
