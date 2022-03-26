module.exports = {
    plugins: ['prettier'],
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['airbnb-base', 'pllugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    ignorePatterns: ['.eslintrc.js', 'node_modules/', 'docker-compose.yml'],
    rules: {},
};
