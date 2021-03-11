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
  devServer: {
    port: 8081,
    watchOptions: {
      poll: true
    }
  }
  /*
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()]
  }
  */
}