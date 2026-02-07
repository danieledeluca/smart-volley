// @ts-check
import antfu from '@antfu/eslint-config';

import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
    antfu(
        {
            type: 'app',
            vue: true,
            typescript: true,
            formatters: true,
            stylistic: {
                indent: 4,
                quotes: 'single',
                semi: true,
            },
        },
        {
            files: ['*.json'],
            rules: {
                'jsonc/indent': ['error', 2],
            },
        },
        {
            rules: {
                'no-console': ['warn'],
                'perfectionist/sort-imports': ['error', { tsconfig: { rootDir: '.' } }],
                'ts/consistent-type-definitions': ['error', 'type'],
                'unicorn/filename-case': ['error', { case: 'kebabCase', ignore: ['README.md'] }],
            },
        },
    ),
);
