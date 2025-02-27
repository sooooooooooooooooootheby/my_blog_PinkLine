<template>
    <div class="project">
        <div class="content project">
            <h1 class="title">项目 🍕</h1>
            <ul>
                <li v-for="(item, index) in appConfig.index.project" :key="index">
                    <a :href="item.url" target="_blank"> {{ item.title }} </a>
                    <p>{{ item.description }}</p>
                </li>
            </ul>
        </div>
        <div class="content api">
            <h1 class="title">Api 🥟</h1>
            <ul>
                <li v-for="(item, index) in appConfig.index.api" :key="index">
                    <a :href="item.url" target="_blank"> {{ item.title }} </a>
                    <p>{{ item.description }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
const appConfig = useAppConfig();
</script>

<style lang="scss" scoped>
.title {
    font-size: 2rem;
    color: #d0785b;
    margin-bottom: 8px;
}

ul {
    li {
        margin-bottom: 12px;

        a {
            font-family: sc;
            font-size: 18px;
            font-weight: bold;
        }
        p {
            opacity: 0.8;
        }
    }
}
</style>
