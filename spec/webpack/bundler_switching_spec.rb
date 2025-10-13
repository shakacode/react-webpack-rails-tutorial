# frozen_string_literal: true

require 'spec_helper'
require 'yaml'

RSpec.describe 'Bundler Switching', type: :feature do
  let(:shakapacker_config_path) { Rails.root.join('config', 'shakapacker.yml') }
  let(:original_config) { YAML.load_file(shakapacker_config_path, aliases: true) }

  after do
    # Restore original config after each test
    File.write(shakapacker_config_path, YAML.dump(original_config))
  end

  describe 'switching between webpack and rspack' do
    it 'successfully builds with webpack' do
      # Set bundler to webpack (deep copy to avoid mutating original_config)
      config = YAML.load(YAML.dump(original_config))
      config['default']['assets_bundler'] = 'webpack'
      File.write(shakapacker_config_path, YAML.dump(config))

      # Run build
      output = `NODE_ENV=test RAILS_ENV=test bin/shakapacker 2>&1`

      expect($CHILD_STATUS.success?).to be true
      expect(output).to include('webpack')
      expect(output).to include('compiled successfully')
    end

    it 'successfully builds with rspack' do
      # Set bundler to rspack (deep copy to avoid mutating original_config)
      config = YAML.load(YAML.dump(original_config))
      config['default']['assets_bundler'] = 'rspack'
      File.write(shakapacker_config_path, YAML.dump(config))

      # Run build
      output = `NODE_ENV=test RAILS_ENV=test bin/shakapacker 2>&1`

      expect($CHILD_STATUS.success?).to be true
      expect(output).to include('Rspack')
      expect(output).to include('compiled successfully')
    end

    it 'produces functional bundles with both bundlers' do
      bundlers = %w[webpack rspack]

      bundlers.each do |bundler|
        # Set bundler (deep copy to avoid mutating original_config)
        config = YAML.load(YAML.dump(original_config))
        config['default']['assets_bundler'] = bundler
        File.write(shakapacker_config_path, YAML.dump(config))

        # Build
        `NODE_ENV=test RAILS_ENV=test bin/shakapacker 2>&1`
        expect($CHILD_STATUS.success?).to be true

        # Verify manifest exists
        manifest_path = Rails.root.join('public', 'packs-test', 'manifest.json')
        expect(File.exist?(manifest_path)).to be true

        # Verify server bundle exists
        server_bundle_path = Rails.root.join('ssr-generated', 'server-bundle.js')
        expect(File.exist?(server_bundle_path)).to be true
      end
    end
  end
end
