FROM sub2u/ruby-2.3.1-node-6.8.0
MAINTAINER sub2u

ADD ./ app/

WORKDIR /app

RUN bundle install

RUN npm install

EXPOSE 5000

CMD foreman start -f Procfile.hot
