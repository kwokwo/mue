const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WriteFilePlugin =require('write-file-webpack-plugin');
 // hot script
 const devClient = path.resolve(__dirname, './multi-route/hot-reload');
 Object.keys(baseWebpackConfig.entry).forEach((name) => {
    let extras = [devClient];
    baseWebpackConfig.entry[name] = extras.concat(baseWebpackConfig.entry[name]);
});

module.exports = merge(baseWebpackConfig, {
    devtool: 'source-map',
    plugins: [
        // 在 webpack 插件中引入 webpack.HotModuleReplacementPlugin
        new webpack.HotModuleReplacementPlugin(),
        // webpack-dev-server 不支持CopyWebpackPlugin hack
        new WriteFilePlugin(),
    ],
    module: {
        rules: [
          {
            test: /\.(less|css)$/,
            use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'less-loader'],
            })),
          },
        ],
      },
    }
);
