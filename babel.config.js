module.exports = function(api) {
  const validEnv = ['development', 'test', 'production']
  const currentEnv = api.env()
  const isDevelopmentEnv = api.env('development')
  const isProductionEnv = api.env('production')
  const isTestEnv = api.env('test')
  const isHMR = process.env.WEBPACK_DEV_SERVER

  if (!validEnv.includes(currentEnv)) {
    throw new Error(
      `Please specify a valid \`NODE_ENV\` or ` +
      `\`BABEL_ENV\` environment variables. Valid values are "development", ` +
      `"test", and "production". Instead, received: ${ 
      JSON.stringify(currentEnv) 
      }.`
    )
  }

  return {
    presets: [
      isTestEnv && [
        '@babel/preset-env',
        {
          targets: {
            node: 'current'
          }
        }
      ],
      (isProductionEnv || isDevelopmentEnv) && '@babel/preset-env',
      "@babel/preset-react",
    ].filter(Boolean),
    plugins: [
      'babel-plugin-macros',
      isDevelopmentEnv && isHMR && 'react-refresh/babel',
      [
        '@babel/plugin-proposal-class-properties',
        {
          loose: true
        }
      ],
      [
        '@babel/plugin-transform-runtime',
        {
          helpers: false,
          regenerator: true,
          corejs: false
        }
      ]
    ].filter(Boolean)
  }
}
