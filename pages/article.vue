<template>
    <div class="articleList">
        <div class="year" v-for="year in sortedYears" :key="year">
            <span>{{ year }}</span>
            <div class="article" v-for="item in articleGrouping[year]" :key="item._path">
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
    </div>
</template>

<script setup>
useHead({
    title: "article",
});

const articles = await queryContent("articles")
    .where({ _path: { $contains: "/articles/" } })
    .sort({ data: -1 })
    .only(["title", "data", "dataed", "description", "_path"])
    .find();

const articleGrouping = articles.reduce((acc, item) => {
    // 获取文章的年份
    const date = new Date(item.data);
    const year = date.getFullYear();

    // 如果该年份还没有在 acc 对象中，初始化为空数组
    if (!acc[year]) {
        acc[year] = [];
    }

    // 将当前文章添加到该年份的文章数组中
    acc[year].push(item);

    return acc;
}, {});

const sortedYears = Object.keys(articleGrouping).sort((a, b) => b - a);

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
    return `${month}-${day}`;
};
</script>

<style lang="scss" scoped>
@import url("~/assets/css/pages/article.scss");
</style>
