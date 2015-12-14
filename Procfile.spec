# Basic procfile running webpack to recreate the assets for tests with a watch process.
# If you don't keep this process going, you will rebuild the assets per spec run. This is configured
# in rails_helper.rb.

rails-spec: sh -c 'npm run build:test:client'
