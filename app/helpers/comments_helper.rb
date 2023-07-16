# frozen_string_literal: true

module CommentsHelper
  MarkdownToHtmlParser = Redcarpet::Markdown.new(Redcarpet::Render::HTML)

  def markdown_to_html(content)
    return "" if content.blank?

    sanitize(MarkdownToHtmlParser.render(content))
  end
end
