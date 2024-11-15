<template>
    <div>
        <div class="exerciseBlock" v-for="(item, category) in groupedByCategories" :key="item._path">
            <div class="category">{{ category }}</div>
            <div class="exerciseList" v-for="items in item" :key="items._path">
                <a :href="items._path">
                    <div class="title">{{ items.title }}</div>
                    <div class="time">
                        {{ handleTime(items.data) }}
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
const exercises = await queryContent("exercises")
    .where({ _path: { $contains: "/exercises/" } })
    .sort({ data: -1 })
    .only(["title", "data", "dataed", "categories", "_path"])
    .find();

const groupedByCategories = exercises.reduce((acc, exercise) => {
    // 获取当前 exercise 的 categories 字段
    let categories = exercise.categories;

    // 如果 categories 是一个字符串，拆分成数组并去除每个类别的空格
    if (typeof categories === "string") {
        categories = categories.split(",").map((c) => c.trim());
    }

    // 遍历每个类别
    categories.forEach((category) => {
        // 如果 acc 中没有该类别，初始化为空数组
        if (!acc[category]) {
            acc[category] = [];
        }
        // 将当前 exercise 加入到对应类别的数组中
        acc[category].push(exercise);
    });

    // 返回更新后的累加器对象
    return acc;
}, {});


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
@import url("~/assets/css/pages/exercise.scss");
</style>
