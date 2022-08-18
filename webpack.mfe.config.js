const webpackRootConfig = require('./webpack.apps.config');

module.exports = function (webpackEnv) {
  const rootConfig = webpackRootConfig(webpackEnv);
  delete rootConfig.optimization;
  return {
    ...rootConfig,
    entry: ['./src/main.ts'],
    devtool: 'source-map',
  };
};
