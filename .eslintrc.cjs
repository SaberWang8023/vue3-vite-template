module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:vue/vue3-recommended'],
  env: {},
  settings: {},
  globals: {},
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  plugins: ['prettier', '@typescript-eslint'],
  ignorePatterns: ['*.md'],
  rules: {
    // 缩进强制为 2 个空格，视情况开启
    // 在使用switch/case和三元运算多层嵌套时，eslint的检测规则和prettier规则会冲突 -- 宗纯
    // indent: ['error', 2],
    'no-unused-vars': 'off',
    camelcase: 'off',
    'no-magic-numbers': 'off',
    'no-loop-func': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  // 比如，如果同一个目录下的文件需要有不同的配置。因此，你可以在配置中使用 overrides 键
  overrides: [
    {
      files: ['*.vue'],
      extends: ['plugin:vue/vue3-recommended'],
      rules: {
        // 'vue/no-unused-vars': 'off',
        // 'vue/max-attributes-per-line': 'off',
        'vue/multi-word-component-names': 'off',
        // 'vue/no-mutating-props': 'off',
        // 'vue/singleline-html-element-content-newline': 'off',
        // 'vue/attribute-hyphenation': 'off',
        // 'vue/v-on-event-hyphenation': 'off',
        'vue/max-attributes-per-line': 'off',
        // 使用自闭合标签
        'vue/html-self-closing': [
          'error',
          {
            html: {
              void: 'always',
              normal: 'always',
              component: 'always',
            },
            svg: 'always',
            math: 'always',
          },
        ],
      },
    },
  ],
}
