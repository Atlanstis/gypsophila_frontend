// eslint.config.js
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import vueParser from 'vue-eslint-parser';

export default [
  // 全局忽略
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'dist-ssr/**',
      '*.local',
      '.vscode/*',
      '!.vscode/extensions.json',
      '.idea/**',
      '.DS_Store',
      '*.suo',
      '*.ntvs*',
      '*.njsproj',
      '*.sln',
      '*.sw?',
      'src/types/components.d.ts',
    ],
  },

  // 基础JS规则
  js.configs.recommended,

  // 所有文件的基础设置
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
  },

  // TypeScript文件设置
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },

  // Vue文件设置
  ...eslintPluginVue.configs['flat/recommended'],

  // 自定义Vue规则
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        sourceType: 'module',
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
        },
        extraFileExtensions: ['.vue'],
        vueFeatures: {
          filter: false,
          interpolationAsNonHTML: true,
          styleCSSVariableInjection: true,
        },
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always',
          },
        },
      ],
    },
  },

  // Prettier配置（放在最后以覆盖其他风格规则）
  prettierConfig,
];
