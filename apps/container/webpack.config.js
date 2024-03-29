const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const webpackAppsConfig = require('../../webpack.apps.config');
const pkg = require('./package.json');
const dependenciesInOwnPackageJson = pkg.dependencies;

module.exports = function (webpackEnv) {
  const rootConfig = webpackAppsConfig(webpackEnv);

  return {
    ...rootConfig,
    entry: ['src/main.ts'],
    output: {
      ...rootConfig.output,
      publicPath: 'auto',
    },
    plugins: [
      ...rootConfig.plugins,
      new ModuleFederationPlugin({
        name: 'container',
        shared: {
          react: {
            singleton: true,
            strictVersion: true,
            requiredVersion: dependenciesInOwnPackageJson.react,
          },
          'react-dom': {
            singleton: true,
            strictVersion: true,
            requiredVersion: dependenciesInOwnPackageJson['react-dom'],
          },
        },
      }),
    ],
  };
};
