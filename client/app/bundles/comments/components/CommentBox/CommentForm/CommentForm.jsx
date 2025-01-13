/* eslint-disable react/no-find-dom-node, react/no-string-refs */
import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import _ from 'lodash';
import { injectIntl } from 'react-intl';
import { defaultMessages } from 'libs/i18n/default';
import BaseComponent from 'libs/components/BaseComponent';

const emptyComment = { author: '', text: '' };

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

    this.horizontalAuthorRef = React.createRef();
    this.horizontalTextRef = React.createRef();
    this.stackedAuthorRef = React.createRef();
    this.stackedTextRef = React.createRef();
    this.inlineAuthorRef = React.createRef();
    this.inlineTextRef = React.createRef();

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
          author: this.horizontalAuthorRef.current.value,
          text: this.horizontalTextRef.current.value,
        };
        break;
      case 1:
        comment = {
          author: this.stackedAuthorRef.current.value,
          text: this.stackedTextRef.current.value,
        };
        break;
      case 2:
        comment = {
          author: this.inlineAuthorRef.current.value,
          text: this.inlineTextRef.current.value,
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
        ref = this.horizontalTextRef.current;
        break;
      case 1:
        ref = this.stackedTextRef.current;
        break;
      case 2:
        ref = this.inlineTextRef.current;
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
            <label htmlFor="horizontalAuthorRef" className="w-full lg:w-2/12 lg:text-end shrink-0">
              {formatMessage(defaultMessages.inputNameLabel)}
            </label>
            <input
              type="text"
              id="horizontalAuthorRef"
              placeholder={formatMessage(defaultMessages.inputNamePlaceholder)}
              className="px-3 py-1 leading-4 border border-gray-300 rounded w-full"
              ref={this.horizontalAuthorRef}
              value={this.state.comment.author}
              onChange={this.handleChange}
              disabled={this.props.isSaving}
            />
          </div>

          <div className="flex flex-col gap-0 items-center lg:gap-4 lg:flex-row">
            <label htmlFor="horizontalTextRef" className="w-full lg:w-2/12 lg:text-end shrink-0">
              {formatMessage(defaultMessages.inputTextLabel)}
            </label>
            <input
              type="textarea"
              id="horizontalTextRef"
              placeholder={formatMessage(defaultMessages.inputTextPlaceholder)}
              className="px-3 py-1 leading-4 border border-gray-300 rounded w-full"
              ref={this.horizontalTextRef}
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
        <form className="flex flex-col gap-4" onSubmit={this.handleSubmit}>
          <div className="flex flex-col gap-0">
            <label htmlFor="stackedAuthorRef" className="w-full">
              {formatMessage(defaultMessages.inputNameLabel)}
            </label>
            <input
              type="text"
              id="stackedAuthorRef"
              placeholder={formatMessage(defaultMessages.inputNamePlaceholder)}
              className="px-3 py-1 leading-4 border border-gray-300 rounded w-full"
              ref={this.stackedAuthorRef}
              value={this.state.comment.author}
              onChange={this.handleChange}
              disabled={this.props.isSaving}
            />
          </div>

          <div className="flex flex-col gap-0">
            <label htmlFor="stackedTextRef" className="w-full">
              {formatMessage(defaultMessages.inputTextLabel)}
            </label>
            <input
              type="text"
              id="stackedTextRef"
              placeholder={formatMessage(defaultMessages.inputTextPlaceholder)}
              className="px-3 py-1 leading-4 border border-gray-300 rounded w-full"
              ref={this.stackedTextRef}
              value={this.state.comment.text}
              onChange={this.handleChange}
              disabled={this.props.isSaving}
            />
          </div>

          <div className="flex flex-col gap-0">
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

  // Head up! We have some CSS modules going on here with the className props below.
  formInline() {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <hr />
        <form className="form-inline flex flex-col lg:flex-row flex-wrap gap-4" onSubmit={this.handleSubmit}>
          <div className="flex gap-2 items-center">
            <label htmlFor="inlineAuthorRef">{formatMessage(defaultMessages.inputNameLabel)}</label>
            <input
              type="text"
              id="inlineAuthorRef"
              placeholder={formatMessage(defaultMessages.inputNamePlaceholder)}
              className="px-3 py-1 leading-4 border border-gray-300 rounded"
              ref={this.inlineAuthorRef}
              value={this.state.comment.author}
              onChange={this.handleChange}
              disabled={this.props.isSaving}
            />
          </div>

          <div className="flex gap-2 items-center">
            <label htmlFor="inlineTextRef">{formatMessage(defaultMessages.inputTextLabel)}</label>
            <input
              type="textarea"
              id="inlineTextRef"
              placeholder={formatMessage(defaultMessages.inputTextPlaceholder)}
              className="px-3 py-1 leading-4 border border-gray-300 rounded"
              ref={this.inlineTextRef}
              value={this.state.comment.text}
              onChange={this.handleChange}
              disabled={this.props.isSaving}
            />
          </div>

          <div className="flex gap-2">
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

        <div className="flex gap-1 not-prose">
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
