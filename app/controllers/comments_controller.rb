# frozen_string_literal: true

class CommentsController < ApplicationController
  before_action :set_comment, only: %i[show edit update destroy]
  before_action :new_comment, only: %i[new stimulus horizontal_form stacked_form inline_form]
  before_action :set_comments, only: %i[index stimulus comment_list]

  # GET /comments
  # GET /comments.json
  def index; end

  # GET /comments/1
  # GET /comments/1.json
  def show; end

  # GET /comments/new
  def new; end

  # GET /comments/1/edit
  def edit; end

  # POST /comments
  # POST /comments.json
  def create
    @comment = Comment.new(comment_params)

    respond_to do |format|
      if @comment.save
        if turbo_frame_request?
          format.html
        else
          format.html { redirect_to @comment, notice: "Comment was successfully created." }
        end
        format.json { render :show, status: :created, location: @comment }
      else
        if turbo_frame_request?
          format.html
        else
          format.html { render :new }
        end
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /comments/1
  # PATCH/PUT /comments/1.json
  def update
    respond_to do |format|
      if @comment.update(comment_params)
        format.html { redirect_to @comment, notice: I18n.t("comment_was_successfully_updated") }
        format.json { render :show, status: :ok, location: @comment }
      else
        format.html { render :edit }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /comments/1
  # DELETE /comments/1.json
  def destroy
    @comment.destroy!
    respond_to do |format|
      format.html { redirect_to comments_url, notice: I18n.t("comment_was_successfully_destroyed") }
      format.json { head :no_content }
    end
  end

  def stimulus; end

  def comment_list
    respond_to do |format|
      format.html { render partial: "comments/turbo/comment_list" }
    end
  end

  def horizontal_form    
    respond_to do |format|
      format.html { render partial: "comments/turbo/horizontal_form" }
    end
  end

  def stacked_form
    respond_to do |format|
      format.html { render partial: "comments/turbo/stacked_form" }
    end
  end

  def inline_form
    respond_to do |format|
      format.html { render partial: "comments/turbo/inline_form" }
    end
  end

  private

  def set_comments
    @comments = Comment.all.order("id DESC")
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_comment
    @comment = Comment.find(params[:id])
  end

  def new_comment
    @comment = Comment.new
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def comment_params
    params.require(:comment).permit(:author, :text)
  end
end
