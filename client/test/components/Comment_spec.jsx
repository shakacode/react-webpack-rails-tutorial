import { React, expect, TestUtils } from '../test_helper';
import Comment from '../../app/components/Comment';

const {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedDOMComponentWithTag,
} = TestUtils;

describe('Comment', () => {
  it('renders an author and comment with proper css classes', () => {
    const component = renderIntoDocument(
      <Comment author="Frank" text="Hi!"/>
    );

    const comment = findRenderedDOMComponentWithTag(component, 'div');
    expect(comment.className).to.equal('comment');
    const author = findRenderedDOMComponentWithTag(component, 'h2');
    expect(author.className).to.equal('comment-author');
    const text = findRenderedDOMComponentWithTag(component, 'span');
    expect(text.className).to.equal('comment-text');
  });

  it('shows the author', () => {
    const component = renderIntoDocument(
      <Comment author="Frank" text="Hi!"/>
    );

    const author = findRenderedDOMComponentWithClass(component, 'comment-author');
    expect(author.textContent).to.equal('Frank');
  });

  it('shows the comment text in markdown', () => {
    const component = renderIntoDocument(
      <Comment author="Frank" text="Hi!"/>
    );

    const comment = findRenderedDOMComponentWithClass(component, 'comment-text');
    expect(comment.textContent).to.equal('Hi!\n');
  });
});
