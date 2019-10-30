const path = require('path');

const merge = require('webpack-merge');

const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
    mode: 'production',
    output: {
        filename: 'scripts/[name].[chunkhash:8].js',
        path: path.resolve(__dirname, '../dist'),
    },
});
