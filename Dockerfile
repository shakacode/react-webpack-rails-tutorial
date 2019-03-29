FROM ruby:2.5.3

LABEL com.shakacode.vendor="https://www.shakacode.com"
LABEL com.shakacode.description="ShakaCode's example of React on Rails plus React Native"
LABEL com.shakacode.homepage="https://github.com/shakacode/react-webpack-rails-tutorial"
LABEL com.thetonyrom.maintainer="Tony Rom <thetonyrom@gmail.com>"
LABEL version="0.0.1"

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash
RUN apt-get install -y nodejs
RUN npm install -g yarn

RUN curl -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list
RUN apt-get update && apt-get install -y \
    google-chrome-stable

RUN apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /app
COPY Gemfile* ./
RUN bundle
RUN chromedriver-update

COPY package.json .
COPY client/package.json client/yarn.lock client/
RUN yarn

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000 4000 5000

CMD foreman start -f Procfile.static
