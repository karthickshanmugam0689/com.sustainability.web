module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended',
    ],
    plugins: ['core-dev-linting', 'jsdoc', 'react-hooks', 'prettier', 'import', 'lodash', 'shopify-lean'],
    parserOptions: {
        ecmaVersion: 2015, // Allows for the parsing of modern ECMAScript features
        ecmaFeatures: {
            jsx: true,
        },
        sourceType: 'module', // Allows for the use of imports
    },
    rules: {
        '@typescript-eslint/ban-types': [
            'warn',
            {
                types: {
                    'React.FC': {
                        message:
                            'Considered bad practice. https://kentcdodds.com/blog/how-to-write-a-react-component-in-typescript',
                    },
                    FC: {
                        message:
                            'Considered bad practice. https://kentcdodds.com/blog/how-to-write-a-react-component-in-typescript',
                    },
                },
            },
        ],
        '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
        '@typescript-eslint/explicit-member-accessibility': ['warn', { accessibility: 'explicit' }],
        '@typescript-eslint/member-ordering': ['warn'],
        '@typescript-eslint/no-duplicate-imports': ['error'],
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-restricted-imports': [
            'warn',
            {
                patterns: ['@sixt-web/core-oxide/src/ui/private*'],
                message: 'Import from within oxide locally. Do not import from the oxide namespace.',
            },
        ],
        'lodash/import-scope': [2, 'method'],
        'no-restricted-imports': [
            'warn',
            {
                paths: [
                    {
                        name: 'react',
                        importNames: ['default'],
                        message: 'Importing React as default is no longer required',
                    },
                ],
            },
        ],
        'no-return-assign': ['warn', 'always'],
        // #####
        // related to imports
        // #####
        'import/order': [
            'warn',
            {
                groups: ['builtin', 'external', 'internal', ['parent', 'sibling']],
                pathGroups: [
                    {
                        pattern: 'react',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: '@sustainability/**',
                        group: 'external',
                        position: 'after',
                    },
                    {
                        pattern: 'root/**',
                        group: 'internal',
                    },
                    {
                        pattern: '@/**',
                        group: 'internal',
                    },
                ],
                pathGroupsExcludedImportTypes: ['builtin'],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
        'sort-imports': [
            'warn',
            {
                ignoreCase: false,
                ignoreDeclarationSort: true,
                ignoreMemberSort: false,
                memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
                allowSeparatedGroups: true,
            },
        ],
        // #####
        // related to quotations
        // #####
        'no-useless-concat': 'warn',
        'object-shorthand': 'warn',
        curly: 'warn',
        'one-var': ['error', 'never'],
        'prefer-template': 'warn',
        // #####
        // prettier and react based rules
        // #####
        'prettier/prettier': 'error',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'react-hooks/exhaustive-deps': 'warn',
        'react-hooks/rules-of-hooks': 'error',
        // #####
        // from https://github.com/sebastian-software/eslint-plugin-shopify-lean
        // #####
        'shopify-lean/jsx-no-complex-expressions': 'warn',
        'shopify-lean/prefer-early-return': ['warn', { maximumStatements: 5 }],
        'shopify-lean/prefer-module-scope-constants': 'warn',
        'shopify-lean/typescript/prefer-pascal-case-enums': 'warn',
        'shopify-lean/typescript/prefer-singular-enums': 'warn',
    },

    overrides: [
        {
            files: ['*.tsx'],
            rules: {
                'max-lines': ['warn', { max: 300, skipComments: true, skipBlankLines: true }],
            },
        },
        {
            files: ['*.stories.tsx'],
            rules: {
                'core-dev-linting/no-restricted-imports-custom-error': 'off',
            },
        },
    ],

    globals: {
        Action: false,
        __DEV__: false,
        __PROD__: false,
        __DEBUG__: false,
        __DEBUG_NEW_WINDOW__: false,
        __BASENAME__: false,
        __APP_VERSION__: false,
        __THEME__: false,
        __IS_DEFAULT__: false,
        expect: false,
        should: false,
        sinon: false,
        shallow: false,
        mount: false,
        google: true,
        __dirname: true,
        path: true,
        cy: true,
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                moduleDirectory: ['node_modules', 'src/'],
            },
        },
    },
};
