// @flow

import React from 'react';

export default (selector: (x: any) => Function) =>
  (Component: ReactClass<any>) =>
    class extends React.Component {
      componentDidMount() {
        selector(this.props)();
      }

      render() {
        return <Component {...this.props} />;
      }
    };
