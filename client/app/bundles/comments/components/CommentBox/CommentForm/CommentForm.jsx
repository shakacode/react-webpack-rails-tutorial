import React, { PropTypes } from 'react';
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

function bsStyleFor(propName, error) {
  if (error) {
    const errorData = (error && error.response && error.response.data) || {};
    return (propName in errorData) ? 'error' : 'success';
  }

  return null;
}

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
      'handleSelect',
      'handleChange',
      'handleSubmit',
      'resetAndFocus',
    ]);
  }

  handleSelect(selectedKey) {
    this.setState({ formMode: selectedKey });
  }

  handleChange() {
    let comment;

    switch (this.state.formMode) {
      case 0:
        comment = {
          author: this.horizontalAuthorNode.getValue(),
          text: this.horizontalTextNode.getValue(),
        };
        break;
      case 1:
        comment = {
          author: this.stackedAuthorNode.getValue(),
          text: this.stackedTextNode.getValue(),
        };
        break;
      case 2:
        comment = {
          // This is different because the input is a native HTML element
          // rather than a React element.
          author: this.inlineAuthorNode.value,
          text: this.inlineTextNode.value,
        };
        break;
      default:
        throw new Error(`Unexpected state.formMode ${this.state.formMode}`);
    }

    this.setState({ comment });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { actions } = this.props;
    actions
      .submitComment(this.state.comment)
      .then(this.resetAndFocus);
  }

  resetAndFocus() {
    // Don't reset a form that didn't submit, this results in data loss
    if (this.props.error) return;

    const comment = { author: this.state.comment.author, text: '' };
    this.setState({ comment });

    let ref;
    switch (this.state.formMode) {
      case 0:
        ref = this.horizontalTextNode.getInputDOMNode();
        break;
      case 1:
        ref = this.stackedTextNode.getInputDOMNode();
        break;
      case 2:
        ref = this.inlineTextNode;
        break;
      default:
        throw new Error(`Unexpected state.formMode ${this.state.formMode}`);
    }

    ref.focus();
  }

  formHorizontal() {
    return (
      <div>
        <hr />
        <form className="commentForm form-horizontal" onSubmit={this.handleSubmit}>
          <Input
            type="text"
            label="Name"
            placeholder="Your Name"
            labelClassName="col-sm-2"
            wrapperClassName="col-sm-10"
            ref={(node) => { this.horizontalAuthorNode = node; }}
            value={this.state.comment.author}
            onChange={this.handleChange}
            disabled={this.props.isSaving}
            hasFeedback
            bsStyle={bsStyleFor('author', this.props.error)}
          />
          <Input
            type="textarea"
            label="Text"
            placeholder={textPlaceholder}
            labelClassName="col-sm-2"
            wrapperClassName="col-sm-10"
            ref={(node) => { this.horizontalTextNode = node; }}
            value={this.state.comment.text}
            onChange={this.handleChange}
            disabled={this.props.isSaving}
            hasFeedback
            bsStyle={bsStyleFor('text', this.props.error)}
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

  formStacked() {
    return (
      <div>
        <hr />
        <form className="commentForm form" onSubmit={this.handleSubmit}>
          <Input
            type="text"
            label="Name"
            placeholder="Your Name"
            ref={(node) => { this.stackedAuthorNode = node; }}
            value={this.state.comment.author}
            onChange={this.handleChange}
            disabled={this.props.isSaving}
            hasFeedback
            bsStyle={bsStyleFor('author', this.props.error)}
          />
          <Input
            type="textarea"
            label="Text"
            placeholder={textPlaceholder}
            ref={(node) => { this.stackedTextNode = node; }}
            value={this.state.comment.text}
            onChange={this.handleChange}
            disabled={this.props.isSaving}
            hasFeedback
            bsStyle={bsStyleFor('text', this.props.error)}
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

  formInline() {
    return (
      <div>
        <hr />
        <form className="commentForm form" onSubmit={this.handleSubmit}>
          <Input label="Inline Form" wrapperClassName="wrapper">
            <Row>
              <Col xs={3}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                  ref={(node) => { this.inlineAuthorNode = node; }}
                  value={this.state.comment.author}
                  onChange={this.handleChange}
                  disabled={this.props.isSaving}
                />
              </Col>
              <Col xs={8}>
                <input
                  type="text"
                  className="form-control"
                  placeholder={textPlaceholder}
                  ref={(node) => { this.inlineTextNode = node; }}
                  value={this.state.comment.text}
                  onChange={this.handleChange}
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

  errorWarning() {
    const error = this.props.error;

    // If there is no error, there is nothing to add to the DOM
    if (!error) return null;

    const errorData = error.response && error.response.data;

    const errorElements = _.transform(errorData, (result, errorText, errorFor) => {
      result.push(<li key={errorFor}><b>{_.upperFirst(errorFor)}:</b> {errorText}</li>);
    }, []);

    return (
      <Alert bsStyle="danger" key="commentSubmissionError">
        <strong>Your comment was not saved!</strong>
        <ul>
          {errorElements}
        </ul>
      </Alert>
    );
  }

  render() {
    let inputForm;
    switch (this.state.formMode) {
      case 0:
        inputForm = this.formHorizontal();
        break;
      case 1:
        inputForm = this.formStacked();
        break;
      case 2:
        inputForm = this.formInline();
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
          {this.errorWarning()}
        </ReactCSSTransitionGroup>

        <Nav bsStyle="pills" activeKey={this.state.formMode} onSelect={this.handleSelect}>
          <NavItem eventKey={0}>Horizontal Form</NavItem>
          <NavItem eventKey={1}>Stacked Form</NavItem>
          <NavItem eventKey={2}>Inline Form</NavItem>
        </Nav>
        {inputForm}
      </div>
    );
  }
}
