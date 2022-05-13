module.exports = {
    plugins: ['prettier'],
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'airbnb-base',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    ignorePatterns: [
        '.eslintrc.js',
        'node_modules/',
        'docker-compose.yml',
        '@types/**/*',
    ],
    rules: {
        'no-console': 'off',
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'import/first': 'off',
        'consistent-return': 'off',
        'no-shadow': 'off',
    },
};
