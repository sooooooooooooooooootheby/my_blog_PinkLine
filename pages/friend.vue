<template>
    <div class="friend">
        <div class="title">交换友链</div>
        <div class="content">
            <p>
                如果想要交换友链, 请修改
                <a href="https://github.com/sooooooooooooooooootheby/my_blog_nuxt/blob/main/app.config.ts" target="_blank">
                    https://github.com/sooooooooooooooooootheby/my_blog_nuxt/blob/main/app.config.ts
                </a>
                的 friend 部分, 发起PR并注明来意.
            </p>
            <p>本站交换友链仅限于技术博客, 如果有见证内容就别交换了(</p>
            <p>友链为按钮样式, 如果你不想自己做直接把头像链接填进 button 里面我帮你做就好了.</p>
            <p>格式如下:</p>
            <pre>
{
    name: "你的名字",
    url: "你的链接",
    button: "你的按钮图片"
}</pre>
            <p>我的信息:</p>
            <pre>
{
    name: "sooooooooooooooooootheby", # or s22y
    url: "http://blog.sooooooooooooooooootheby.top/",
    description: "去码头整点薯条",
    button: "https://blog.sooooooooooooooooootheby.top/friend/Sooooooooooooooooootheby.webp",
    avatar: "https://blog.sooooooooooooooooootheby.top/logo_small.webp"
}</pre>
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
