const getBase = ({dataMode} = {}) => {
    const base = `const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, '../src/main.jsx'),
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
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
                        plugins: [${dataMode === 'mobx' ? `
                            ['@babel/plugin-proposal-decorators', { legacy: true }],` : ''}
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
    `
    return base;
}

const getDev = ({ useScss, useEslint } = {}) => {
    const dev = `const webpack = require('webpack');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [${useEslint ? `
            {
                enforce: "pre",
                test: /\.jsx?$/,
                use: 'eslint-loader',
                exclude: /node_modules/,
            },` : ''}${useScss ? `
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
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
            },` : ''}
            {
                test: /\.(gif|jpg|png)$/,
                use: 'url-loader',
            },
        ],
    },
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
    `
    return dev;
}

const getProd = ({ useScss } = {}) => {
    const prod = `const path = require('path');

const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
${useScss ? `const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
` : ''}
const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
    mode: 'production',
    module: {
        rules: [${useScss ? `
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    },
                    'sass-loader',
                ],
            },` : ''}
            {
                test:/\.(gif|jpg|png)$/,
                use:'file-loader?name=images/[name].[ext]'
            },
        ],
    },
    output: {
        filename: 'scripts/[name].[chunkhash:8].js',
        path: path.resolve(__dirname, '../dist'),
        // publicPath: '/'
    },
    optimization: {
        minimizer: [
            new TerserPlugin(),${useScss ? `
            new OptimizeCSSAssetsPlugin({}),
                ` : ''}
        ],
    },${useScss ? `
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[chunkhash:8].css',
        }),
    ],` : ''}
});
    `
    return prod;
}

const getPkg = ({ useScss, useEslint, dataMode } = {}) => {
    const json = {
        "scripts": {
            "start": "webpack-dev-server --config build/webpack.config.dev.js",
            "build": "NODE_ENV=production webpack --config build/webpack.config.prod.js",
            "clean": "rimraf dist",
            "deploy": "npm run clean && npm run build"
        },
        "license": "ISC",
    };
    const devDependencies = {
        "@babel/core": "^7.4.5",
        "@babel/plugin-proposal-class-properties": "^7.4.4",
        "@babel/plugin-transform-runtime": "^7.4.4",
        "@babel/preset-env": "^7.4.5",
        "@babel/preset-react": "^7.0.0",
        "babel-loader": "^8.0.6",
        "file-loader": "^4.0.0",
        "html-webpack-plugin": "^3.2.0",
        "rimraf": "^2.6.3",
        "terser-webpack-plugin": "^1.3.0",
        "url-loader": "^2.0.0",
        "webpack": "^4.34.0",
        "webpack-cli": "^3.3.4",
        "webpack-dev-server": "^3.7.1",
        "webpack-merge": "^4.2.1",
    };
    const dependencies = {
        "@babel/runtime": "^7.4.5",
        "react": "^16.8.6",
        "react-dom": "^16.8.6",
        "react-hot-loader": "^4.11.0",
        "react-router-dom": "^5.0.1",
    };
    if (useEslint) {
        Object.assign(devDependencies, {
            "babel-eslint": "^10.0.1",
            "eslint": "^5.16.0",
            "eslint-config-dsaco": "^1.0.2",
            "eslint-loader": "^2.1.2",
            "eslint-plugin-react": "^7.13.0",
        });
    }
    if (useScss) {
        Object.assign(devDependencies, {
            "autoprefixer": "^9.6.0",
            "css-loader": "^3.0.0",
            "mini-css-extract-plugin": "^0.7.0",
            "node-sass": "^4.12.0",
            "optimize-css-assets-webpack-plugin": "^5.0.1",
            "postcss-loader": "^3.0.0",
            "sass-loader": "^7.1.0",
            "style-loader": "^0.23.1",
        });
    }
    if (dataMode === 'saga') {
        Object.assign(devDependencies, {
            "redux-logger": "^3.0.6",
        });
        Object.assign(dependencies, {
            "react-redux": "^7.1.0",
            "redux": "^4.0.1",
            "redux-saga": "^1.0.3",
        });
    } else if (dataMode === 'thunk') {
        Object.assign(devDependencies, {
            "redux-logger": "^3.0.6",
        });
        Object.assign(dependencies, {
            "react-redux": "^7.1.0",
            "redux": "^4.0.1",
            "redux-thunk": "^2.3.0",
        });
    } else if (dataMode === 'mobx') {
        Object.assign(devDependencies, {
            "@babel/plugin-proposal-decorators": "^7.4.4",
        });
        Object.assign(dependencies, {
            "mobx": "^5.10.1",
            "mobx-react": "^6.0.3",
        });
    }

    const devKeys = Object.keys(devDependencies).sort();
    const _devDependencies = {};
    devKeys.forEach(key => {
        _devDependencies[key] = devDependencies[key];
    });

    const depKeys = Object.keys(dependencies).sort();
    const _dependencies = {};
    depKeys.forEach(key => {
        _dependencies[key] = dependencies[key];
    });
    Object.assign(json, {
        devDependencies: _devDependencies,
        dependencies: _dependencies,
    });

    return JSON.stringify(json, null, '\t');
}

module.exports = {
    getBase,
    getDev,
    getProd,
    getPkg,
}
