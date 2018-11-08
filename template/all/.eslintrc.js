module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'eslint-config-dsaco',
    ],
    parser: 'babel-eslint',
    env: {
        'browser': true,
    },
    plugins: [
        'react',
    ],
    settings: {
        react: {
            version: '16'
        }
    }
};