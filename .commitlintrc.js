module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'body-leading-blank': [1, 'always'], // body开始于空白行
    'footer-leading-blank': [1, 'always'], // footer开始于空白行
    'header-max-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'camel-case'], // scope驼峰
    'subject-empty': [2, 'never'], // subject不为空
    'subject-full-stop': [2, 'never', '.'], // subject结尾不加'.'
    'type-case': [2, 'always', 'lowerCase'], // type小写
    'type-empty': [2, 'never'], // type不为空
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'refactor', 'style', 'test', 'perf', 'chore', 'ci']],
  },
}
// ref https://conventional-changelog.github.io/commitlint/#/reference-rules
