<template>
    <div class="friend">
        <div class="mark">
            <h1>来自互联网的朋友</h1>
            <ul class="list">
                <li class="item" v-for="item in appConfig.friend" :key="item.name">
                    <a :href="item.url" target="_block">
                        <img :src="item.button" alt="button" />
                    </a>
                </li>
            </ul>
            <ContentRenderer :value="friend" />
        </div>
        <clientOnly>
            <waline />
        </clientOnly>
    </div>
</template>

<script lang="ts" setup>
useSeoMeta({
    title: "S22y 的朋友",
    ogTitle: "S22y 的朋友",
});

const route = useRoute();
const appConfig = useAppConfig();

const { data: friend } = await useAsyncData(route.path, () => {
    return queryCollection("content").path("/page/friend").first();
});
</script>

<style lang="scss" scoped>
.friend {
    .list {
        margin-bottom: 12px;
        display: flex;
        flex-wrap: wrap;

        .item {
            width: 88px;
            height: 31px;
            margin-right: 12px;
            list-style: none;
            overflow: hidden;
            display: flex;
            align-items: center;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
}
</style>
