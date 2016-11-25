// NOTE: https://github.com/react-bootstrap/react-bootstrap/issues/1850 seesm to require string
// refs and not the callback kind.
/* eslint-disable react/no-find-dom-node, react/no-string-refs */
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Alert from 'react-bootstrap/lib/Alert';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import _ from 'lodash';

import BaseComponent from 'libs/components/BaseComponent';

import css from './CommentForm.scss';

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
          author: ReactDOM.findDOMNode(this.refs.horizontalAuthorNode).value,
          text: ReactDOM.findDOMNode(this.refs.horizontalTextNode).value,
        };
        break;
      case 1:
        comment = {
          author: ReactDOM.findDOMNode(this.refs.stackedAuthorNode).value,
          text: ReactDOM.findDOMNode(this.refs.stackedTextNode).value,
        };
        break;
      case 2:
        comment = {
          // This is different because the input is a native HTML element
          // rather than a React element.
          author: ReactDOM.findDOMNode(this.refs.inlineAuthorNode).value,
          text: ReactDOM.findDOMNode(this.refs.inlineTextNode).value,
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
        ref = ReactDOM.findDOMNode(this.refs.horizontalTextNode);
        break;
      case 1:
        ref = ReactDOM.findDOMNode(this.refs.stackedTextNode);
        break;
      case 2:
        ref = ReactDOM.findDOMNode(this.refs.inlineTextNode);
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
        <Form horizontal className="commentForm form-horizontal" onSubmit={this.handleSubmit}>
          <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={2}>
              Name
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                placeholder="Your Name"
                ref="horizontalAuthorNode"
                value={this.state.comment.author}
                onChange={this.handleChange}
                disabled={this.props.isSaving}
                bsStyle={bsStyleFor('author', this.props.error)}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={2}>
              Text
            </Col>
            <Col sm={10}>
              <FormControl
                type="textarea"
                label="Text"
                placeholder={textPlaceholder}
                ref="horizontalTextNode"
                value={this.state.comment.text}
                onChange={this.handleChange}
                disabled={this.props.isSaving}
                bsStyle={bsStyleFor('text', this.props.error)}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalSubmit">
            <Col smOffset={2} sm={10}>
              <Button
                type="submit"
                className="btn btn-primary"
                disabled={this.props.isSaving}
              >
                {this.props.isSaving ? 'Saving...' : 'Post'}
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }

  formStacked() {
    return (
      <div>
        <hr />
        <form className="commentForm form form-stacked" onSubmit={this.handleSubmit}>
          <FormGroup controlId="formBasicName">
            <ControlLabel>Name</ControlLabel>
            <FormControl
              type="text"
              placeholder="Your Name"
              ref="stackedAuthorNode"
              value={this.state.comment.author}
              onChange={this.handleChange}
              disabled={this.props.isSaving}
              bsStyle={bsStyleFor('author', this.props.error)}
            />
          </FormGroup>
          <FormGroup
            controlId="formBasicText"
          >
            <ControlLabel>Text</ControlLabel>
            <FormControl
              type="textarea"
              label="Text"
              placeholder={textPlaceholder}
              ref="stackedTextNode"
              value={this.state.comment.text}
              onChange={this.handleChange}
              disabled={this.props.isSaving}
              bsStyle={bsStyleFor('text', this.props.error)}
            />
          </FormGroup>
          <FormGroup controlId="formBasicSubmit">
            <Button
              type="submit"
              className="btn btn-primary"
              disabled={this.props.isSaving}
            >
              {this.props.isSaving ? 'Saving...' : 'Post'}
            </Button>
          </FormGroup>
        </form>
      </div>
    );
  }

  // Head up! We have some CSS modules going on here with the className props below.
  formInline() {
    return (
      <div>
        <hr />
        <Form inline className="commentForm" onSubmit={this.handleSubmit}>
          <FormGroup controlId="formInlineName" >
            <ControlLabel>
              Name
            </ControlLabel>
            <FormControl
              type="text"
              placeholder="Your Name"
              ref="inlineAuthorNode"
              value={this.state.comment.author}
              onChange={this.handleChange}
              disabled={this.props.isSaving}
              bsStyle={bsStyleFor('author', this.props.error)}
              className={css.nameFormControl}
            />
          </FormGroup>
          <FormGroup controlId="formInlineName">
            <ControlLabel>
              Text
            </ControlLabel>
            <FormControl
              type="textarea"
              label="Text"
              placeholder={textPlaceholder}
              ref="inlineTextNode"
              value={this.state.comment.text}
              onChange={this.handleChange}
              disabled={this.props.isSaving}
              bsStyle={bsStyleFor('text', this.props.error)}
              className={css.textFormControl}
            />
          </FormGroup>
          <Button
            type="submit"
            className="btn btn-primary"
            disabled={this.props.isSaving}
          >
            {this.props.isSaving ? 'Saving...' : 'Post'}
          </Button>
        </Form>
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

    // For animation with ReactCSSTransitionGroup
    //   https://facebook.github.io/react/docs/animation.html
    // The 500 must correspond to the 0.5s in:
    //   client/app/bundles/comments/components/CommentBox/CommentBox.scss:6
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName={cssTransitionGroupClassNames}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
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
