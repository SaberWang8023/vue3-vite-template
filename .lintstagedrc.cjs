module.exports = {
  '*.{json,js,cjs,jsx}': ['prettier --write', 'eslint --fix'],
  // 在lint-staged 中 tsc 做不了增量文件的类型检测，会拿不到tsconfig，所以只能用函数的方式，全量跑项目。
  '*.{ts,tsx}': ['prettier --write', 'eslint --fix', () => 'tsc --noEmit --skipLibCheck'],
  'src/**/*.vue': ['prettier --write', 'eslint --fix', () => 'vue-tsc --noEmit --skipLibCheck'],
}
