module CommentsHelper
  def markdown(content)
    return '' unless content.present?
    @markdown ||= Redcarpet::Markdown.new(Redcarpet::Render::HTML)
    @markdown.render(content).html_safe
  end
end
