<template>
    <div class="home">
        <div class="one">
            <div class="greet">
                <p class="greet_title1">Hi.👋</p>
                <p class="greet_title2">I'm</p>
                <p class="greet_title3"><Icon class="icon" name="icon-park-solid:connect-address-two" />现居 中国南宁.</p>
                <p class="greet_title3"><Icon class="icon" name="icon-park-solid:blossom" />梦想是躺平什么都不用做.</p>
            </div>
            <div class="introduce">
                <p class="introduce_1">大学在读, 专业是计算机网络技术.</p>
                <p class="introduce_2">
                    目前在备战专升本考试, 业余时间会做一些小玩意, 可以去我的<a
                        href="https://github.com/sooooooooooooooooootheby?tab=repositories"
                        >Github</a
                    >查看.
                </p>
            </div>
            <img :src="randomImage()" alt="headerBar" class="headerBar" />
            <div class="content skill">
                <span class="title"> 技术 </span>
                <ul>
                    <li v-for="(item, index) in appConfig.index.skill" :key="index">{{ item }}</li>
                </ul>
            </div>
            <div class="content project">
                <span class="title"> 项目 </span>
                <ul>
                    <li v-for="(item, index) in appConfig.index.project" :key="index">
                        <a :href="item.url" target="_blank"> {{ item.title }} </a>
                        <p>{{ item.description }}</p>
                    </li>
                </ul>
            </div>
            <div class="content api">
                <span class="title"> Api </span>
                <ul>
                    <li v-for="(item, index) in appConfig.index.api" :key="index">
                        <a :href="item.url" target="_blank"> {{ item.title }} </a>
                        <p>{{ item.description }}</p>
                    </li>
                </ul>
            </div>
            <div class="content friend" id="friend">
                <span class="title"><NuxtLink to="/friend"> 朋友们 </NuxtLink></span>
                <ul>
                    <li v-for="(item, index) in appConfig.index.friend" :key="index">
                        <a :href="item.url" target="_blank">
                            <img class="avatar" :src="item.button" alt="avatar" />
                        </a>
                    </li>
                </ul>
            </div>
            <div class="content contact">
                <span class="title"> 联系 </span>
                <ul>
                    <li>
                        <p>
                            Github:
                            <a href="https://github.com/sooooooooooooooooootheby" target="_blank"
                                >https://github.com/sooooooooooooooooootheby</a
                            >
                        </p>
                    </li>
                    <li>
                        <p>Email: sooooooooooooooooootheby@gmail.com</p>
                    </li>
                    <li>
                        <p>Discord: sooooooooooooooooootheby</p>
                    </li>
                </ul>
            </div>
            <div class="content" v-show="checkDomain()">
                <img src="https://moco.yukata.dev/get/@sooooooooooooooooootheby" alt="sooooooooooooooooootheby" />
            </div>
        </div>
    </div>
</template>

<script setup>
const appConfig = useAppConfig();
useHead({
    title: "welcome to my blog",
});

const randomImage = () => {
    const num = Math.floor(Math.random() * (8 - 1) + 1);
    return `/carousel/${num}.webp`;
};

const checkDomain = () => {
    if (process.client) {
        const domain = window.location.hostname;
        const isLocalhost = domain === "localhost";
        const is192168 = domain.startsWith("192.168.");

        if (isLocalhost || is192168) {
            return false;
        }
        return true;
    }

    // 如果在服务端运行，可以根据需要返回默认值
    return false;
};
</script>

<style lang="scss" scoped>
@import url("~/assets/css/pages/index.scss");
</style>
