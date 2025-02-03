module.exports = {
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    plugins: ['react-refresh'],
    rules: {
        'brace-style': ['error', 'stroustrup'],
        'comma-dangle': ['error', 'never'],
        'curly': ['error', 'all'],
        'eol-last': ['error', 'always'],
        'indent': ['error', 'tab'],
        'nonblock-statement-body-position': ['error', 'below'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'react-refresh/only-export-components': 'warn',
        '@typescript-eslint/ban-ts-comment': ['off'],
        '@typescript-eslint/no-explicit-any': ['off'],
        '@typescript-eslint/no-inferrable-types': ['error', {
            ignoreParameters: false,
            ignoreProperties: false
        }],
        '@typescript-eslint/no-non-null-assertion': ['off']
    }
};
