<template>
    <div class="articleContent">
        <div class="info">
            <ContentQuery :path="removeLocalePrefix($route.path)" find="one" v-slot="{ data }">
                <p class="articleTitle">{{ data.title }}</p>
                <p class="articleTime">{{ handleTime(data.data) }}</p>
                <div class="prose">
                    <ContentRenderer :value="data" />
                </div>
            </ContentQuery>
        </div>
    </div>
</template>

<script setup>
// 删除国际化路径
const removeLocalePrefix = (path) => {
    const locales = ["zh", "en"]; // 你的所有支持的语言
    const regex = new RegExp(`^/(${locales.join("|")})/`);
    return path.replace(regex, "/");
};

// 格式化时间
const handleTime = (time) => {
    if (time === null) {
        this.updateTime = false;
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
.articleTitle {
    font-size: 2.5rem;
}
.articleTime {
    opacity: 0.6;
}
.prose {
    width: 100%;
    max-width: 100%;
    font-size: 17px;
}
</style>
