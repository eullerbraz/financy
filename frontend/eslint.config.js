import eslint from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['dist', '.eslintrc.cjs'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'import/no-unresolved': [
        'error',
        {
          // Ignore specific extensions or patterns like ?react
          ignore: ['\\.svg$', '\\.css$', '\\.svg\\?react$'],
        },
      ],
    },
  },
];
