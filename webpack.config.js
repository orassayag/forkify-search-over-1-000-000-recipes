var webpack = require('webpack');
const path = require('path');
require("babel-polyfill");
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ES6Promise = require("es6-promise");
ES6Promise.polyfill();

module.exports = {
    entry: ['babel-polyfill', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'   
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new webpack.ProvidePlugin({
            Promise: 'es6-promise-promise', // works as expected
        })
    ],
    module: {
       rules: [
           {
               test: /\.js$/,
               exclude: /node_modules/,
               use: {
                   loader: 'babel-loader'
               }
           }
       ]
    }
};