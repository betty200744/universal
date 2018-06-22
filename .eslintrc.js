
module.exports = {
  extends: [
    'eslint-config-alloy/typescript-react',
  ],
  parser: 'typescript-eslint-parser',
  plugins: ['typescript'],
  globals: {
    // 这里填入你的项目需要的全局变量
    // 这里值为 false 表示这个全局变量不允许被重新赋值
    React: false,
    ReactDOM: false,
    document: false,
    System: false,
  },
  rules: {
    // 这里填入你的项目需要的个性化配置
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'prefer-template': 'error',
    "typescript/member-ordering":'off' ,
    "valid-jsdoc": [2, {
      "prefer": {
          "return": "returns"
      }
  }]
  },
};