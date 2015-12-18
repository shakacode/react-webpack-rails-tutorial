import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class BaseComponent extends React.Component {
  shouldComponentUpdate() {
    return PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  }
}
