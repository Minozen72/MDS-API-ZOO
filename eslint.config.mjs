import js from '@eslint/js';
import prettier from 'eslint-config-prettier';

export default [
    js.configs.recommended,
    prettier,
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                window: 'readonly',
                document: 'readonly',
                console: 'readonly',
                io: 'readonly',
                process: 'readonly',
                module: 'readonly',
                require: 'readonly',
                exports: 'writable',
                __dirname: 'readonly',
                __filename: 'readonly'
            }
        },
        rules: {
            'no-unused-vars': ['warn', { 
                "vars": "all",
                "args": "none",
                "ignoreRestSiblings": false,
                "varsIgnorePattern": "^_",
                "argsIgnorePattern": "^_"
            }],
            'no-console': 'off',
            'no-undef': 'error'
        }
    },
];
