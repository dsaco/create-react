const path = require('path');

const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
    mode: 'production',
    output: {
        filename: 'scripts/[name].[chunkhash:8].js',
        path: path.resolve(__dirname, '../dist'),
    },
    module: {
        rules: [
            // src/styles引入的打包出css文件
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer'),
                            ],
                        },
                    },
                    'sass-loader',
                ],
                include: path.resolve(__dirname, '../src/styles'),
            },
            // 页面里引入的直接打包到style
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            },
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer'),
                            ],
                        },
                    },
                    'sass-loader',
                ],
                exclude: path.resolve(__dirname, '../src/styles'),
            },
            {
                test:/\.(gif|jpg|png)$/,
                use:'file-loader?name=images/[name].[ext]'
            },
        ],
    },
    output: {
        filename: 'scripts/[name].[chunkhash:8].js',
        path: path.resolve(__dirname, '../dist'),
        // 打包导出的文件前缀
        // publicPath: '/static/',
    },
    optimization: {
        minimizer: [
            new TerserPlugin(),
            new OptimizeCSSAssetsPlugin({}),
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[chunkhash:8].css',
        }),
    ],
});
