import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class BaseComponent extends React.Component {
  shouldComponentUpdate(theArgs) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, ...theArgs);
  }
}
