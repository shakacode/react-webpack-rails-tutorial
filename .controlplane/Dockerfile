# Make sure RUBY_VERSION matches the Ruby version in .ruby-version and Gemfile
ARG RUBY_VERSION=3.1.2
FROM registry.docker.com/library/ruby:$RUBY_VERSION-slim as base

# Install packages needed to build gems and node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential curl git libpq-dev libvips node-gyp pkg-config python-is-python3

# Install JavaScript dependencies
# Make sure NODE_VERSION matches the node version in .nvmrc and package.json
ARG NODE_VERSION=18.13.0
ARG YARN_VERSION=1.22.19
ENV PATH=/usr/local/node/bin:$PATH
RUN curl -sL https://github.com/nodenv/node-build/archive/master.tar.gz | tar xz -C /tmp/ && \
    /tmp/node-build-master/bin/node-build "${NODE_VERSION}" /usr/local/node && \
    npm install -g yarn@$YARN_VERSION && \
    rm -rf /tmp/node-build-master

# Rails app lives here
# Entry point and commands will be run from this directory
WORKDIR /app

# Set production environment
ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development test"


# Throw-away build stage to reduce size of final image
FROM base as build

# Install application gems
COPY Gemfile Gemfile.lock ./
RUN bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git

# Install node modules
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy application code
COPY . .

# Final stage for app image
FROM base

# Install packages needed for deployment
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl libvips postgresql-client && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy built artifacts: gems, application
COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /app /app

RUN chmod +x /app/.controlplane/*.sh

ENV RAILS_ENV=production \
    NODE_ENV=production \
    SECRET_KEY_BASE=NOT_USED_NON_BLANK
# compiling assets requires any value for ENV of SECRET_KEY_BASE

# These files hardly ever change
RUN bin/rails react_on_rails:locale

# These files change together, /app/lib/bs are temp build files for rescript,
# and /app/client/app are the client assets that are bundled, so not needed once built
# Helps to have smaller images b/c of smaller Docker Layer Caches and smaller final images
RUN yarn res:build && bin/rails assets:precompile && rm -rf /app/lib/bs /app/client/app

# This is like the shell initialization that will take the CMD as args
# For Kubernetes and ControlPlane, this is the command on the workload.
ENTRYPOINT ["./.controlplane/entrypoint.sh"]

# Default args to pass to the entry point that can be overridden
# For Kubernetes and ControlPlane, these are the "workload args"
CMD ["./bin/rails", "server"]
