const ExtractTextPlugin = require("extract-text-webpack-plugin");
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const routes = require('./app/config');

const extractProjectStyle = new ExtractTextPlugin("/css/styles.css");
const extractLibStyle = new ExtractTextPlugin("/css/styles.lib.css");

const root = path.resolve(__dirname);

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
                loaders: ["babel", "ts", "tslint-loader"]
            },
            {
                test: /\.hbs$/,
                exclude: /node_modules/,
                loaders: ["htmlhint", "handlebars"]
            },
            {
                test: /\.css$/,
                loader: extractProjectStyle.extract('css-loader'),
                include: [path.resolve(root, './app/pages/'), path.resolve(root, './app/layouts/'), path.resolve(root,'./app/modules/'), path.resolve(root, './app/general/')]
            },
            {
                test: /\.scss$/,
                loader: extractProjectStyle.extract(
                    'css-loader?modules&importLoaders=1&localIdentName=[name]-[hash:base64:5]__[local]!postcss!sass-loader'
                ),
                include: [path.resolve(root, './app/pages/'), path.resolve(root, './app/layouts/'), path.resolve(root, './app/modules/'), path.resolve(root, './app/general/')]
            },
            {
                test: /\.css$/,
                loader: extractLibStyle.extract('css-loader'),
                include: [path.resolve(root, "node_modules/"), path.resolve(root, "app/core")]
            },
            {
                test: /\.scss$/,
                loader: extractLibStyle.extract(
                    'css-loader?modules&importLoaders=1&localIdentName=[name]-[hash:base64:5]__[local]!postcss!sass-loader'
                ),
                include: [path.resolve(root, "node_modules/"), path.resolve(root, "app/core")]
            },
            {
                test: /\.(jpg|png|svg)$/,
                exclude: /node_modules/,
                loaders: ["file-loader?name=./img/img-[hash:4].[ext]&publicPath=."],
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader?limit=10000&minetype=application/font-woff&name=./fonts/[name].[ext]&publicPath=."
            },
            {
                test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader?name=./fonts/[name].[ext]&publicPath=."
            },
            {
                test: /webfont\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader?name=./fonts/[name].[ext]&publicPath=."
            }
        ]
    },
    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
    htmlhint: {
        "tagname-lowercase": true,
        "attr-lowercase": true,
        "attr-value-double-quotes": true,
        "attr-value-not-empty": true,
        "attr-no-duplication": true,
        "doctype-first": false,
        "tag-pair": false,
        "tag-self-close": true,
        "spec-char-escape": false,
        "id-unique": true,
        "src-not-empty": true,
        "title-require": false
    },
    tslint: {
        typeCheck: true,
        emitErrors: false,
        failOnHint: false,
        console: true
    },
    plugins: [
        extractLibStyle,
        extractProjectStyle,
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