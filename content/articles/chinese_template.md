---
title: 中文文章测试模板
description: 这是用于修改排版样式的测试文章
time: 2024-11-02 20:20
---

# Markdown

> Markdown 是一种轻量级标记语言，创始人为[约翰·格鲁伯]()。它允许人们使用易读易写的纯文本格式编写文档，然后转换成有效的 XHTML（或者 HTML）文档。这种语言吸收了很多在电子邮件中已有的纯文本标记的特性。

由于 Markdown 的轻量化、易读易写特性，并且对于图片，图表、数学式都有支持，目前许多网站都广泛使用 Markdown 来撰写帮助文档或是用于论坛上发表消息。如 GitHub、Reddit、Discord、Diaspora、Stack Exchange、OpenStreetMap 、SourceForge、[简书]()等，甚至还能被用来撰写电子书。

## 历史

约翰·格鲁伯在 2004 年创造了 Markdown 语言，在语法上有很大一部分是跟亚伦·斯沃茨共同合作的。这个语言的目的是希望大家使用 ` 易于阅读、易于撰写的纯文字格式，并选择性地转换成有效的 XHTML（或是 HTML） ` 。

其中最重要的设计是可读性，也就是说这个语言应该要能直接在字面上阅读，而不用记忆格式化指令标记（像是 RTF 与 HTML）。

因此，它是现行电子邮件标记格式的惯例，虽然它也借鉴了几个早期的标记语言，如：Setext（英语：Setext）、Textile (markup language)（英语：Textile (markup language)）、reStructuredText。格鲁伯也编写了的 Perl 脚本：Markdown.pl，用于把 Markdown 语法编写的内容转换成有效的、结构良好的 XHTML 或 HTML 内容，并将左尖括号<和&号替换成它们各自的字符实体引用。它可以用作单独的脚本，Blosxom 和 Movable Type 的插件又或者 BBEdit 的文本过滤器。Markdown 也已经被其他人用 Perl 和别的编程语言重新实现，其中一个 Perl 模块放在了 CPAN(Text::Markdown)上。它基于一个 BSD 风格的许可证分发并可以作为几个内容管理系统的插件。

### Markdown Extra

Markdown Extra 是一种轻量级标记语言，基于在 PHP（最初）、Python 和 Ruby 中实现的 Markdown。它添加了普通 Markdown 语法不具备的功能。内容管理系统支持 Markdown Extra，例如 Drupal，TYPO3 和 MediaWiki。

它为 Markdown 添加了以下功能：

-   HTML 块内的 Markdown 标记

-   具有 id / class 属性的元素

-   围栏代码块

-   表格

-   定义清单

-   脚注

-   缩写

#### 表格

| 文件                          | 路径                |
|:---------------------------:|:-----------------:|
| content/demo1.md            | /demo1            |
| content/demo2.md            | /demo2            |
| content/article/article1.md | /article/article1 |

#### 代码块

```javascript
const handleTime = (time) => {
	if (time === null) {
		this.updateTime = false;
		return;
	};

	// 使用Date对象解析ISO 8601格式的时间戳
	const date = new Date(time);

	// 解析时间
	const months = date.getMonth();
	const day = date.getDate();
	const year = date.getFullYear();
	const hours = date.getHours().toString().padStart(2, "0"); // 确保两位数
	const minutes = date.getMinutes().toString().padStart(2, "0"); // 确保两位数
	const seconds = date.getSeconds().toString().padStart(2, "0"); // 确保两位数

	// 将月份转换为缩写格式
	const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const month = monthArray[months];

	// 返回格式化的时间字符串
	return `$`month` $`day`, $`year``;
};
```

#### 图片

![1.jpg](https://github.com/sooooooooooooooooootheby/sooooooooooooooooootheby/raw/main/Canvas-Ruom.webp)

![2.jpg](https://pbs.twimg.com/media/GKzKH9UbcAA-5_E?format=jpg&name=large)
