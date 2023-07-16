module CommentsHelper
  MarkdownParser = Redcarpet::Markdown.new(Redcarpet::Render::HTML)

  def markdown_to_html(content)
    return '' unless content.present?

    MarkdownParser.render(content).html_safe
  end
end
