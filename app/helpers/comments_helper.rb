# frozen_string_literal: true

module CommentsHelper
  def markdown(content)
    return "" if content.blank?

    @markdown ||= Redcarpet::Markdown.new(Redcarpet::Render::HTML)
    @markdown.render(content).html_safe
  end
end
