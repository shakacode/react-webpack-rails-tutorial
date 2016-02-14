import React from 'react';

import BaseComponent from 'libs/components/BaseComponent';

export default class TestReactRouterRedirect extends BaseComponent {
  static checkAuth(nextState, replace) {
    // Hard code this to demonstrate the effect
    const notAuthorized = true;
    if (notAuthorized) {
      replace({ pathname: '/', state: { redirectFrom: nextState.location.pathname } });
    }
  }

  render() {
    return (
      <div>Nope.</div>
    );
  }

}
