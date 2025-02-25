export default {
  useTabs: false,
  printWidth: 100, //单行长度
  tabWidth: 2, //缩进长度
  semi: false, //句末使用分号
  singleQuote: true, //使用单引号
  arrowParens: 'avoid', //单参数箭头函数省略圆括号
  proseWrap: 'preserve', //换行方式
  endOfLine: 'lf', //行结束符
  overrides: [
    {
      files: '*.md',
      options: {
        printWidth: 70,
        useTabs: false,
        trailingComma: 'none',
        arrowParens: 'avoid',
        proseWrap: 'never',
      },
    },
    {
      files: '*.{json,babelrc,eslintrc,remarkrc,prettierrc}',
      options: {
        useTabs: false,
      },
    },
  ],
}
