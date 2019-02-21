FROM ruby:2.4.1

LABEL com.shakacode.vendor="https://www.shakacode.com"
LABEL com.shakacode.description="ShakaCode's example of React on Rails plus React Native"
LABEL com.shakacode.homepage="https://github.com/shakacode/react-webpack-rails-tutorial"
LABEL com.thetonyrom.maintainer="Tony Rom <thetonyrom@gmail.com>"
LABEL version="0.0.1"

RUN apt-get update && apt-get install -y \
    qt5-default \
    libqt5webkit5-dev \
    gstreamer1.0-plugins-base \
    gstreamer1.0-tools \
    gstreamer1.0-x

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash
RUN apt-get install -y nodejs
RUN npm install -g yarn

RUN apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /app
COPY Gemfile* ./
RUN bundle

COPY package.json .
COPY client/package.json client/yarn.lock client/
RUN yarn

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000 4000 5000

CMD foreman start -f Procfile.static
