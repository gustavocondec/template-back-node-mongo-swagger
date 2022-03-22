module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        // "google",
        "plugin:@typescript-eslint/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: ["tsconfig.json", "tsconfig.dev.json"],
        sourceType: "module",
    },
    ignorePatterns: [
        "/dist/**/*", // Ignore built files.
        '/test/**/*'
    ],
    plugins: [
        "@typescript-eslint",
        "import",
    ],
    rules: {
        "@typescript-eslint/no-unused-vars": ["error", { "ignoreRestSiblings": true }],
        quotes: ['error', 'single'],
        indent: ['warn', 2, {'SwitchCase': 1}],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        "space-before-blocks": ["error", "always"],
        'no-async-promise-executor': 'off',
        "no-multi-spaces": "error",
        "key-spacing": "error",
        "keyword-spacing": "error",
        "block-scoped-var": "error",
        "array-bracket-spacing": "error",
        "arrow-spacing": "error",
        "no-lone-blocks": "error"
    },
};
