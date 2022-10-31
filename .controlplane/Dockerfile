FROM ruby:3.1.2

RUN apt-get update

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash
RUN apt-get install -y nodejs 
RUN npm install -g yarn

WORKDIR /app
COPY Gemfile* ./

RUN bundle config set without 'development test' && \
    bundle config set with 'staging production' && \
    bundle install --jobs=3 --retry=3

COPY package.json .
RUN yarn install

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

RUN rake react_on_rails:locale && rake assets:precompile

COPY .controlplane/entrypoint.sh ./

ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["rails", "s"]
