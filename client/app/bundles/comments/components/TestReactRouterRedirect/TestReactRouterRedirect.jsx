import React from 'react';
import { Redirect } from 'react-router-dom';

import BaseComponent from 'libs/components/BaseComponent';

export default class TestReactRouterRedirect extends BaseComponent {

  static checkAuth() {
    // Hard code this to demonstrate the effect
    const notAuthorized = true;
    return notAuthorized;
  }

  render() {
    if (TestReactRouterRedirect.checkAuth()) {
      return (
        <Redirect
          push
          to={{
            pathname: '/',
            state: { redirectFrom: this.props.location.pathname },
          }}
        />
      );
    }

    return <div>Nope.</div>;
  }
}
