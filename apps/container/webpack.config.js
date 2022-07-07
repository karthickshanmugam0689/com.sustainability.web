const webpackAppsConfig = require('../../webpack.apps.config');

module.exports = function (webpackEnv) {
  return webpackAppsConfig(webpackEnv);
}