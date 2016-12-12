const ExtractTextPlugin = require("extract-text-webpack-plugin");
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const routes = require('./app/routes');

module.exports = {
    debug: true,
    entry: {
        'builder': './app/builder.ts',
        'index': './app/index.ts'
    },
    devtool: 'source-map',
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.ts', '.js', '.hbs', '.jpg', '.png', '.scss', '.svg']
    },
    target: 'web',
    module: {
        loaders: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loaders: ["babel", "ts"]
            },
            {
                test: /\.hbs$/,
                exclude: /node_modules/,
                loaders: ["handlebars"]
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                    'css-loader'
                )
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract(
                    'css-loader?modules&importLoaders=1&localIdentName=[name]-[hash:base64:5]__[local]!postcss!sass-loader'
                )
            },
            {
                test: /\.(jpg|png)$/,
                exclude: /node_modules/,
                loaders: ["file-loader?name=./img/img-[hash:4].[ext]"]
            },
            {
                test: /\.(eot|ttf|woff|woff2|svg)$/,
                exclude: /node_modules/,
                loaders: ["file-loader?name=./fonts/[name].[ext]"]
            }
        ]
    },
    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
    plugins: [
        new ExtractTextPlugin("css/styles.css"),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new StaticSiteGeneratorPlugin('builder', routes.routes)
    ],
    output: {
        filename: "./js/[name].js",
        path: "./dist",
        libraryTarget: "umd"
    }
}