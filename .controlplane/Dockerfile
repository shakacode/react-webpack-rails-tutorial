FROM ruby:3.1.2

RUN apt-get update

# install node and yarn
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash
RUN apt-get install -y nodejs
RUN npm install -g yarn

WORKDIR /app

# install ruby gems
COPY Gemfile* ./

RUN bundle config set without 'development test' && \
    bundle config set with 'staging production' && \
    bundle install --jobs=3 --retry=3

# install node packages
COPY package.json yarn.lock .
RUN yarn install

# pick necessary app files
COPY Gemfile* config.ru Rakefile babel.config.js ./
COPY app ./app
COPY bin ./bin
COPY client ./client
COPY config ./config
COPY db ./db
COPY lib ./lib
COPY public ./public

ENV RAILS_ENV=production
ENV NODE_ENV=production
ENV SECRET_KEY_BASE=123

# compile assets
RUN rails react_on_rails:locale && rails assets:precompile

# add entrypoint
COPY .controlplane/entrypoint.sh ./
ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["rails", "s"]
