---
title: 解决 nuxt.js 安装失败
description: 解决因为网络问题导致无法正常安装 nuxt.js项目的问题
data: 2024-12-27T15:42:14.000Z
dataed: 2024-12-26T18:11:32.000Z
categories: 前端
file: nuxt_setup_error
---

想玩玩 nuxt.js, 但是安装的时候发现报错了.

![终端报错](https://image.s22y.moe/image/nuxt_setup_error/1.webp)

经典的网络错误.

解决方法也很简单, 直接将报错内容中的 URL 复制到浏览器, 如果能够看到如下结构并且含有 `tar` 的键值, 恭喜你, 你可以接着往下看了, 如果没有, 或许你得考虑看看其他人的解决方案了.

![json](https://image.s22y.moe/image/nuxt_setup_error/2.webp)

将 `tar` 的值复制到地址栏打开, 浏览器就会下载一个压缩包, 直接将里面的文件夹解压出来, 这个文件夹就是 nuxt.js 的初始demo了, 把它复制到你需要的地方然后就能够正常使用了.

```
https://codeload.github.com/nuxt/starter/tar.gz/refs/heads/v3
```

![压缩包](https://image.s22y.moe/image/nuxt_setup_error/3.webp)