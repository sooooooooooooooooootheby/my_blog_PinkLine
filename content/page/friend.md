## 友链交换申请须知

-   在申请友情链接之前, 请确保贵站已添加了我的链接. 如果在交换之后移除了我的链接, 我将遗憾地采取相同的措施.

-   请确保你的网站不包含政治敏感内容、非法材料、过多广告、恶意软件或脚本.此外, 任何转载的文章必须注明原始来源.

-   目前, 不接受商业或非个人网站的友情链接请求.

-   由于本博客主要关注技术领域, 所以非技术类博客可能不会被批准.

## 如何交换?

如果你希望交换链接, 请修改[配置文件](https://github.com/sooooooooooooooooootheby/my_blog_nuxt/blob/main/app.config.ts)的友链部分, 提交一个 PR, 并请说明你的目的.

如果你觉得 PR 麻烦, 也可以直接在评论区留言.

我推荐使用 PR, 当然你也可以使用邮箱或者评论区, 只是 PR 比较省事.

## 关于格式

本站的友链图片使用按钮的样式, 所以我比较推荐你制作一个 88\*31 大小的矩形按钮上传, 如果你觉得很麻烦, 也可以写个注释表示你想要矩形按钮, 我可以帮你制作. 当然这并不代表你不能使用正常的圆形或者方形图片.

```typescript
{
    name: "your name",
    url: "your link",
    button: "your button image"
}
```

```typescript
// my info

{
    name: "sooooooooooooooooootheby", # or s22y
    url: "http://blog.s22y.moe/",
    description: "Go to the pier and get some fries",
    button: "https://blog.s22y.moe/friend/Sooooooooooooooooootheby.webp",
    avatar: "https://blog.s22y.moe/logo_small.webp"
}
```