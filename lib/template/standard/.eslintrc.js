module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
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
    },
    rules: {
        'getter-return': 2,
        'curly': 2,
        'array-bracket-spacing': 1,
        'arrow-parens': 2,
        'block-spacing': 1,
        'no-multiple-empty-lines': [1, { max: 1 }],
        'arrow-spacing': 1,
        'no-duplicate-imports': 2,
        'no-var': 2,
        'comma-spacing': 1,
        'comma-dangle': [1, 'always-multiline'],
        'no-undef': 0,
        'semi': 1,
        'space-before-blocks': 1,
        'quotes': [1, 'single', { 'allowTemplateLiterals': true }],
        'jsx-quotes': [1, 'prefer-double'],
        'react/prop-types': 0,
    },
};
