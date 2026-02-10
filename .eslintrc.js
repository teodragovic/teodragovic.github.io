module.exports = {
    extends: ['eslint:recommended'],
    rules: {
        'brace-style': [2, '1tbs', { allowSingleLine: true }],
        'comma-dangle': [1, 'only-multiline'],
        'computed-property-spacing': [2, 'always'],
        'consistent-return': 0,
        curly: 1,
        'dot-location': [1, 'property'],
        'eol-last': 2,
        eqeqeq: 2,
        'global-require': 2,
        // indent: [ 2, 4, { SwitchCase: 1, MemberExpression: 0, CallExpression: { arguments: 'off' } } ],
        'key-spacing': [2, { beforeColon: false }],
        'linebreak-style': [2, 'unix'],
        'no-console': 0,
        'no-else-return': 0,
        'no-eval': 2,
        'no-implicit-coercion': 1,
        'no-implicit-globals': 2,
        'no-mixed-requires': 1,
        'no-multi-spaces': [1, { exceptions: { Property: true } }],
        'no-new-func': 1,
        'no-proto': 2,
        'no-trailing-spaces': 1,
        'no-undef': 2,
        'no-underscore-dangle': 0,
        'no-unused-vars': 0,
        'no-var': 2,
        'object-curly-spacing': [2, 'always'],
        'prefer-const': 1,
        // quotes: [2, 'single', { allowTemplateLiterals: true }],
        semi: [2, 'always'],
        'space-before-function-paren': [1, 'never'],
        'space-in-parens': [2, 'never'],
        'wrap-iife': [1, 'any'],
        yoda: 2
    },
    env: {
        es6: true,
        browser: true,
        node: true,
        'shared-node-browser': true
    },
    parserOptions: {
        ecmaVersion: 8,
        sourceType: 'module',
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true,
            impliedStrict: true
        }
    }
};
