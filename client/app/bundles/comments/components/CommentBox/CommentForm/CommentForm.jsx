// NOTE: https://github.com/react-bootstrap/react-bootstrap/issues/1850 seesm to require string
// refs and not the callback kind.
/* eslint-disable react/no-find-dom-node, react/no-string-refs */
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import _ from 'lodash';
import { injectIntl } from 'react-intl';
import { defaultMessages } from 'libs/i18n/default';
import BaseComponent from 'libs/components/BaseComponent';

import css from './CommentForm.module.scss';

const emptyComment = { author: '', text: '' };

function bsStyleFor(propName, error) {
  if (error) {
    const errorData = (error && error.response && error.response.data) || {};
    return propName in errorData ? 'error' : 'success';
  }

  return null;
}

class CommentForm extends BaseComponent {
  static propTypes = {
    isSaving: PropTypes.bool.isRequired,
    actions: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.any])).isRequired,
    error: PropTypes.oneOfType([PropTypes.any]),
    cssTransitionGroupClassNames: PropTypes.oneOfType([PropTypes.func, PropTypes.any]).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    intl: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      formMode: 0,
      comment: emptyComment,
    };

    _.bindAll(this, ['handleSelect', 'handleChange', 'handleSubmit', 'resetAndFocus']);
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
    actions.submitComment(this.state.comment).then(this.resetAndFocus);
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
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <hr />
        <form className="form-horizontal flex flex-col gap-4" onSubmit={this.handleSubmit}>
          <div className="flex flex-col gap-0 items-center lg:gap-4 lg:flex-row">
            <label htmlFor="horizontalAuthorNode" className="w-full lg:w-2/12 lg:text-end shrink-0">
              {formatMessage(defaultMessages.inputNameLabel)}
            </label>
            <input
              type="text"
              id="horizontalAuthorNode"
              placeholder={formatMessage(defaultMessages.inputNamePlaceholder)}
              className="px-3 py-1 leading-4 border border-gray-300 rounded w-full"
              ref="horizontalAuthorNode"
              value={this.state.comment.author}
              onChange={this.handleChange}
              disabled={this.props.isSaving}
            />
          </div>

          <div className="flex flex-col gap-0 items-center lg:gap-4 lg:flex-row">
            <label htmlFor="horizontalTextNode" className="w-full lg:w-2/12 lg:text-end shrink-0">
              {formatMessage(defaultMessages.inputTextLabel)}
            </label>
            <input
              type="textarea"
              id="horizontalTextNode"
              placeholder={formatMessage(defaultMessages.inputTextPlaceholder)}
              className="px-3 py-1 leading-4 border border-gray-300 rounded w-full"
              ref="horizontalTextNode"
              value={this.state.comment.text}
              onChange={this.handleChange}
              disabled={this.props.isSaving}
            />
          </div>

          <div className="flex flex-col gap-0 lg:gap-4 lg:flex-row">
            <div className="hidden lg:block lg:w-2/12 grow-0" />
            <button
              type="submit"
              className="self-start px-3 py-1 font-semibold border-0 rounded text-sky-50 bg-sky-600 hover:bg-sky-800"
              disabled={this.props.isSaving}
            >
              {this.props.isSaving
                ? `${formatMessage(defaultMessages.inputSaving)}...`
                : formatMessage(defaultMessages.inputPost)}
            </button>
          </div>
        </form>
      </div>
    );
  }

  formStacked() {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <hr />
        <form className="commentForm form form-stacked" onSubmit={this.handleSubmit}>
          <FormGroup controlId="formBasicName">
            <ControlLabel>{formatMessage(defaultMessages.inputNameLabel)}</ControlLabel>
            <FormControl
              type="text"
              placeholder={formatMessage(defaultMessages.inputNamePlaceholder)}
              ref="stackedAuthorNode"
              value={this.state.comment.author}
              onChange={this.handleChange}
              disabled={this.props.isSaving}
              bsStyle={bsStyleFor('author', this.props.error)}
            />
          </FormGroup>
          <FormGroup controlId="formBasicText">
            <ControlLabel>{formatMessage(defaultMessages.inputTextLabel)}</ControlLabel>
            <FormControl
              type="textarea"
              label="Text"
              placeholder={formatMessage(defaultMessages.inputTextPlaceholder)}
              ref="stackedTextNode"
              value={this.state.comment.text}
              onChange={this.handleChange}
              disabled={this.props.isSaving}
              bsStyle={bsStyleFor('text', this.props.error)}
            />
          </FormGroup>
          <FormGroup controlId="formBasicSubmit">
            <Button type="submit" className="btn btn-primary" disabled={this.props.isSaving}>
              {this.props.isSaving
                ? `${formatMessage(defaultMessages.inputSaving)}...`
                : formatMessage(defaultMessages.inputPost)}
            </Button>
          </FormGroup>
        </form>
      </div>
    );
  }

  // Head up! We have some CSS modules going on here with the className props below.
  formInline() {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <hr />
        <Form inline className="commentForm" onSubmit={this.handleSubmit}>
          <FormGroup controlId="formInlineName">
            <ControlLabel>{formatMessage(defaultMessages.inputNameLabel)}</ControlLabel>
            <FormControl
              type="text"
              placeholder={formatMessage(defaultMessages.inputNamePlaceholder)}
              ref="inlineAuthorNode"
              value={this.state.comment.author}
              onChange={this.handleChange}
              disabled={this.props.isSaving}
              bsStyle={bsStyleFor('author', this.props.error)}
              className={css.nameFormControl}
            />
          </FormGroup>
          <FormGroup controlId="formInlineName">
            <ControlLabel>{formatMessage(defaultMessages.inputTextLabel)}</ControlLabel>
            <FormControl
              type="textarea"
              label="Text"
              placeholder={formatMessage(defaultMessages.inputTextPlaceholder)}
              ref="inlineTextNode"
              value={this.state.comment.text}
              onChange={this.handleChange}
              disabled={this.props.isSaving}
              bsStyle={bsStyleFor('text', this.props.error)}
              className={css.textFormControl}
            />
          </FormGroup>
          <Button type="submit" className="btn btn-primary" disabled={this.props.isSaving}>
            {this.props.isSaving
              ? `${formatMessage(defaultMessages.inputSaving)}...`
              : formatMessage(defaultMessages.inputPost)}
          </Button>
        </Form>
      </div>
    );
  }

  errorWarning() {
    const { error, cssTransitionGroupClassNames } = this.props;

    // If there is no error, there is nothing to add to the DOM
    if (!error.error) return null;

    const errorData = error.error.response && error.error.response.data;

    const errorElements = _.transform(
      errorData,
      (result, errorText, errorFor) => {
        result.push(
          <CSSTransition
            key={errorFor}
            nodeRef={error.nodeRef}
            timeout={500}
            classNames={cssTransitionGroupClassNames}
          >
            <li ref={error.nodeRef}>
              <b>{_.upperFirst(errorFor)}:</b> {errorText}
            </li>
          </CSSTransition>,
        );
      },
      [],
    );

    return (
      <div
        className="bg-pink-100 p-4 mb-4 border border-pink-200 rounded text-red-800 prose-strong:text-red-800 prose-ul:my-1"
        key="commentSubmissionError"
      >
        <strong>Your comment was not saved!</strong>
        <ul>{errorElements}</ul>
      </div>
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

    const { formatMessage } = this.props.intl;

    // For animation with TransitionGroup
    //   https://reactcommunity.org/react-transition-group/transition-group
    // The 500 must correspond to the 0.5s in:
    //   client/app/bundles/comments/components/CommentBox/CommentBox.module.scss:6
    return (
      <div>
        <TransitionGroup component={null}>{this.errorWarning()}</TransitionGroup>

        <div className="flex gap-1 no-prose">
          <button
            type="button"
            className={`px-6 py-2 font-semibold border-0 rounded ${
              this.state.formMode === 0 ? 'text-sky-50 bg-sky-600' : 'text-sky-600 hover:bg-gray-100'
            }`}
            onClick={() => this.handleSelect(0)}
          >
            {formatMessage(defaultMessages.formHorizontal)}
          </button>
          <button
            type="button"
            className={`px-6 py-2 font-semibold border-0 rounded ${
              this.state.formMode === 1 ? 'text-sky-50 bg-sky-600' : 'text-sky-600 hover:bg-gray-100'
            }`}
            onClick={() => this.handleSelect(1)}
          >
            {formatMessage(defaultMessages.formStacked)}
          </button>
          <button
            type="button"
            className={`px-6 py-2 font-semibold border-0 rounded ${
              this.state.formMode === 2 ? 'text-sky-50 bg-sky-600' : 'text-sky-600 hover:bg-gray-100'
            }`}
            onClick={() => this.handleSelect(2)}
          >
            {formatMessage(defaultMessages.formInline)}
          </button>
          {}
        </div>
        {inputForm}
      </div>
    );
  }
}

export default injectIntl(CommentForm);
