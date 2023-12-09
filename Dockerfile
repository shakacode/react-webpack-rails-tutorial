# TODO: Document where used
# Maybe outdated.
# Control Plane setup is in the .controlplane directory
FROM ruby:3.1.2

RUN apt-get update

RUN curl -sL https://deb.nodesource.com/setup_18.x | bash
RUN apt-get install -y nodejs
RUN npm install -g yarn

WORKDIR /app
COPY Gemfile* ./

RUN bundle install

COPY package.json yarn.lock ./
RUN yarn install

COPY . ./

ENV RAILS_ENV=production
ENV NODE_ENV=production

RUN rails react_on_rails:locale && rails assets:precompile

CMD ["rails", "s"]
