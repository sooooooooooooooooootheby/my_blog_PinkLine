---
title: Prettier插件配置指南
ai: deepseek-chat
---

::user
prettier插件怎么配置
::

::assistant
# Prettier 插件配置指南

Prettier 是一个流行的代码格式化工具，以下是配置 Prettier 插件的方法：

## 安装 Prettier

首先需要安装 Prettier：

```bash
npm install --save-dev prettier
# 或
yarn add --dev prettier
```

## 基本配置

1. 创建配置文件 (`.prettierrc` 或 `prettier.config.js`)

### JSON 格式 (`.prettierrc`)
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}
```

### JavaScript 格式 (`prettier.config.js`)
```javascript
module.exports = {
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 80
};
```

## 常用配置选项

| 选项 | 描述 | 默认值 |
|------|------|--------|
| `printWidth` | 每行最大字符数 | 80 |
| `tabWidth` | 缩进空格数 | 2 |
| `useTabs` | 使用制表符代替空格 | false |
| `semi` | 语句末尾添加分号 | true |
| `singleQuote` | 使用单引号 | false |
| `trailingComma` | 多行时尽可能打印尾随逗号 | "es5" |
| `bracketSpacing` | 对象字面量中括号间添加空格 | true |
| `jsxBracketSameLine` | 将多行JSX元素的 `>` 放在最后一行的末尾 | false |
| `arrowParens` | 箭头函数参数添加括号 | "avoid" |
| `endOfLine` | 换行符类型 | "lf" |

## 编辑器插件配置

### VS Code
1. 安装 Prettier - Code formatter 插件
2. 在设置中启用 "Format On Save"
3. 添加以下设置：
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

### WebStorm/IntelliJ
1. 安装 Prettier 插件
2. 前往 `File > Settings > Languages & Frameworks > JavaScript > Prettier`
3. 指定 Prettier 包路径
4. 启用 "On save" 选项

## 忽略文件

创建 `.prettierignore` 文件来指定不需要格式化的文件：

```
# 忽略目录
node_modules/
dist/
build/

# 忽略特定文件
package-lock.json
```

## 与 ESLint 集成

如果需要与 ESLint 一起使用，安装：

```bash
npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```

然后在 ESLint 配置中添加：

```json
{
  "extends": ["plugin:prettier/recommended"]
}
```

这样配置后，Prettier 就可以在你的项目中使用了，它会根据你的配置自动格式化代码。
::