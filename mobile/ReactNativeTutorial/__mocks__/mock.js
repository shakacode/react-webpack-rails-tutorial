import React from 'react';
import _ from 'lodash/fp';

export default (props) => React.createElement(
  'Mock',
  _.omit('store', props),
  props.children,
);
