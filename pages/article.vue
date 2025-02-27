<template>
    <div class="articleList">
        <intro :content="$t('article.intro')" />
        <div class="year" v-for="year in sortedYears" :key="year">
            <div class="article" v-for="item in articleGrouping[year]" :key="item._path">
                <NuxtLink :to="item._path">
                    <p class="title">{{ item.title }}</p>
                </NuxtLink>
                <p class="time">
                    {{ handleTime(item.data) }}
                </p>
                <p class="description">{{ item.description }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
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
    const monthArray = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const month = monthArray[months];

    // 返回格式化的时间字符串
    return `${month} ${day}, ${year}`;
};
</script>

<style lang="scss" scoped>
.articleList {
    .year {
        margin-bottom: 64px;
    }
    .article {
        margin-bottom: 24px;

        .title {
            font-size: 1.2rem;
            position: relative;
            transition: 0.2s;
        }
        .title:hover {
            color: #d0785b;
        }
        .title:hover::after {
            content: "Read more";
            color: #d0785b;
            position: absolute;
            right: 0;
        }
        .time,
        .description {
            opacity: 0.6;
        }
    }
}
</style>
