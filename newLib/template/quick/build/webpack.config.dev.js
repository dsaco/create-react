const path = require('path');
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
                // 如果是https接口，需要配置这个参数
                secure: false,
                // 如果接口跨域，需要进行这个参数配置
                changeOrigin: true,
            },
        },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
});
