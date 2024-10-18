---
title: let,var和const的区别
description:
time: 2024-3-16
---

# 写在前面

在 JavaScript 中，有`let`,`var`,`const`三种声明变量的关键词，可能会有很多刚接触 js 或者刚接触编程的小白会比较奇怪，为什么会有三种声明变量，这三种又有什么区别。

说实话，在写这篇博客之前我经常问 GPT 这三种的区别在哪，不过描述有些抽象而且也不影响日常使用所以也没有太在意。

虽然目前也没遇到什么问题，但是就是很好奇，所以仔细探究了一下并写了篇博客记录。

---

# 作用域

首先说明一下什么是作用域，作用域可以简单理解为`{}`之间的内容，花括号包括的就是一个作用域，例如：

-   全局作用域：字面意思，在整个 JavaScript 程序中都是全局作用域。
-   函数作用域：函数`function name(){}`的花括号内的部分。
-   块级作用域：所有的花括号，无论是函数还是 if 语句。

根据他们的区别，可以发现全局作用域是包含函数作用域，函数作用域包含块级作用域。

![1](/image/letvarconst/1.webp)

`var`具有的是函数作用域而不是块级作用域，而`let`是具有块级作用域的。

```javascript
// 块级作用域
if (true) {
	var a = true;
}

console.log(a); //true

// 函数作用域
function name() {
	var b = false;
}

console.log(b); // ReferenceError: b is not defined
```

在上面的举例代码中，`a`会直接打印`true`，而`b`会显示`ReferenceError`表示`b`没有被定义。这就是`var`的缺陷之一，没有块级作用域使他在全局作用域下任何一个地方都可以使用，包括在定义之前。

# var 允许反复声明

```javascript
if (true) {
	var a = true;
}

console.log(a); // true

var a = false;

console.log(a); //false
```

在上面的例子中，变量`a`被声明了两次，而打印的两次结果也不一样，这就归结于`var`关键词可以反复声明。

而`let`并不能被反复声明，在同一个作用域下，`let`只能声明一次。

```javascript
if (true) {
	let a = true;

	console.log(a);

	let a = false;

	console.log(a);
}
```

在上面这个例子，控制台会输出`SyntaxError: Identifier 'a' has already been declared`，表示`a`已经被声明。

# var 可以在声明之前使用

这个特性看起来就比较离谱，在声明前就能使用，就像是在被生下来之前就学会前端技术成为码农了。

```javascript
a = true;

console.log(a); // true

var a;
```

在上面的例子中，虽然 a 是在最后才被定义的，但是在他之前使用并不会报错，如果使用的是`let`，会显示`ReferenceError: Cannot access 'a' before initialization`表示在初始化前无法使用`a`。

人们一般称之为“提升”（英文为 “hoisting” 或 “raising”），因为所有`var`都被“提升”到了函数的顶部。

不过需要注意的是声明会被提升，而赋值不会。

```javascript
console.log(a); // undefined

var a = true;
```

在上面的例子中`a`就会显示`undefined`。

这是因为`var a = true`是两步操作：

1. `var a` 声明变量`a`
2. `a = true` 给`a`赋值

虽然声明被提升了，但是赋值并没有，所以才会出现`undefined`而不是`ReferenceError`。

# var 和 let 总结

`var`和`let`都是用来声明变量的，但是两者之间还是有一些区别的，比如`var`可以被反复声明，而`let`不能；`var`可以在声明前使用，而`let`不行；`var`声明的变量会提升到函数的顶部，而`let`不会。

或许你认为这并不是什么大问题，但是当你的代码量变大之后，你可能会在其他某个地方定义一个相同的变量，这时候就给自己埋了一颗雷，如果没爆还好，要是爆了恰巧你还忘记你之前就声明了同样的变量名，那简直是太刺激了。

# const

严格意义上来说，虽然`const`和`let`跟`var`都是声明变量的关键词，而且`const`和`let`非常相似。但是`const`是声明常数变量的关键词，也就是说`const`声明的变量是只读的，不能被修改。

```javascript
const a = true;

a = false;
```

运行上面的例子，控制台会输出`TypeError: Assignment to constant variable.`，表示`a`不能被反复赋值，一般只有在确定这个变量不会再修改之后才会使用的关键词。

> 重用还是新建？(源自 [《现代 JavaScript 教程》](https://zh.javascript.info/variables#zheng-que-ming-ming-bian-liang))
>
> 最后一点，有一些懒惰的程序员，倾向于重用现有的变量，而不是声明一个新的变量。
>
> 结果是，这个变量就像是被扔进不同东西盒子，但没有改变它的贴纸。现在里面是什么？>谁知道呢。我们需要靠近一点，仔细检查才能知道。
>
> 这样的程序员节省了一点变量声明的时间，但却在调试代码的时候损失数十倍时间。
>
> 额外声明一个变量绝对是利大于弊的。
>
> 现代的 JavaScript 压缩器和浏览器都能够很好地对代码进行优化，所以不会产生性能>问题。为不同的值使用不同的变量可以帮助引擎对代码进行优化。

# 总结

我们可以使用 `let` ， `var` ， `const` 声明变量来存储数据。

他们的区别可以简单理解为：

-   let： 现代的变量声明方式，是常用的声明方式。
-   var： 老旧的变量声明方式，一般情况不使用它。
-   const： 类似于`let`，但是变量的值无法被修改。

一般情况我们应该直接使用`let`，因为由于`var`的一些特性，没有特殊情况我们不应该使用，而是选择使用`let`，`const`则用于声明一些不会修改的变量。

可能对于你而言，反正`const`只是用于声明不会修改的变量，那我直接使用`let`就好了，反正我知道我自己不会修改它。事实上确实是如此，你可以直接使用`let`，但是最好还是使用`const`，因为`const`可以防止犯一些低级错误，使用`const`可以使代码更具清晰度和可读性（夫人，你也不想被其他程序员嘲笑你的屎山代码对吧），因为它明确表示了这个变量的值是不可变的。

# 参考

-   [《现代 JavaScript 教程》](https://chat.openai.com/)
-   chatGPT
