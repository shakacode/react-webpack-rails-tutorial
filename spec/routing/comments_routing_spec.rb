require "rails_helper"

describe CommentsController do
  describe "routing" do
    it "routes to #index" do
      expect(get("/comments")).to route_to("comments#index")
    end

    it "has a 'comments_path' GET comments#index route name" do
      expect(get: comments_path)
        .to route_to(controller: "comments", action: "index")
    end

    it "routes to #create" do
      expect(post("/comments")).to route_to("comments#create")
    end

    it "routes to #update (PATCH)" do
      expect(patch("/comments/1")).to route_to("comments#update", id: "1")
    end

    it "routes to #update (PUT)" do
      expect(put("/comments/1")).to route_to("comments#update", id: "1")
    end

    it "routes to #show" do
      expect(get("/comments/1")).to route_to("comments#show", id: "1")
    end

    it "has a 'comment_path(:id)' GET comments#show(:id) route name" do
      expect(get: comment_path(id: "1"))
        .to route_to(controller: "comments", action: "show", id: "1")
    end
  end
end
