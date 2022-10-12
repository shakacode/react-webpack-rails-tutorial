FROM ruby:3.0.3

RUN apt-get update

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash
RUN apt-get install -y nodejs 
RUN npm install -g yarn

WORKDIR /app
COPY Gemfile* .

RUN bundle install

COPY package.json .
RUN yarn install

COPY . .

RUN rake react_on_rails:locale && RAILS_ENV=production rake assets:precompile

RAILS_ENV=production 
NODE_ENV=production

EXPOSE 3000

# CMD ./startup.sh

CMD ['rails', 's']
