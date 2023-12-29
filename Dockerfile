FROM ruby:3.1-bullseye

# Set working directory
WORKDIR /app

# Copy Gemfile and install dependencies
COPY Gemfile Gemfile.lock ./
RUN bundle install

# RUN apt-get install mysql-client
RUN apt-get install -y curl \
  && curl -sL https://deb.nodesource.com/setup_20.x | bash - \
  && apt-get install -y nodejs \
  && curl -L https://www.npmjs.com/install.sh | sh

RUN apt-get install -y redis

RUN npm install -g yarn

# Copy application code
COPY . .

RUN yarn
RUN yarn res:dev

# Expose port 3000
EXPOSE 3000

# Start the Rails server
# RUN rake db:setup

# CMD ["rails", "server", "-b", "0.0.0.0"]
CMD [ "foreman", "start", "-f", "Procfile.dev" ]
# CMD ["ruby", "bin/dev"]