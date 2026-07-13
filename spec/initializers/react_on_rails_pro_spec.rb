# frozen_string_literal: true

require "rails_helper"

RSpec.describe "ReactOnRailsPro initializer" do
  around do |example|
    original_env = {
      "ROLLING_DEPLOY_TOKEN" => ENV.fetch("ROLLING_DEPLOY_TOKEN", nil),
      "ROLLING_DEPLOY_PREVIOUS_URLS" => ENV.fetch("ROLLING_DEPLOY_PREVIOUS_URLS", nil)
    }
    config = ReactOnRailsPro.configuration
    original_config = {
      rolling_deploy_adapter: config.rolling_deploy_adapter,
      rolling_deploy_token: config.rolling_deploy_token,
      rolling_deploy_previous_urls: config.rolling_deploy_previous_urls
    }

    example.run
  ensure
    original_env.each do |key, value|
      value.nil? ? ENV.delete(key) : ENV[key] = value
    end
    original_config.each do |key, value|
      config.public_send(:"#{key}=", value)
    end
  end

  it "configures the rolling deploy HTTP adapter when the token is present" do
    ENV["ROLLING_DEPLOY_TOKEN"] = "x" * 32
    ENV["ROLLING_DEPLOY_PREVIOUS_URLS"] = "https://example.com/react_on_rails_pro/rolling_deploy"

    load Rails.root.join("config/initializers/react_on_rails_pro.rb")

    config = ReactOnRailsPro.configuration
    expect(config.rolling_deploy_adapter).to eq(ReactOnRailsPro::RollingDeployAdapters::Http)
    expect(config.rolling_deploy_token).to eq("x" * 32)
    expect(config.rolling_deploy_previous_urls).to eq("https://example.com/react_on_rails_pro/rolling_deploy")
  end

  it "normalizes blank rolling deploy previous URLs" do
    ENV["ROLLING_DEPLOY_TOKEN"] = "x" * 32
    ENV["ROLLING_DEPLOY_PREVIOUS_URLS"] = ""

    load Rails.root.join("config/initializers/react_on_rails_pro.rb")

    expect(ReactOnRailsPro.configuration.rolling_deploy_previous_urls).to be_nil
  end
end
