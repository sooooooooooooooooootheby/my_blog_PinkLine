<template>
    <div class="friend">
        <intro :content="$t('friend.intro')" />
        <ul class="avatar">
            <li v-for="(item, index) in appConfig.index.friend" :key="index">
                <a :href="item.url" target="_blank">
                    <img class="avatar" :src="item.button" alt="avatar" />
                </a>
            </li>
        </ul>
        <div class="add">
            <h1>{{ $t("friend.title1") }}</h1>
            <ul>
                <li>
                    <p>{{ $t("friend.list.1") }}</p>
                </li>
                <li>
                    <p>{{ $t("friend.list.2") }}</p>
                </li>
                <li>
                    <p>{{ $t("friend.list.3") }}</p>
                </li>
                <li>
                    <p>{{ $t("friend.list.4") }}</p>
                </li>
            </ul>
            <h1>{{ $t("friend.title2") }}</h1>
            <p>
                {{ $t("friend.content1") }}
            </p>
            <p>{{ $t("friend.content2") }}</p>
            <br />
            <h1>{{ $t("friend.title3") }}</h1>
            <p>
                {{ $t("friend.content3") }}
            </p>
            <div class="mockup-code">
                <pre data-prefix="1"><code class="annotation"># Application form</code></pre>
                <pre data-prefix="2"><code></code></pre>
                <pre data-prefix="3"><code><span class="brace">{</span></code></pre>
                <pre
                    data-prefix="4"
                ><code>    <span class="name">name</span>: "<span class="value">your name</span>",</code></pre>
                <pre
                    data-prefix="5"
                ><code>    <span class="name">url</span>: "<span class="value">your link</span>",</code></pre>
                <pre
                    data-prefix="6"
                ><code>    <span class="name">button</span>: "<span class="value">your button image</span>"</code></pre>
                <pre data-prefix="7"><code><span class="brace">}</span></code></pre>
            </div>
            <div class="mockup-code">
                <pre data-prefix="3"><code><span class="brace">{</span></code></pre>
                <pre
                    data-prefix="4"
                ><code>    <span class="name">name</span>: "<span class="value">sooooooooooooooooootheby</span>", <span class="annotation"># or s22y</span></code></pre>
                <pre
                    data-prefix="5"
                ><code>    <span class="name">url</span>: "<span class="value">http://blog.sooooooooooooooooootheby.top/</span>",</code></pre>
                <pre
                    data-prefix="6"
                ><code>    <span class="name">description</span>: "<span class="value">Go to the pier and get some fries</span>",</code></pre>
                <pre
                    data-prefix="6"
                ><code>    <span class="name">button</span>: "<span class="value">https://blog.sooooooooooooooooootheby.top/friend/Sooooooooooooooooootheby.webp</span>",</code></pre>
                <pre
                    data-prefix="6"
                ><code>    <span class="name">avatar</span>: "<span class="value">https://blog.sooooooooooooooooootheby.top/logo_small.webp</span>"</code></pre>
                <pre data-prefix="7"><code><span class="brace">}</span></code></pre>
            </div>
        </div>
    </div>
</template>

<script setup>
const appConfig = useAppConfig();
</script>

<style lang="scss" scoped>
.avatar {
    display: flex;
    flex-wrap: wrap;

    li {
        width: 88px;
        height: 31px;
        margin-left: 0;
        margin-right: 12px;
        margin-bottom: 12px;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            cursor: pointer;
        }
    }
}
.add {
    margin-top: 64px;

    h1 {
        margin-top: 24px;
        font-size: 1.8rem;
    }
    ul {
        margin-left: 12px;

        li {
            margin: 12px 0;
            list-style-type: none;
            position: relative;
            padding-left: 20px;

            &::before {
                content: "•";
                position: absolute;
                left: 0;
            }
        }
    }
    a {
        text-decoration: underline;
    }
    .mockup-code {
        margin: 24px 0;

        .annotation {
            color: #6e717f;
        }
        .brace {
            color: #ff5372;
        }
        .name {
            color: #80cbc4;
        }
        .value {
            color: #6ad7ff;
        }
    }
}
</style>
