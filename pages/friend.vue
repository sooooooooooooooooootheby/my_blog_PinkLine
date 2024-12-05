<template>
    <div class="friend">
        <div class="title">交换友链</div>
        <div class="content">
            <ul>
                <li>申请友链前请务必确保贵站有我站的友链, 若审批通过后移除本站链接, 本站也将移除友链.</li>
                <li>确保您的网站不存在政治敏感问题及违法内容。没有过多的广告、无恶意软件、脚本。且转载文章须注明出处。</li>
                <li>暂时不同意商业及非个人的网站的友链申请</li>
                <li>本站以技术为主, 所以非技术博客可能不会考虑通过</li>
            </ul>
            <p>
                如果想要交换友链, 请修改
                <a href="https://github.com/sooooooooooooooooootheby/my_blog_nuxt/blob/main/app.config.ts" target="_blank">
                    https://github.com/sooooooooooooooooootheby/my_blog_nuxt/blob/main/app.config.ts
                </a>
                的 friend 部分, 发起PR并注明来意.
            </p>
            <p>格式如下:</p>
            <ul>
                <li>本博客和国内大部分博客友链样式不同, 使用的是矩形按钮(最小分辨率为176 x 62px), 当然你也可以直接在 button 中直接输入你的正方形头像链接, 默认会居中.(你可以敲个注释, 让我帮忙给你做一个矩形按钮, 只要我有空都会帮的)</li>
            </ul>
            <pre>
{
    name: "你的名字",
    url: "你的链接",
    button: "你的按钮图片"
}</pre
            >
            <p>我的信息:</p>
            <pre>
{
    name: "sooooooooooooooooootheby", # or s22y
    url: "http://blog.sooooooooooooooooootheby.top/",
    description: "去码头整点薯条",
    button: "https://blog.sooooooooooooooooootheby.top/friend/Sooooooooooooooooootheby.webp",
    avatar: "https://blog.sooooooooooooooooootheby.top/logo_small.webp"
}</pre
            >
        </div>
    </div>
</template>

<style lang="scss" scoped>
.friend {
    .title {
        margin-top: 32px;
        font-size: 2rem;
        font-weight: bold;
    }
    ul {
        margin-top: 24px;
        margin-left: 26px;
        li {
            margin-top: 12px;
        }
    }
    p {
        margin-top: 24px;
        overflow-wrap: break-word;
    }
    pre {
        margin-top: 24px;
        padding: 24px;
        background-color: #171f55;
        border-radius: 12px;
        overflow: scroll;
        overflow-y: hidden;

        code {
            margin: 0;
            background-color: transparent;
        }
    }
    pre::-webkit-scrollbar {
        height: 0px;
    }
}
</style>
