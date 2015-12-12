import { React, expect, TestUtils } from 'libs/testHelper';
import { List, Map } from 'immutable';

import CommentList from './CommentList';
import Comment from './Comment/Comment';

const {
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
  scryRenderedComponentsWithType,
} = TestUtils;

describe('CommentList', () => {
  const comments = List.of(
    new Map({
      author: 'Frank',
      text: 'hi',
    }),
    new Map({
      author: 'Furter',
      text: 'ho',
    }),
  );

  it('renders a list of Comments in reverse order', () => {
    const component = renderIntoDocument(
      <CommentList $$comments={comments}/>
    );
    const list = scryRenderedComponentsWithType(component, Comment);
    expect(list.length).to.equal(2);
    expect(list[0].props.author).to.equal('Furter');
    expect(list[1].props.author).to.equal('Frank');
  });

  it('renders an alert if errors', () => {
    const component = renderIntoDocument(
      <CommentList $$comments={comments} error="zomg" />
    );

    const alert = findRenderedDOMComponentWithTag(component, 'strong');
    expect(alert.textContent).to.equal('Comments could not be retrieved. ');
  });
});
