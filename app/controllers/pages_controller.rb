class PagesController < ApplicationController
  def index
    @comments = Comment.all
  end
end
