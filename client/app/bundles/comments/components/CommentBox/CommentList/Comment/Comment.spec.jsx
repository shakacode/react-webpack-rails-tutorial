import { React, TestUtils } from 'libs/testHelper';

import Comment from './Comment';

const {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedDOMComponentWithTag,
} = TestUtils;

describe('Comment', () => {
  it('renders an author and comment with proper css classes', () => {
    const component = renderIntoDocument(
      <Comment author="Frank" text="Hi!" />,
    );

    const comment = findRenderedDOMComponentWithTag(component, 'div');
    expect(comment.className).toEqual('comment');
    const author = findRenderedDOMComponentWithTag(component, 'h2');
    expect(author.className).toEqual('commentAuthor js-comment-author');
    const text = findRenderedDOMComponentWithTag(component, 'span');
    expect(text.className).toEqual('js-comment-text');
  });

  it('shows the author', () => {
    const component = renderIntoDocument(
      <Comment author="Frank" text="Hi!" />,
    );

    const author = findRenderedDOMComponentWithClass(component, 'js-comment-author');
    expect(author.textContent).toEqual('Frank');
  });

  it('shows the comment text in markdown', () => {
    const component = renderIntoDocument(
      <Comment author="Frank" text="Hi!" />,
    );

    const comment = findRenderedDOMComponentWithClass(component, 'js-comment-text');
    expect(comment.textContent).toEqual('Hi!\n');
  });
});
