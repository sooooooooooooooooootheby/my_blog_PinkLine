---
title: MDC 语法
description:
data: 2025-04-03T17:09:14.000Z
dataed:
categories: markdown
file: MDC_demo
---

# MDC Syntax Demo

::: tip 什么是 MDC？
MDC (Markdown Components) 是传统 Markdown 的扩展语法，允许嵌入动态组件和自定义样式。
:::

## 基础语法

### 1. 文本格式化

-   **加粗文本**、_斜体_、~~删除线~~
-   行内代码：`console.log("Hello MDC")`
-   颜色标记：<span style="color: #ff6600">橙色文字</span>

### 2. 列表

-   无序列表项
    -   嵌套项

1. 有序列表项
2. 第二项

### 3. 链接与图片, emoji

[深度求索官网](https://www.deepseek.com)
![MDC Logo](/Canvas-Ruom.webp)

这是自定义emoji<img src="https://gcore.jsdelivr.net/gh/sooooooooooooooooootheby/Emoji_Chest@v1.0.0/package/aurakingdom/SerenaBlush.png" alt="SerenaBlush.png" class="emoji">

## MDC 扩展组件

### 选项卡 (Tabs)

::: tabs

-   **Python**
    ```python
    print("Hello from Python!")
    ```
-   **JavaScript**
    ```js
    console.log("Hello from JS!");
    ```
    :::

### 提示框 (Callouts)

::: warning
这是一个警告提示，用于重要注意事项。
:::

::: success
操作成功完成！
:::

### 代码组

::: code-group

```bash [Bash]
echo "Hello Terminal"
```

```powershell [PowerShell]
Write-Host "Hello PowerShell"
```

:::

## 表格

| 语法      | 描述     |
| --------- | -------- |
| `#`       | 一级标题 |
| `::: tip` | 提示容器 |

## 数学公式（KaTeX）

行内公式：$E=mc^2$

块级公式：

$$
\nabla \cdot \mathbf{E} = \frac{\rho}{\epsilon_0}
$$

## 注释

<!-- 这是隐藏的注释，渲染时不可见 -->
