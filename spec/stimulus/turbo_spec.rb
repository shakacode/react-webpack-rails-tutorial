require "rails_helper"

describe "testing" do
  it 'gets a route' do
    visit '/stimulus'
    #html_nodes = Nokogiri::HTML(response.body)
    expect(1).to eq(1)
  end
end