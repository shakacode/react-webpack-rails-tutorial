# Testing

1. `rake` runs the test suite
2. To test production with precompiled assets: 

```sh
export SECRET_KEY_BASE=`rake secret`
alias test-prod='rake assets:clobber && RAILS_ENV=production bin/rake assets:precompile \
   && rails s -e production'
```
