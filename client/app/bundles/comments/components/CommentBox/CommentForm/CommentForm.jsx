import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Input from 'react-bootstrap/lib/Input';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Alert from 'react-bootstrap/lib/Alert';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import _ from 'lodash';

import BaseComponent from 'libs/components/BaseComponent';

const emptyComment = { author: '', text: '' };
const textPlaceholder = 'Say something using markdown...';

export default class CommentForm extends BaseComponent {
  static propTypes = {
    isSaving: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
    error: PropTypes.any,
    cssTransitionGroupClassNames: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      formMode: 0,
      comment: emptyComment,
    };

    _.bindAll(this, [
      '_handleSelect',
      '_handleChange',
      '_handleSubmit',
      '_resetAndFocus',
    ]);
  }

  _handleSelect(selectedKey) {
    this.setState({ formMode: selectedKey });
  }

  _handleChange() {
    let comment;

    if (this.state.formMode < 2) {
      comment = {
        author: this.refs.author.getValue(),
        text: this.refs.text.getValue(),
      };
    } else {
      comment = {
        // This is different because the input is a native HTML element
        // rather than a React element.
        author: this.refs.inlineAuthor.value,
        text: this.refs.inlineText.value,
      };
    }

    this.setState({ comment });
  }

  _handleSubmit(e) {
    e.preventDefault();
    const { actions } = this.props;
    actions
      .submitComment(this.state.comment)
      .then(this._resetAndFocus);
  }

  _resetAndFocus() {
    // Don't reset a form that didn't submit, this results in data loss
    if (this.props.error) return;

    const comment = { author: this.state.comment.author, text: '' };
    this.setState({ comment });

    let ref;
    if (this.state.formMode < 2) {
      ref = this.refs.text.getInputDOMNode();
    } else {
      ref = ReactDOM.findDOMNode(this.refs.inlineText);
    }

    ref.focus();
  }

  _formHorizontal() {
    return (
      <div>
        <hr />
        <form className="commentForm form-horizontal" onSubmit={this._handleSubmit}>
          <Input
            type="text"
            label="Name"
            placeholder="Your Name"
            labelClassName="col-sm-2"
            wrapperClassName="col-sm-10"
            ref="author"
            value={this.state.comment.author}
            onChange={this._handleChange}
            disabled={this.props.isSaving}
          />
          <Input
            type="textarea"
            label="Text"
            placeholder={textPlaceholder}
            labelClassName="col-sm-2"
            wrapperClassName="col-sm-10"
            ref="text"
            value={this.state.comment.text}
            onChange={this._handleChange}
            disabled={this.props.isSaving}
          />
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <input
                type="submit"
                className="btn btn-primary"
                value={this.props.isSaving ? 'Saving...' : 'Post'}
                disabled={this.props.isSaving}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }

  _formStacked() {
    return (
      <div>
        <hr />
        <form className="commentForm form" onSubmit={this._handleSubmit}>
          <Input
            type="text"
            label="Name"
            placeholder="Your Name"
            ref="author"
            value={this.state.comment.author}
            onChange={this._handleChange}
            disabled={this.props.isSaving}
          />
          <Input
            type="textarea"
            label="Text"
            placeholder={textPlaceholder}
            ref="text"
            value={this.state.comment.text}
            onChange={this._handleChange}
            disabled={this.props.isSaving}
          />
          <input
            type="submit"
            className="btn btn-primary"
            value={this.props.isSaving ? 'Saving...' : 'Post'}
            disabled={this.props.isSaving}
          />
        </form>
      </div>
    );
  }

  _formInline() {
    return (
      <div>
        <hr />
        <form className="commentForm form" onSubmit={this._handleSubmit}>
          <Input label="Inline Form" wrapperClassName="wrapper">
            <Row>
              <Col xs={3}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                  ref="inlineAuthor"
                  value={this.state.comment.author}
                  onChange={this._handleChange}
                  disabled={this.props.isSaving}
                />
              </Col>
              <Col xs={8}>
                <input
                  type="text"
                  className="form-control"
                  placeholder={textPlaceholder}
                  ref="inlineText"
                  value={this.state.comment.text}
                  onChange={this._handleChange}
                  disabled={this.props.isSaving}
                />
              </Col>
              <Col xs={1}>
                <input
                  type="submit"
                  className="btn btn-primary"
                  value={this.props.isSaving ? 'Saving...' : 'Post'}
                  disabled={this.props.isSaving}
                />
              </Col>
            </Row>
          </Input>
        </form>
      </div>
    );
  }

  _errorWarning() {
    // If there is no error, there is nothing to add to the DOM
    if (!this.props.error) return null;
    return (
      <Alert bsStyle="danger" key="commentSubmissionError">
        <strong>Your comment was not saved! </strong>
        A server error prevented your comment from being saved. Please try again.
      </Alert>
    );
  }

  render() {
    let inputForm;
    switch (this.state.formMode) {
      case 0:
        inputForm = this._formHorizontal();
        break;
      case 1:
        inputForm = this._formStacked();
        break;
      case 2:
        inputForm = this._formInline();
        break;
      default:
        throw new Error(`Unknown form mode: ${this.state.formMode}.`);
    }

    const { cssTransitionGroupClassNames } = this.props;

    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName={cssTransitionGroupClassNames}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {this._errorWarning()}
        </ReactCSSTransitionGroup>

        <Nav bsStyle="pills" activeKey={this.state.formMode} onSelect={this._handleSelect}>
          <NavItem eventKey={0}>Horizontal Form</NavItem>
          <NavItem eventKey={1}>Stacked Form</NavItem>
          <NavItem eventKey={2}>Inline Form</NavItem>
        </Nav>
        {inputForm}
      </div>
    );
  }
}
