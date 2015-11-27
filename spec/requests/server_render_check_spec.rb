require "rails_helper"

describe "Server Rendering" do
  it "generates server rendered HTML if server rendering enabled" do
    get root_path
    html_nodes = Nokogiri::HTML(response.body)
    expect(html_nodes.css("div#RouterApp-react-component-0").children.size).to eq(1)
    expect(html_nodes.css("div#RouterApp-react-component-0 section h2").text)
      .to include("Comments")
  end

  it "generates no server rendered HTML if server rendering not enabled" do
    get simple_path
    html_nodes = Nokogiri::HTML(response.body)
    expect(html_nodes.css("div#SimpleCommentScreen-react-component-0").children.size).to eq(0)
  end
end
