// Require dotenv for env variables
require('dotenv').config();
// Package to handle paths
const path = require('path');
// Import Webpack
const webpack = require('webpack');
// Vue loading plugin
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// Loading css extract plugin
const MiniExtractCssPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: ['webpack-hot-middleware/client?reload=true','./client/index.js'],
    output: {
        filename: "app.js",
        publicPath: '/',
        path: path.resolve(__dirname, "server/public")
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader'
            }
        }, {
            test: /\.vue$/,
            use: {
                loader: 'vue-loader'
            }
        },{
            test: /\.css$/,
            use: [
                MiniExtractCssPlugin.loader, // Extrae css 
                'css-loader', // Permite compilar css
                'postcss-loader' // Carga css con directivas tailwind
            ]
        }]
    },
    plugins: [
        // Make sure to include the plugin!
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new MiniExtractCssPlugin({
            filename : 'app.css'
        })
    ]
}