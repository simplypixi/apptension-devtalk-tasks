const getConfig = (path) => `src/env/${path}/conf.js`;

module.exports = {
  devConfig: () => getConfig('local'),
  prodConfig: () => getConfig('prod')
}


