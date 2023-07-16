# frozen_string_literal: true

module CommentsHelper
  MarkdownParser = Redcarpet::Markdown.new(Redcarpet::Render::HTML)

  def markdown_to_html(content)
    return "" if content.blank?

    MarkdownParser.render(content).html_safe
  end
end
