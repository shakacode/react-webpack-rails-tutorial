import React from 'react';
import Relay from 'react-relay';
import { Route } from 'react-router';
import CommentBox from '../components/CommentBox/CommentBoxRelay';

const ViewerQueries = {
  viewer: () => Relay.QL`query { viewer }`,
};

export default (
  <Route path="/">
    <Route
      path="relay-router"
      queries={ViewerQueries}
      component={CommentBox}
    />
  </Route>
);

// Use same origin to send cookies through network layer
Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('/graphql', {
    credentials: 'same-origin',
  })
);
