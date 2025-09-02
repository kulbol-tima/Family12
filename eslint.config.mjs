import nextPlugin from 'eslint-plugin-next';

const eslintConfig = [
  {
    plugins: {
      next: nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
];

export default eslintConfig;
