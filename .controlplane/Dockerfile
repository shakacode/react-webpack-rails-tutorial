FROM ruby:3.1.2

RUN apt-get update

# install node and yarn
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash
RUN apt-get install -y nodejs
RUN npm install -g yarn

WORKDIR /app

# install ruby gems
COPY Gemfile* ./

RUN bundle config set without 'development test' && \
    bundle config set with 'staging production' && \
    bundle install --jobs=3 --retry=3

# install node packages
COPY package.json yarn.lock ./
RUN yarn install

COPY . ./

ENV RAILS_ENV=production
ENV NODE_ENV=production

# compiling assets requires any value for ENV of SECRET_KEY_BASE
ENV SECRET_KEY_BASE=NOT_USED_NON_BLANK

RUN rails react_on_rails:locale
RUN rails assets:precompile

# add entrypoint
COPY .controlplane/entrypoint.sh ./
ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["rails", "s"]
