require "rails_helper"
require "controllers/shared/comment_props"
require "controllers/shared/comments_factory"

describe PagesController do
  render_views

  def comments_store
    assigns(:registered_stores_defer_render)
  end

  def comment_json(i)
    props_hash = JSON.parse(comments_store.first[:props])
    props_hash["comments"][i].to_json
  end

  include_examples "Comments Factory", true

  describe "GET #index," do
    subject(:index_comments) { get :index, format: :html }

    before { index_comments }

    describe "hydrates a redux store," do
      it "with the store_name 'routerCommentsStore'," do
        expect(comments_store
          .first[:store_name]).to eq("routerCommentsStore")
      end

      include_examples "Comment Props"
      include_examples "Comment 0 Attributes"
      include_examples "Comment 1 Attributes"
    end

    it "renders the :index template," do
      expect(response).to render_template :index
    end
  end

  describe "GET #no_router," do
    subject(:no_router_comments) { get :no_router, format: :html }

    before { no_router_comments }

    describe "hydrates a redux store," do
      it "with the store_name 'commentsStore'," do
        expect(comments_store
          .first[:store_name]).to eq("commentsStore")
      end

      include_examples "Comment Props"
      include_examples "Comment 0 Attributes"
      include_examples "Comment 1 Attributes"
    end

    it "renders the :index template," do
      expect(response).to render_template :no_router
    end
  end

  describe "GET #simple," do
    subject(:simple_comments) { get :simple, format: :html }

    it "renders the :simple template," do
      simple_comments
      expect(response).to render_template :simple
    end
  end
end
