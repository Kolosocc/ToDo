import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginTypeScript from '@typescript-eslint/eslint-plugin';
import parserTypeScript from '@typescript-eslint/parser';
import pluginTailwindCSS from 'eslint-plugin-tailwindcss';
import pluginImport from 'eslint-plugin-import';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parser: parserTypeScript,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  // Подключение правил Next.js
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  // Правила для React
  {
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      'react/prop-types': 'off', // Отключено, так как используется TypeScript
    },
  },
  // Правила для TypeScript
  {
    plugins: {
      '@typescript-eslint': pluginTypeScript,
    },
    rules: {
      ...pluginTypeScript.configs.recommended.rules,
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Отключено для упрощения
    },
  },
  // Правила для Tailwind CSS
  {
    plugins: {
      tailwindcss: pluginTailwindCSS,
    },
    rules: {
      ...pluginTailwindCSS.configs.recommended.rules,
    },
  },
  // Правила для импортов
  {
    plugins: {
      import: pluginImport,
    },
    rules: {
      'import/no-anonymous-default-export': [
        'error',
        {
          allowArray: false,
          allowArrowFunction: false,
          allowAnonymousClass: false,
          allowAnonymousFunction: false,
          allowObject: false,
        },
      ],
    },
  },
];

export default eslintConfig;
