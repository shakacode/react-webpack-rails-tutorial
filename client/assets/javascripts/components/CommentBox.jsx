import $ from 'jquery';
import React from 'react/addons';
import CommentStore from '../stores/CommentStore';
import FormStore from '../stores/FormStore';
import CommentActions from '../actions/CommentActions';
import FormActions from '../actions/FormActions';

// Next line is necessary for exposing React to browser for
// the React Developer Tools: http://facebook.github.io/react/blog/2014/01/02/react-chrome-developer-tools.html
// require("expose?React!react");

var Input = require('react-bootstrap/lib/Input');
var Button = require('react-bootstrap/lib/Button');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Nav = require('react-bootstrap/lib/Nav')
var NavItem = require('react-bootstrap/lib/NavItem')

var marked = require("marked"); // markdown parser

var Comment = React.createClass({
  render() {
    const rawMarkup = marked(this.props.children.toString());
    return (
      <div className="comment">
        <h2 className="commentAuthor foobar">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});

var CommentBox = React.createClass({
  getStoreState() {
    return {
      comments: CommentStore.getState(),
      form: FormStore.getState()
    };
  },

  getInitialState() {
    return this.getStoreState();
  },

  logError(xhr, status, err) {
    console.error(`Error loading comments from server!\nURL is ${this.props.url}\nstatus is ${status}\nerr is ${err.toString()}`);
  },

  componentDidMount() {
    CommentStore.listen(this.onChange);
    FormStore.listen(this.onChange);
    CommentActions.fetchComments(this.props.url);
    //setInterval(CommentActions.fetchComments,
    //            this.props.pollInterval,
    //            this.props.url);

    //this.loadCommentsFromServer();
    //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  componentWillUnmount() {
    CommentStore.unlisten(this.onChange);
    FormStore.unlisten(this.onChange);
  },

  onChange() {
    this.setState(this.getStoreState());
  },

  render() {
        //<CommentForm onCommentSubmit={this.handleCommentSubmit}
                     //onChange={this.onFormChange}
    return (
      <div className="commentBox container">
        <h1>Comments { this.state.ajaxSending ? "SENDING AJAX REQUEST!" : "" }</h1>
        <CommentForm formMode={this.state.form.mode}
                     formData={this.state.form.comment}
                     url={this.props.url}
                     ajaxSending={this.state.form.ajaxSending} />
        <CommentList comments={this.state.comments.comments} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render() {
    var reversedData = this.props.comments.slice(0).reverse();
    var commentNodes = reversedData.map((comment, index) => {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <Comment author={comment.author} key={index}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  handleSelect(selectedKey) {
    FormActions.changeFormMode(selectedKey);
  },

  handleChange() {
    // This could also be done using ReactLink:
    // http://facebook.github.io/react/docs/two-way-binding-helpers.html
    let obj;
    if (this.props.formMode < 2) {
      obj = {
        author: this.refs.author.getValue(),
        text: this.refs.text.getValue()
      };
    } else {
      // This is different because the input is a native HTML element
      // rather than a React element.
      obj = {
        author: this.refs.inlineAuthor.getDOMNode().value,
        text: this.refs.inlineText.getDOMNode().value
      };
    }
    FormActions.updateComment(obj);
  },

  handleSubmit(e) {
    e.preventDefault();
    FormActions.submitComment(this.props.url, FormStore.getState().comment);
  },

  formHorizontal() {
    return (
      <div><hr/>
        <form className="commentForm form-horizontal" onSubmit={this.handleSubmit}>
          <Input type="text" label="Name" placeholder="Your Name" labelClassName="col-sm-2" wrapperClassName="col-sm-10" ref="author" value={this.props.formData.author} onChange={this.handleChange} disabled={this.props.ajaxSending} />
          <Input type="textarea" label="Text" placeholder="Say something..." labelClassName="col-sm-2" wrapperClassName="col-sm-10" ref="text"  value={this.props.formData.text} onChange={this.handleChange} disabled={this.props.ajaxSending} />
          <div className="form-group"><div className="col-sm-offset-2 col-sm-10"><input type="submit" className="btn btn-primary" value="Post" disabled={this.props.ajaxSending} /></div></div>
        </form></div>
    );
  },

  formStacked() {
    return (
      <div><hr/>
        <form className="commentForm form" onSubmit={this.handleSubmit}>
          <Input type="text" label="Name"  placeholder="Your Name" ref="author" value={this.props.formData.author} onChange={this.handleChange} disabled={this.props.ajaxSending} />
          <Input type="textarea" label="Text" placeholder="Say something..." ref="text" value={this.props.formData.text} onChange={this.handleChange} disabled={this.props.ajaxSending} />
          <input type="submit" className="btn btn-primary" value="Post" disabled={this.props.ajaxSending} />
        </form></div>
    );
  },

  formInline() {
    return (
      <div><hr/>
        <form className="commentForm form" onSubmit={this.handleSubmit}>
          <Input label="Inline Form" wrapperClassName="wrapper">
            <Row>
              <Col xs={3}>
                <input type="text" className="form-control" placeholder="Your Name" ref="inlineAuthor" value={this.props.formData.author} onChange={this.handleChange} disabled={this.props.ajaxSending} />
              </Col>
              <Col xs={8}>
                <input type="text" className="form-control" placeholder="Say something..." ref="inlineText" value={this.props.formData.text} onChange={this.handleChange} disabled={this.props.ajaxSending} />
              </Col>
              <Col xs={1}>
                <input type="submit" className="btn btn-primary" value="Post" disabled={this.props.ajaxSending} />
              </Col>
            </Row>
          </Input>
        </form></div>
    );
  },

  render() {
    let inputForm;
    switch (this.props.formMode) {
      case 0:
        inputForm = this.formHorizontal();
        break;
      case 1:
        inputForm = this.formStacked();
        break;
      case 2:
        inputForm = this.formInline();
    }
    return (
      <div>
        <Nav bsStyle="pills" activeKey={this.props.formMode} onSelect={this.handleSelect}>
          <NavItem eventKey={0}>Horizontal Form</NavItem>
          <NavItem eventKey={1}>Stacked Form</NavItem>
          <NavItem eventKey={2}>Inline Form</NavItem>
        </Nav>
        {inputForm}
      </div>
    );
  }
});

export { CommentBox }
