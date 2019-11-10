const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, '../src/main.jsx'),
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            Assets: path.resolve(__dirname, '../src/assets/'),
            Components: path.resolve(__dirname, '../src/components/'),
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                        ],
                        plugins: [
                            '@babel/plugin-proposal-nullish-coalescing-operator',
                            '@babel/plugin-proposal-optional-chaining',
                            ['@babel/plugin-proposal-class-properties', { loose: true }],
                            '@babel/plugin-transform-runtime',
                            'react-hot-loader/babel',
                        ],
                    },
                },
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
        })
    ],
}