var $ = require('jquery');
var React = require('react/addons');

// Next line is necessary for exposing React to browser for
// the React Developer Tools: http://facebook.github.io/react/blog/2014/01/02/react-chrome-developer-tools.html
// require("expose?React!react");

var Input = require('react-bootstrap/lib/Input');
var Button = require('react-bootstrap/lib/Button');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Nav = require('react-bootstrap/lib/Nav')
var NavItem = require('react-bootstrap/lib/NavItem')

var marked = require("marked");

var Comment = React.createClass({
  render: function() {
    var rawMarkup = marked(this.props.children.toString());
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
  logError: function(xhr, status, err) {
    console.error(`Error loading comments from server!\nURL is ${this.props.url}\nstatus is ${status}\nerr is ${err.toString()}`);
  },

  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json'}).then(data => {
        this.setState({data: data});
      }, this.logError);
  },
  emptyFormData:  { author: "", text: "" },

  handleCommentSubmit: function() {
    // `setState` accepts a callback. To avoid (improbable) race condition,
    // `we'll send the ajax request right after we optimistically set the new
    // `state.
    this.setState({ajaxSending: true});
    var comment = this.state.formData;
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: { comment: comment}}).then(data => {
        var comments = this.state.data;
        var newComments = React.addons.update(comments, { $push: [comment] } );
        this.setState({ajaxSending: false, data: newComments, formData: this.emptyFormData });
      }, (xhr, status, err) => {
        this.logError(xhr, status, err);
        this.setState({ajaxSending: false});
      });
  },

  getInitialState: function() {
    return {
      data: [],
      formData: this.emptyFormData,
      ajaxSending: false
    };
  },

  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  onFormChange: function(obj) {
    this.setState({
      formData: obj
    })
  },

  render: function() {
    return (
      <div className="commentBox container">
        <h1>Comments { this.state.ajaxSending ? "AJAX SENDING!" : "" }</h1>
        <CommentForm onCommentSubmit={this.handleCommentSubmit} formData={this.state.formData} onChange={this.onFormChange} ajaxSending={this.state.ajaxSending} />
        <CommentList data={this.state.data} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var reversedData = this.props.data.slice(0).reverse();
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
  getInitialState: function() {
    return {
      formMode: 0
    };
  },

  handleSubmit: function(e) {
    e.preventDefault();
    this.props.onCommentSubmit();
    return;
  },

  handleSelect: function(selectedKey) {
    this.setState({ formMode: selectedKey });
  },

  handleChange: function() {
    // This could also be done using ReactLink:
    // http://facebook.github.io/react/docs/two-way-binding-helpers.html
    var obj;
    if (this.state.formMode < 2) {
      obj = {
        author: this.refs.author.getValue(),
        text: this.refs.text.getValue()
      }
    } else {
      // This is different because the input is a native HTML element rather than a React element
      obj = {
        author: this.refs.inlineAuthor.getDOMNode().value,
        text: this.refs.inlineText.getDOMNode().value
      }
    }
    this.props.onChange(obj);
  },

  formHorizontal: function() {
    return (
      <div><hr/>
        <form className="commentForm form-horizontal" onSubmit={this.handleSubmit}>
          <Input type="text" label="Name" placeholder="Your Name" labelClassName="col-sm-2" wrapperClassName="col-sm-10" ref="author" value={this.props.formData.author} onChange={this.handleChange} disabled={this.props.ajaxSending} />
          <Input type="textarea" label="Text" placeholder="Say something..." labelClassName="col-sm-2" wrapperClassName="col-sm-10" ref="text"  value={this.props.formData.text} onChange={this.handleChange} disabled={this.props.ajaxSending} />
          <div className="form-group"><div className="col-sm-offset-2 col-sm-10"><input type="submit" className="btn btn-primary" value="Post" disabled={this.props.ajaxSending} /></div></div>
        </form></div>
    );
  },

  formStacked: function() {
    return (
      <div><hr/>
        <form className="commentForm form" onSubmit={this.handleSubmit}>
          <Input type="text" label="Name"  placeholder="Your Name" ref="author" value={this.props.formData.author} onChange={this.handleChange} disabled={this.props.ajaxSending} />
          <Input type="textarea" label="Text" placeholder="Say something..." ref="text" value={this.props.formData.text} onChange={this.handleChange} disabled={this.props.ajaxSending} />
          <input type="submit" className="btn btn-primary" value="Post" disabled={this.props.ajaxSending} />
        </form></div>
    );
  },
  formInline: function() {
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
  render: function() {
    var inputForm;
    switch (this.state.formMode) {
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
        <Nav bsStyle="pills" activeKey={this.state.formMode} onSelect={this.handleSelect}>
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
