const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        main: './dev/js/main.js',
    },
    output: {
        path: __dirname + '/assets/js',
        filename: '[name].script.js',
        chunkFilename: '[name].bundle.js',
        publicPath: '/wp-content/themes/ogrodnik/assets/js/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/env']
            }
        }]
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()]
    },
};