import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import BaseComponent from 'libs/components/BaseComponent';

export default class Navigationbar extends BaseComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    // set @comment_count prop to state
    // for updating the count of comments
    this.state = {
      comment_count: this.props.comments_count
    };
  }

  componentDidUpdate() {
    if (this.props.data) {
      this.setState({comment_count: this.props.data.get('$$comments').size});
    }
  }

  render() {
    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a className="navbar-brand" href="http://www.shakacode.com">ShakaCode</a>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className="active"><a href="/">React Router Demo</a></li>
              <li><a href="/no-router">React Demo</a></li>
              <li><a href="/simple">Simple React</a></li>
              <li><a href="/comments">Classic Rails</a></li>
              <li>
                <a href={
                  'https://github.com/' +
                  'shakacode/react-webpack-rails-tutorial'
               }>
                  Source on Github
                </a>
              </li>
              <li>
                <a href={
                  'http://www.railsonmaui.com/' +
                  'blog/2014/10/03/integrating' +
                  '-webpack-and-the-es6-transpiler' +
                  '-into-an-existing-rails-project/'
               }>Tutorial Article</a>
              </li>
              <li>
                <a href={
                  'http://forum.shakacode.com/' +
                  't/fast-rich-client-rails-development' +
                  '-with-webpack-and-the-es6-transpiler/82/22'
               }>Forum Discussion</a>
              </li>
              <li>
                Comments: {this.state.comment_count}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
