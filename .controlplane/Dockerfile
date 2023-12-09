FROM ahangarha/rwrt-base:latest

ENV RAILS_ENV=production
ENV NODE_ENV=production

# compiling assets requires any value for ENV of SECRET_KEY_BASE
ENV SECRET_KEY_BASE=NOT_USED_NON_BLANK

RUN yarn res:build
RUN bin/rails react_on_rails:locale
RUN bin/rails assets:precompile

# add entrypoint
COPY .controlplane/entrypoint.sh ./
ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["./bin/rails", "s"]
