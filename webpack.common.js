"use strict";
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

module.exports = {
    entry: [
        './app.js', // your app's entry point
    ],
    /*    devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',*/
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    // ПРАВИЛА СБОРКИ
    module: {
        // правило присетов (presets)
        rules: [
            // js files
            {
                test: /\.js?$/,
                include: path.resolve(__dirname, '/'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/env',
                            '@babel/react',
                        ],
                        cacheDirectory: true,
                        plugins: [
                            'react-hot-loader/babel',
                        ],
                    }
                },
            },

            // fonts

            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
        ]
    },

    resolve: {
        extensions: ['.js'],
        modules: [
            path.join(__dirname, "/"),
            path.join(__dirname, "node_modules"), // the old 'fallback' option (needed for npm link-ed packages)
        ],
        alias: {
            "styles": path.resolve(__dirname, 'styles/'),
        }
    },

    optimization: {
        noEmitOnErrors: true
    },

    plugins: [
        // выпилил лишние языки.
        //new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|ru/),
        //new webpack.ContextReplacementPlugin(/validatorjs[\/\\]src[\/\\]lang$/, /en|ru/),

        new HtmlWebpackPlugin({ // добавляет линки в шаблонный файл html
            template: './index.html',
            files: {
                css: ['style.css'],
                js: ["bundle.js"],
            }
        }),
    ]
};
