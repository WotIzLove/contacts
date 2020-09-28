// vue.config.js
module.exports = {
  // options...
  publicPath: process.env.NODE_ENV === 'production'
    ? '/contacts'
    : '/',
  assetsDir: '',
  filenameHashing: true,
  productionSourceMap: false
}
