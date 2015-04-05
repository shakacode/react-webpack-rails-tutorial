Import the Code Style and the Inspection XML files so you can reformat and inspect the code and get
consistent results.

Be sure to setup a scope that looks like this:

## Rails App
```
file[react-rails-tutorial]:*/&&!file[react-rails-tutorial]:tmp//*&&!file[react-rails-tutorial]:log//*&&!file[react-rails-tutorial]:client/node_modules//*&&!file[react-rails-tutorial]:client/assets/fonts//*&&!file[react-rails-tutorial]:app/assets/fonts//*&&!file[react-rails-tutorial]:bin//*&&!file[react-rails-tutorial]:app/assets/javascripts//*
```

## Webstorm

