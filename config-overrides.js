const { injectBabelPlugin } = require('react-app-rewired');

const rootImport = ['root-import', {
  rootPathPrefix: '~',
  rootPathSuffix: 'src',
}];


function override(config, env) {
  config = injectBabelPlugin(rootImport, config);

  return config;
}

module.exports = {
  webpack: override,
  jest: override,
}
