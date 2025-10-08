import { List, Map } from 'immutable';
import { React, render, screen } from '../../../../../libs/testHelper';

import CommentList from './CommentList.jsx';

const cssTransitionGroupClassNames = {
  enter: 'elementEnter',
  enterActive: 'elementEnterActive',
  exit: 'elementLeave',
  exitActive: 'elementLeaveActive',
};

describe('CommentList', () => {
  const comments = List.of(
    new Map({
      id: 1,
      author: 'Frank',
      text: 'hi',
      nodeRef: React.createRef(null),
    }),
    new Map({
      id: 2,
      author: 'Furter',
      text: 'ho',
      nodeRef: React.createRef(null),
    }),
  );

  it('renders a list of Comments in normal order', () => {
    render(
      <CommentList $$comments={comments} cssTransitionGroupClassNames={cssTransitionGroupClassNames} />,
    );

    // Verify both authors are rendered in order
    expect(screen.getByText('Frank')).toBeInTheDocument();
    expect(screen.getByText('Furter')).toBeInTheDocument();

    // Verify order by checking their positions in the DOM
    const authors = screen.getAllByRole('heading', { level: 2 });
    expect(authors[0]).toHaveTextContent('Frank');
    expect(authors[1]).toHaveTextContent('Furter');
  });

  it('renders an alert if errors', () => {
    render(
      <CommentList
        $$comments={comments}
        error="zomg"
        cssTransitionGroupClassNames={cssTransitionGroupClassNames}
      />,
    );

    const alert = screen.getByText('Comments could not be retrieved.');
    expect(alert.tagName).toBe('STRONG');
  });
});
