require "rails_helper"
require "airborne"
require "controllers/shared/comments_factory"

describe CommentsController do
  render_views

  include_examples "Comments Factory", true

  subject(:comment_attrs) do
    { author: author, text: text }
  end
  let(:author) { "Ponkey" }
  let(:text) { "Says wheeeee..." }

  describe "GET #index," do
    subject(:index_comments) { get :index, format: format }
    let(:format) { :html }

    before { index_comments }

    it "assigns @comments with Comments.all in DESC order," do
      expect(assigns(:comments)).to match_array(comments_list.reverse)
    end

    it "renders the :index template," do
      expect(response).to render_template :index
    end

    describe "when JSON is requested" do
      let(:format) { :json }

      it "returns JSON comments list in DESC order," do
        expect_json(
          "comments.0",
          author: "Iesha",
          text: "And a comment response..."
        )
        expect_json(
          "comments.1",
          author: "Bai",
          text: "Some comment text..."
        )
      end
    end
  end

  describe "GET #show," do
    subject(:show_comment) do
      get :show,
          params: { id: comment.id },
          format: format
    end
    let(:format) { :html }

    before { show_comment }

    it "assigns id'ed Comment as @comment," do
      expect(assigns(:comment)).to eq(comment)
    end

    it "renders the :show template," do
      expect(response).to render_template :show
    end

    describe "when JSON is requested" do
      let(:format) { :json }

      it "returns JSON for @comment," do
        expect_json({ author: "Bai", text: "Some comment text..." })
      end
    end
  end

  describe "GET @new" do
    subject(:new_comment) do
      get :new
    end

    before { new_comment }

    it "assigns a new Comment as @comment," do
      expect(assigns(:comment)).to be_a_new(Comment)
    end

    it "renders the :new template," do
      expect(response).to render_template(:new)
    end
  end

  describe "GET @edit" do
    subject(:edit_comment) do
      get :edit, params: { id: comment.id }
    end

    before { edit_comment }

    it "assigns the id'ed Comment as @comment," do
      expect(assigns(:comment)).to eq(comment)
    end

    it "renders the :edit template," do
      expect(response).to render_template(:edit)
    end
  end

  describe "POST #create," do
    subject(:create_comment) do
      post :create, params: { comment: comment_attrs, format: format }, xhr: true
    end
    let(:format) { :json }

    context "when creating succeeds," do
      it "saves a Comment in the database," do
        expect { create_comment }.to change(Comment, :count).by(1)
      end

      it "assigns @comment with the created Comment," do
        create_comment
        expect(assigns(:comment)).to be_a(Comment)
        expect(assigns(:comment)).to have_attributes(
          author: "Ponkey",
          text: "Says wheeeee..."
        )
      end

      context "when JSON is requested," do
        before { create_comment }

        it "renders the :show template," do
          expect(response).to render_template(:show)
        end

        it "returns JSON for the created comment," do
          expect_json({ author: "Ponkey", text: "Says wheeeee..." })
        end

        it "returns a HTTP status of 201," do
          expect(response).to have_http_status(:created)
        end

        it "sets the @comments' HTTP location header," do
          expect(response.header["Location"])
            .to eq("http://test.host/comments/#{assigns(:comment).id}")
        end
      end

      context "when HTML is requested," do
        before { create_comment }
        let(:format) { :html }

        it "returns a HTTP status of 302," do
          expect(response).to have_http_status(:found)
        end

        it "sets a flash notice," do
          expect(flash[:notice]).to eq("Comment was successfully created.")
        end

        it "redirects to the @comment," do
          expect(response).to redirect_to(assigns(:comment))
        end
      end
    end

    context "when creating fails," do
      let(:comment_attrs) do
        { author: "", text: "text" }
      end

      it "assigns @comment with new Comment JSON," do
        create_comment
        expect(assigns(@comment)["comment"]).to be_a_new(Comment)
      end

      it "does not save a new Comment to the database," do
        expect { create_comment }.not_to change(Comment, :count)
      end

      context "when JSON is requested," do
        before { create_comment }

        it "returns a HTTP status of 422," do
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it "renders error information JSON," do
          expect_json({ author: ["can't be blank"] })
        end
      end

      context "when HTML is requested," do
        let(:format) { :html }

        it "renders the :new template," do
          create_comment
          expect(response).to render_template(:new)
        end
      end
    end
  end

  describe "PATCH #update," do
    subject(:update_comment) do
      patch :update,
            params: { id: comment.id, comment: comment_attrs, format: format },
            xhr: true
    end
    let(:format) { :json }

    before do
      update_comment
      comment.reload
    end

    context "when updating succeeds," do
      it "locates a Comment and assigns it to @comment," do
        expect(assigns(:comment)).to eq(comment)
      end

      it "updates the Comment," do
        expect(assigns(:comment)).to have_attributes(
          author: "Ponkey",
          text: "Says wheeeee..."
        )
      end

      context "when JSON is requested," do
        it "renders the :show template," do
          expect(response).to render_template(:show)
        end

        it "returns JSON for the created comment," do
          expect_json({ author: "Ponkey", text: "Says wheeeee..." })
        end

        it "returns a HTTP status of 201," do
          expect(response).to have_http_status(:ok)
        end

        it "sets the @comments' HTTP location header," do
          expect(response.header["Location"])
            .to eq("http://test.host/comments/#{assigns(:comment).id}")
        end
      end

      context "when HTML is requested," do
        let(:format) { :html }

        it "returns a HTTP status of 302," do
          expect(response).to have_http_status(:found)
        end

        it "sets a flash notice," do
          expect(flash[:notice]).to eq("Comment was successfully updated.")
        end

        it "redirects to the @comment," do
          expect(response).to redirect_to(assigns(:comment))
        end
      end
    end

    context "when updating fails," do
      let(:comment_attrs) do
        { author: nil, text: "Text present..." }
      end

      it "does not update the @comment," do
        expect(comment).to have_attributes(
          author: "Bai",
          text: "Some comment text..."
        )
      end

      context "when JSON is requested," do
        it "renders error information JSON," do
          expect_json({ author: ["can't be blank"] })
        end

        it "returns a HTTP status of 422," do
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end

      context "when HTML is requested," do
        before { update_comment }
        let(:format) { :html }

        it "renders the :new template," do
          expect(response).to render_template(:edit)
        end
      end
    end
  end

  describe "DELETE destroy" do
    before { comment }

    subject(:destroy_comment) do
      delete :destroy, params: { id: comment_id, format: format }, xhr: true
    end
    let(:comment_id) { comment.id }
    let(:format) { :json }

    describe "when an existing Comment is id'ed," do
      it "deletes the id'ed @comment" do
        expect { destroy_comment }.to change(Comment, :count).by(-1)
      end

      describe "when JSON is requested" do
        it "returns an HTTP status of 204," do
          destroy_comment
          expect(response).to have_http_status(:no_content)
        end
      end

      describe "when HTML is requested" do
        let(:format) { :html }

        it "deletes the id'ed @comment" do
          expect { destroy_comment }.to change(Comment, :count).by(-1)
        end

        it "redirects to comments_url," do
          destroy_comment
          expect(response).to redirect_to(comments_url)
        end

        it "adds a flash:notice message," do
          destroy_comment
          expect(flash[:notice]).to eq("Comment was successfully destroyed.")
        end
      end
    end

    describe "when the id'ed Comment does not exist," do
      let(:comment_id) { 23 }

      it "raises a RecordNotFound error," do
        expect { destroy_comment }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end
