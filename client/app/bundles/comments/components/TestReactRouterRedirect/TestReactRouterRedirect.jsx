import React from 'react';

import BaseComponent from '../BaseComponent';

export default class TestReactRouterRedirect extends BaseComponent {
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
