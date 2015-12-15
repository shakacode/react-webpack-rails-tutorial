# Deploying to Heroku

First consult this article: [Using Multiple Buildpacks for an App](https://devcenter.heroku.com/articles/using-multiple-buildpacks-for-an-app).

In order to deploy to heroku, you'll need to run this command once to set a custom
buildpack:

```
heroku config:add BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git
```

This runs the two buildpacks in the `.buildpacks` directory.

Also make sure you are running the latest heroku stack, cedar-14, to avoid running
into the [following issue](https://github.com/sass/node-sass/issues/467#issuecomment-61729195).

This is now the current default.

```
heroku stack:set cedar-14 -a react-webpack-rails-tutorial
```

To deploy the app on Heroku:
```
git push heroku master
```


## GOTCHAS

1. Use "dependencies" and not "devDependencies" for anything deployment related. Be sure to put all normall "dev only" tools in "dependencies" and not "devDependencies" in your `client/package.json`. This is because the Heroku default buildpack will only install what's in "dependencies". So only use `npm --save-dev` for things like linters and anything **only** related to the Webpack Dev Server.
2. The file system is case sensitive on Heroku, so don't mix the case of your import with the real file name. For example, if you name a file `BaseApi` and you do this: `import BaseAPI from 'lib/utils/BaseAPI'`, that will work locally, but when you deploy, you'll get an error like: `Uncaught Error: Cannot find module "lib/utils/baseAPI"`
