// Run this if you want to visualize the size of the built production code
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/styles/global.scss";`
      }
    }
  },
  /*
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()]
  }
  */
}