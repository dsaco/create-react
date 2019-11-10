const webpack = require('webpack');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        hot: true,
        port: 3000,
        open: true,
        proxy: {
            '/api': {
                target: 'http://example.com',
                secure: false,
                changeOrigin: true,
            },
        },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
});
