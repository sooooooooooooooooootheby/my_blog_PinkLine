<template>
    <div class="articleList">
        <div class="article" v-for="item in articles" :key="item._path">
            <a :href="item._path">
                <div class="head">
                    <div class="title">{{ item.title }}</div>
                    <div class="time">
                        {{ handleTime(item.data) }}
                    </div>
                </div>
                <div class="description">{{ item.description }}</div>
            </a>
        </div>
    </div>
</template>

<script setup>
useHead({
    title: "article",
});

const articles = await queryContent("articles")
    .where({ _path: { $contains: "/articles/" } })
    .sort({ data: -1 })
    .find();

const handleTime = (time) => {
    if (time === null || time === undefined) {
        return;
    }

    // 使用Date对象解析ISO 8601格式的时间戳
    const date = new Date(time);

    // 解析时间
    const months = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0"); // 确保两位数
    const minutes = date.getMinutes().toString().padStart(2, "0"); // 确保两位数
    const seconds = date.getSeconds().toString().padStart(2, "0"); // 确保两位数

    // 将月份转换为缩写格式
    const monthArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    const month = monthArray[months];

    // 返回格式化的时间字符串
    return `${year} ${month}-${day}`;
};
</script>

<style lang="scss" scoped>
@import url("~/assets/css/pages/article.scss");
</style>
