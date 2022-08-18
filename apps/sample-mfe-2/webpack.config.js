const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const webpackMfeConfig = require('../../webpack.mfe.config');
const pkg = require('./package.json');
const dependenciesInOwnPackageJson = pkg.dependencies;

module.exports = function (webpackEnv) {
  const mfeWebPackConfig = webpackMfeConfig(webpackEnv);
  return {
    ...mfeWebPackConfig,
    output: {
      ...mfeWebPackConfig.output,
      publicPath: 'auto',
    },
    plugins: [
      ...mfeWebPackConfig.plugins,
      new ModuleFederationPlugin({
        name: 'sample_mfe_2',
        filename: 'remoteEntry.js',
        exposes: {
          [`./sample_mfe_2`]: './src/bootstrap',
        },
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
