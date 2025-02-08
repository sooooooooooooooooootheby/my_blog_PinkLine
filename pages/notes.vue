<template>
    <main class="articleContent">
        <ContentList path="/notes" :sort="[['data.date', 'desc']]" v-slot="{ list }">
            <div v-for="article in list" :key="article._path" class="article">
                <ContentRendererMarkdown :value="article" />
                <span class="time">{{ handleTime(article.data) }}</span>
            </div>
        </ContentList>
    </main>
</template>

<script setup>
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
    const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthArray[months];

    // 返回格式化的时间字符串
    return `${month} ${day}, ${year}`;
};
</script>

<style lang="scss" scoped>
.articleContent {
    margin-top: 64px;
}
.article {
    margin-bottom: 32px;
    padding-bottom: 12px;
    border-bottom: 1px dashed #ffffff7a;
}
.time {
    font-size: 0.9rem;
}
</style>
