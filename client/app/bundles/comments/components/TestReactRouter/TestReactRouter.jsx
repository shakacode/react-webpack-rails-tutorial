import React from 'react';
import pureRender from 'pure-render-decorator';

@pureRender
export default class TestReactRouter extends React.Component {

  render() {
    return (
      <div className="container">
        <h1>React Router is working!</h1>
        <p>
          Woohoo, we can use <code>react-router</code> here!
        </p>
      </div>
    );
  }

}
