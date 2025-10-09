import { React, render, screen } from '../../../../../../libs/testHelper';

import Comment from './Comment.jsx';

describe('Comment', () => {
  it('renders an author and comment with proper css classes', () => {
    const { container } = render(<Comment author="Frank" text="Hi!" />);

    const author = container.querySelector('h2.js-comment-author');
    expect(author).toBeInTheDocument();
    const text = container.querySelector('span.js-comment-text');
    expect(text).toBeInTheDocument();
  });

  it('shows the author', () => {
    render(<Comment author="Frank" text="Hi!" />);

    const author = screen.getByText('Frank');
    expect(author).toHaveClass('js-comment-author');
  });

  it('shows the comment text in markdown', () => {
    const { container } = render(<Comment author="Frank" text="Hi!" />);

    // The text is rendered inside a span with dangerouslySetInnerHTML
    // Using querySelector since the content is HTML from markdown
    const comment = container.querySelector('span.js-comment-text');
    expect(comment).toBeInTheDocument();
    expect(comment).toHaveTextContent('Hi!');
  });
});
