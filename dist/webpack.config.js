'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'development',
  watch: true,
  watchOptions: {
    // 不监听的文件或文件夹
    ignored: /node_modules/,
    // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
    // 默认为300ms
    aggregateTimeout: 300,
    // 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的
    // 默认每隔1000ms询问一次
    poll: 1000
  },
  entry: './src/index.js',
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [{
      test: /\.vue$/,
      use: 'vue-loader'
    }, {
      test: /\.(css|less)$/,
      loader: 'vue-style-loader!less-loader!css-loader'
    }]
  },
  plugins: [new VueLoaderPlugin(), new HtmlWebpackPlugin({
    template: './public/index.html',
    inject: true
  })],
  devtool: '#eval-source-map'
};