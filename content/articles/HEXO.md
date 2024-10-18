---
title: 从0开始的HEXO博客主题制作
description: 教你如何制作一个属于你的HEXO主题
time: 2024-2-07
---

# 写在前面

本文派生自[从零开始写一个Hexo主题](https://developer.aliyun.com/article/1071971)，因为原来这篇文章我感觉缺少一些细节（但是对于刚接触hexo的小白来说足够了），所以在此基础上加入了一些常用功能，并写了一部分主题制作外的内容，保证前端小白（或者刚接触hexo的小白）能理解。

本文目的是为了了解Hexo博客主题的组成和编写方法，本文的示例博客页面不会有过多的样式，样式主要参考vitepress的默认主题（啥？你问我为什么不直接用vitepress？因为vitepress主题的入门门槛比较高，并不适合前端小白（包括我XD））。

本文使用的操作系统是windows11，在命令行部分和Linux，mac可能会有些出入，不过无关紧要，命令行的部分并不多。使用的包管理器是pnpm，如果你没使用过pnpm直接使用npm也没问题。

# 准备工作

在开始学习制作一个基础的Hexo博客主题前，你或许需要了解一些知识点

* 模板引擎语法
* css预处理器
* YML语法
* Hexo文档
* nodejs的包管理

本文使用的模板引擎为 `ejs`，使用的预处理器是 `Stylus`这。也是 hexo 项目预装了的 render 插件，如果想使用其他模板引擎或者其他 CSS 预处理器，可以安装相对应的 render 插件。当然你也可以选择直接使用原生的css而非预处理器，只不过原生css在维护上会有一些麻烦。

本文的完整代码：https://github.com/sooooooooooooooooootheby/hexo-theme-vitepress/tree/main/hexoDemo

在示例中会用到hexo的[官方图标](https://hexo.io/logo.svg)，本文教程中图保存在主题目录下的 `source/img`中。

# 目录结构

当你在你的电脑上完成hexo的安装以及使用命令完成了建站，就会得到一个初始的hexo博客网站。默认的地址为localhost:4000

```shell
# 当你第一次使用hexo，需要安装hexo手脚架（需要安装node.js）
pnpm install -g hexo-cli
# 建立hexo博客项目
hexo init hexoDemo
# 进入博客项目
cd hexoDemo
# 安装所需依赖
pnpm install
# 在本地启动博客网站 c全拼clean，用于清空缓存；g全拼generate，用于生成静态文件；s全拼server，用于启动服务器
hexo c ; hexo g ; hexo s
```

![1](/image/HEXO/1.webp)

此时博客项目的目录如下

```
.hexoDemo
├────.github
├────node_modules
├────public
├────scaffolds
├────source
├────themes
├──.gitignore
├──_config.landscape.yml
├──_config.yml
├──db.json
├──package.json
├──pnpm-lock.yaml
└──yarn.lock
```

或许会让人有些眼花缭乱，不过我们的目的是为了制作主题，所以我们只需要关注 `themes`和 `_config.yml`即可。前者是hexo的主题目录，我们制作或者从别人那下载的主题都需要放进这个目录，后者是hexo的配置文件，我们需要在这里修改博客所使用的主题。

现在我们在 `themes`目录下新建一个文件夹 `themeDemo`作为我们的主题，文件名就是主题的名字，并且完善一下主题的目录。

```
.hexoDemo
└─themes
  └─themeDemo
    ├─layout        # 主题布局模板文件
    ├─source        # 资源文件目录，存放样式文件，js脚本等
    └─_config.yml   # 主题配置文件
```

现在我们需要修改一下 `_config.yml`，注意，这里修改的配置文件是hexo的配置文件而非主题的配置文件。

修改99行的 `theme`值为 `themeDemo`，也就是修改为主题的名字。

```
# _config.yml

......

# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: themeDemo                       # 默认值为landscape

......
```

此时由于我们修改了配置文件，所以需要重新执行 `hexo c ; hexo g ; hexo s`的指令重启博客。

重启完成后再打开localhost:4000，你会发现页面一片空白，并且控制台显示 `No layout: index.html`，这是正常的，因为我们还没开始编写主题。

# 配置文件

或许你会对两个 `_config.yml`配置文件产生一些疑惑，没事，这两个配置文件并不复杂。

一个配置文件是位于站点根目录的，另一个是位于主题根目录的。

这两个配置文件中，对于整个hexo博客系统最重要的是站点根目录的配置文件，这个配置文件中包含了各种信息，包括博客名称，作者，语言，插件配置等等。另一个位于主题根目录的配置文件用于配置插件，自定义页面等信息。

这里会简单介绍一下根目录的配置文件中的键值作用。（大部分配置并不需要关心，所有有的部分看不懂没关系，只要它不影响到你的网站就可以）

```
# Site
title: Hexo        # 网站的标题
subtitle: ''       # 网站的副标题
description: ''    # 网站的描述，会在搜索引擎中显示
keywords:          # 网站的关键词。用于优化搜索引擎，帮助搜索引擎了解网站内容
author: John Doe   # 网站的作者
language: en       # 网站的语言
timezone: ''       # 网站的时区，用于管理显示的日期时间

# URL
url: http://example.com                   # 网站的基本URL
permalink: :year/:month/:day/:title/      # 永久连接格式，默认格式表示文章链接根据发布时间和标题生成
permalink_defaults:                       # 永久链接的默认设置
pretty_urls:                              # 链接美化选项
  trailing_index: true                    # 是否在链接尾部添加 index.html
  trailing_html: true                     # 是否在链接末尾添加 index

# Directory                  # 设置网站目录的基本结构
source_dir: source           # 存放源文件（css,js,image...）的目录
public_dir: public           # 公共文件目录，存放生成的静态网页文件的目录
tag_dir: tags                # 标签目录，存放标签页面的目录
archive_dir: archives        # 存档目录，存放存档页面的目录
category_dir: categories     # 分类目录，存放分类页面的目录
code_dir: downloads/code     # 代码目录，存放代码文件的目录
i18n_dir: :lang              # 国际化目录，存放国际化资源的目录
skip_render:                 # 跳过渲染，指定哪些文件或目录不需要渲染

# Writing
new_post_name: :title.md          # 新文章的文件名格式
default_layout: post              # 指定文章页的默认布局
titlecase: false                  # 标题大小写转换，false表示不转换
external_link:                    # 外部链接设置
  enable: true                    # 是否启用在新标签页中打开外部链接
  field: site                     # 外部链接设置的范围，site表示应用到整个站点
  exclude: ''                     # 排除的外部链接
filename_case: 0                  # 文件名大小写设置，设置为0表示保持原样
render_drafts: false              # 渲染草稿文章，false表示不渲染草稿
post_asset_folder: false          # 文章资源文件夹，指定是否为每篇文章创建一个资源文件夹，false表示不创建
relative_link: false              # 相对链接，false表示不使用相对链接
future: true                      # 未来文章日期，指定是否允许发布未来日期的文章，true表示允许
syntax_highlighter: highlight.js  # 语法高亮的插件，这里指定了highlight.js
highlight:                        # highlight语法高亮的设置
  line_number: true               # 是否显示行号，true表示显示
  auto_detect: false              # 是否自动检测语言，false表示不自动检测
  tab_replace: ''                 # 选项卡替换，留空表示没有替换
  wrap: true                      # 是否换行，true表示换行
  hljs: false                     # 是否启用highlight.js，false表示不使用
prismjs:                          # psismjs语法高亮的设置
  preprocess: true                # 是否预处理，true表示预处理
  line_number: true               # 是否显示行号，true表示显示
  tab_replace: ''                 # 选项卡替换，留空表示没有替换

# Home page setting
index_generator:    # 首页的相关设置
  path: ''          # 博客首页的根目录
  per_page: 10      # 每页显示的文章数量
  order_by: -date   # 文章的排序方式，-date表示按日期降序排序，意思是最新的文章排在前面

# Category & Tag
default_category: uncategorized   # 默认分类，如果文章没有指定分类时自动归类到uncategorized
category_map:                     # 分类映射，例如想要把a分类映射到b，可以在这里设置
tag_map:                          # 标签分类，和上一项相同

# Metadata elements
meta_generator: true    #元数据生成器。指定是否在生成的HTML页面中包含一个元数据标签来指示网站生成工具的名称和版本信息。

# Date / Time format
date_format: YYYY-MM-DD   # 文章发布的日期显示格式
time_format: HH:mm:ss     # 文章发布的时间格式
updated_option: 'mtime'   # 更新选项，指定如何处理文章更新时间的选项，mtime表示文件的修改时间为更新时间

# Pagination
per_page: 10            # 指定博客中每页显示的文章数量
pagination_dir: page    # 指定存放分页文件的目录

# Include / Exclude file(s)
## 这些选项允许您指定要包含、排除或忽略的文件，通常应用于源文件夹。在这个例子中，这些选项被留空，表示没有进行额外的设置。
include:    # 包含
exclude:    # 排除
ignore:     # 忽略

# Extensions
theme: themeDemo    # 指定文章的主题

# Deployment
deploy:
  type: ''    #部署站点的类型
```

# 局部模板

通过分析常见的博客网站可以发现，大部分博客网站都是由三部分组成：顶部导航栏，中间内容区域，以及底部页脚。每次点击跳转时，导航栏和页脚是不会发生变化的，只有中间的内容区域被重新渲染，因此，我们可以将通用的代码抽离成局部模板以复用

在 `layout`目录下新建 `_partial`目录，并在该目录下添加 `head.ejs`,`header.ejs`以及 `footer.ejs`文件。

* _partial 放置局部模板的目录
* head.ejs 存放<head>标签的内容
* header.ejs 存放导航栏的html内容
* footer.ejs 存放页脚的html内容

部分ejs的文件名不是固定的，你可以随心所欲地修改，只要你不会忘记这个文件的作用就行。

```html
# layout/_partial/head.ejs

<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
    <title>Hexo</title>
</head>
```

```html
# layout/_partial/header.ejs

<header>
    我是导航栏
</header>
```

```html
# layout/_partial/footer.ejs

<footer>
    我是页脚
</footer>
```

在 `laiout`目录下新建 `laiout.ejs`文件，用于引入ejs文件，`layout.ejs`文件是通用的布局文件模板，后续新增的ejs文件都会继承 `layout.ejs`，并填充进入 `body`。

```html
# layout/layout.ejs

<!DOCTYPE html>
<html>
<%- partial('_partial/head') %>
<body>
    <div class="container">
    <%- partial('_partial/header') %>
    <%- body %>
    <%- partial('_partial/footer') %>
    </
</
</
```

> 注意！`body`很重要，后续我们添加的index.ejs或者自定义页面的内容模板引擎会自动填入 `body`。请不要写成下面这样，这是错误的，尽管他会正常运行，但是这样就没有使用模板引擎的意义了。
> 
> ```
> <!DOCTYPE html>
> <html>
> <%- partial('_partial/head') %>
> <body>
>     <div class="container">
>     <%- partial('_partial/header') %>
>     <%- partial('index') %>
>     <%- partial('_partial/footer') %>
>     </div>
> </body>
> </html>
> ```

# 首页

首页是我们网站加载完成后的第一个页面。

在 `layout`目录下新建 `index.ejs`文件，`index.ejs`首页将会继承 `layout.ejs`布局文件生成HTML文件。

```html
# layout/index.ejs

<home>
    <h1>hello world</h1>
</home>
```

这时不需要重启服务器，直接在浏览器中刷新即可看见效果了。

![2](/image/HEXO/2.webp)

# 编写导航栏和页脚

前面我们已经完成了页面框架的搭建，现在需要往框架中填入内容完善我们的主题。

以下两个文档我们将会频繁使用，最好先阅读一遍了解大概.

* [Hexo | 变量](https://hexo.io/zh-cn/docs/variables)
* [Hexo | 辅助函数](https://hexo.io/zh-cn/docs/helpers)

```html
# layout/_partial/head.ejs

<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
    <title><%= config.title %></title>
</head>
```

这里的 `<%= config.title %>`是一个全局变量，也就是根目录下的 `_config.yml`hexo博客配置文件中的配置。除此之外还有 `theme`主题变量，也就是主题根目录下的  `_config.yml`主题配置文件中的配置。

编写导航栏

```html
# layout/_partial/header.ejs

<header>
    <div class="title">
        <img src="<%= url_for('img/logo.svg') %>" alt="logo">
        <a href="<%= url_for() %>" class="logo"><%= config.title %></a>
    </div>
    <nav class="navbar">
        <ul class="menu">
            <li class="menu-item">
                <a href="/" class="menu-item-link">Home</a>
            </li>
            <li class="menu-item">
                <a href="/categories" class="menu-item-link">Categories</a>
            </li>
            <li class="menu-item">
                <a href="/tags" class="menu-item-link">Tags</a>
            </li>
            <li class="menu-item">
                <a href="/archives" class="menu-item-link">Archives</a>
            </li>
        </ul>
    </nav>
</header>
```

编写页脚

```html
# layout/_partial/footer.ejs

<footer>
    <p>Theme is <a href="/" target="_blank">Theme-example</a> by <a href="<%= config.url %>" target="_blank"><%= config.author %></a></p>
    <p>Powered by <a href="https://hexo.io/" target="_blank" rel="nofollow">hexo</a> © <%- date(Date.now(), 'YYYY') %></p>
</footer>
```

这样，我们就能得到一个简单的包含导航栏和页脚的简单页面

![3](/image/HEXO/3.webp)

# 添加主题配置

如果我们需要给导航菜单根据我们的需要添加不同的项目，在上面例子的写法并不方便修改以及后期维护。所以我们可以在主题的配置文件中添加导航菜单的配置。

```yaml
# themeDemo/_config.yml

logo: <%= url_for('img/logo.svg') %>
menu:
  home: /
  categories: /categories
  tags: /tags
  archives: /archives
  post: /post
```

修改好主题配置文件我们就可以把导航栏的菜单设置修改为下面的样子。

```html
# layout/_partial/header.ejs

<header>
    <div class="title">
        <img src="<%= url_for('img/logo.svg') %>" alt="logo">
        <a href="<%= url_for() %>" class="logo"><%= config.title %></a>
    </div>
    <nav class="navbar">
        <ul class="menu">
            <% for (name in theme.menu) { %>
            <li class="menu-item">
                <a href="<%- url_for(theme.menu[name]) %>" class="menu-item-link"><%= name %></a>
            </li>
            <% } %>
        </ul>
    </nav>
</header>
<headerBar></headerBar>
```

或许这种动态配置写法会让你有些头大，但是这样会方便你的后期维护。假如你想要在导航栏添加一个自定义页面的按钮，只需要在主题配置文件中添加一个键值即可，当然关于自定义页面我们后面会说到。

# 添加自定义页面

说实话这个部分应该放到后面再说的，但是因为我们是按照vitepress的默认主题进行编写的，所以这个部分还是放到前面比较合适。

这个页面我们将同时包含文章列表，文章详细页和文章目录

```html
# 新建文章页 layout/post.ejs

<post>
    <postList>
        <div class="list">
            <span>
                <a href="/post">文章列表</a>
            </span>
            <% if (site.posts && site.posts.length) { %>
                <% site.posts.each(function (post) { %>
                    <section>
                        <a href="<%- url_for(post.path) %>">
                            <%= post.title %>
                        </a>
                    </section>
                <% }) %>
            <% } %>
        </div>
    </postList>
    <article>
        <div class="post">
            <div class="post-title">
                <h2 class="title">
                    <%= page.title %>
                </h2>
            </div>
            <div class="post-meta">
                <span class="post-time"><%- date(page.date, "YYYY-MM-DD" ) %></span>
            </div>
            <div class="post-content">
                <%- page.content %>
            </div>
        </div>
    </article>
    <toc>
        <div class="toc">
            <p>目录</p>
            <%- toc(page.content) %>
        </div>
    </toc>
</post>
```

然后在终端执行 `hexo new page post`手动生成新页面，并在新生成的文件中添加键值，以此告诉hexo新页面的目录。

```yaml
# 站点根目录/source/post/index.md

---
title: post
date: 2024-02-22 11:16:01
layout: post           # 默认是没有这一键值的，需要我们手动添加
---
```

# 添加样式

至此，我们完成了一个基本Hexo博客网站所需的功能，样式文件我们会使用stylus css预处理器添加样式。

这里不会详细说每个步骤该怎么做，因为这并不是文章的重点。如果对stylus有疑问可以翻阅[stylus官方文档](https://www.stylus-lang.cn/)，如果你想要使用sass也是没有任何问题的，但是你想使用原生css还是劝你费点劲用预处理器，因为原生css真的会对你之后的开发维护带来困难。

## 实时刷新插件

顺带在这里推荐一个插件 `Browsersync`，可以实时监控文件变化并刷新网页，这样你就不用写一点要切回浏览器刷新了。

在任意目录执行安装Browsersync

```shell
pnpm install -g browser-sync
```

在你的博客目录下执行安装hexo的刷新插件

```shell
pnpm install hexo-browsersync --save
```

两个安装完成后执行 `hexo c ; hexo g ; hexo s`即可。

这时控制台会出现三个URL，不用管上面的3001端口的URL，直接接着使用4000端口的即可。

## 开始编写样式

在 `source`目录下新建 `css`文件夹作为整个博客站点的css目录，在css中新建 `——partial`文件夹作为局部模板的css目录，目录结构如下。

```
source
├──css
│  └──_partial
│     ├──footer.styl
│     └──header.styl
├──index.styl
├──layout.styl
└──post.styl
```

```css
# layout.styl
*
    margin 0
    padding 0

body
    width 100vw
    height 100vh

::-webkit-scrollbar
    display: none
@import "_partial/header"
@import "_partial/footer"
@import "index"
@import "post"
```

```css
# index.styl

home
    width 100vw
    min-height: 100vh
    display: flex
```

```css
# _partial/header.styl

header
    width 100vw
    height 64px
    position fixed
    display flex
    justify-content space-between
    align-items center
    background-color: #ffffff
    border-bottom: 1px solid #e2e2e3

    a
        text-decoration none
        color #444
        transition 0.5s

    a:hover
        color #5672CD

    div
        display flex
        align-items center
        margin-left 64px

        img
            width 24px
            height 24px
            margin-right 10px

        a
            font-weight bold
            font-size: 16px

    nav
        margin-right 64px

        ul
            display flex

            li
                list-style none
                margin 0px 5px
                font-size: 14px
headerBar
    width 100vw
    height 64px
    display: flex
```

```css
# _partial/footer.styl

footer
    width 100vw
    height: 113px
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    color: #3C3C43C7
    border-top: 1px solid #e2e2e3
    p
        margin: 2px 0px
        font-size: 14px
    a
        color: #3C3C43C7
```

```css
# post.styl

post
    width 100vw
    min-height 100vh
    display flex
    justify-content space-between

    postList
        width 20%
        height 100vh
        overflow scroll
        background-color #F6F6F7

        .list
            margin 20px 0px 0px 64px

            span
                font-weight bold
                font-size 14px

                a
                    color #3c3c43
                    text-decoration none

            section
                padding 4px 0px

                a
                    font-size 14px
                    color #3c3c43c7
                    text-decoration none
                    transition 0.3s

                a:hover
                    color #5672CD

    article
        width 60%
        height 100vh
        overflow scroll
        .post
            padding: 48px 64px 0px

    toc
        width 20%
        height 100vh
        overflow scroll
        border-left: 1px solid #e2e2e3
        div
            padding: 48px 6px
            p
                font-weight bold
                font-size 14px
                color #3c3c43
                margin-left: 10px
            ol
                list-style-type: none;
                li
                    margin-left: 10px
                    padding 4px 0px
                    a
                        font-size 14px
                        color #3c3c43c7
                        text-decoration none
                        transition 0.5s
                        .toc-number
                            display: none

                    a:hover
                        color #5672CD
```

文章的布局样式是默认样式，有需要请自己修改。

# 添加分页

由于我们是根据vitepress默认主题编写的主题，分页功能在这里没有什么作用，因此不做重点。

```html
# 新建 _partial/paginator.ejs

<% if (page.total > 1){ %>
    <nav class="page-nav">
    <%- paginator({
        prev_text: "« Prev",
        next_text: "Next »"
    }) %>
    </nav>
<% } %>
```

在有需要的地方添加下面的标签以引用分页功能

```html
<%- partial('_partial/paginator') %>
```

# 添加归档页

归档页，标签页，分类页本质上就是自定义页面，所以在创建这个页面之前需要使用 `hexo new page [页面名]`指令，例如创建归档页需要使用 `hexo new page archive`，并在 `index.md`中添加 `layout`键值。如果无法理解请参考添加自定义页面。

```html
# 新建 layout/archive.ejs

<section class="archive">
    <ul class="post-archive">
    <% page.posts.each(function (post) { %>
        <li class="post-item">
            <span class="post-date"><%= date(post.date, "YYYY-MM-DD") %></span>
            <a class="post-title" href="<%- url_for(post.path) %>"><%= post.title %></a>
        </li>
    <% }) %>
    </ul>
</section>
<%- partial('_partial/paginator') %>
```

```css
# 新建 css/archive.ejs

.archive {
    margin: 1em auto;
    padding: 30px 50px;
    background-color: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 0 2px #ddd;
    .post-archive {
        list-style: none;
        padding: 0;
        .post-item {
            margin: 5px 0;
            .post-date {
                display: inline-block;
                margin-right: 10px;
                color: #BABABA;
            }
            .post-title {
                color: #368CCB;
                text-decoration: none;
            }
        }
    }
}
```

归档页，标签页，分类页的css样式都是共用 `archive.styl`的css样式。

# 添加标签页

```html
# 新建 layout/tags.ejs

<section class="archive">
    <ul class="post-archive">
    <% site.tags.each(function (tag) { %>
        <span><%= tag.name %></span>
        <% tag.posts.forEach(function(post) { %>
        <li class="post-item">
            <span class="post-date"><%= date(post.date, "YYYY-MM-DD") %></span>
            <a class="post-title" href="<%- url_for(post.path) %>"><%= post.title %></a>
        </li>
        <% }) %>
    <% }) %>
    </ul>
</section>
```

# 添加分类页

```html
# 新建 layout/categories.ejs

<section class="archive">
    <ul class="post-archive">
    <% site.categories.each(function (category) { %>
        <span><%= category.name %></span>
        <% category.posts.forEach(function(post) { %>
        <li class="post-item">
            <span class="post-date"><%= date(post.date, "YYYY-MM-DD") %></span>
            <a class="post-title" href="<%- url_for(post.path) %>"><%= post.title %></a>
        </li>
        <% }) %>
    <% }) %>
    </ul>
</section>
```

至此，一个基础的hexo博客主题就写完了，本教程完整目录如下。

![4](/image/HEXO/4.webp)

> 最后再贴一遍代码链接:https://github.com/sooooooooooooooooootheby/hexo-theme-vitepress/tree/main/hexoDemo

# 总结

其实说白了，Hexo就是把那些 Markdown 文件，按照我们编写的对应布局模板，填上对应的数据生成 HTML 页面，然后在编译的过程中将JS/CSS等文件引入HTML，然后生成每个页面的对应HMTL静态文件。

而Hexo主题的作用就是决定每个布局模板长什么样。
