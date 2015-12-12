module ApplicationHelper
  def javascript_include_env_tag(asset, dev_asset, params = {})
    asset_file = Rails.env.production? ? asset : dev_asset
    return javascript_include_tag(asset_file, params) if asset_file
  end

  def stylesheet_link_env_tag(asset, dev_asset, params = {})
    asset_file = Rails.env.production? ? asset : dev_asset
    return stylesheet_link_tag(asset_file, params) if asset_file
  end
end
