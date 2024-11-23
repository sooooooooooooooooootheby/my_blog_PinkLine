<template>
	<div class="appHeader">
		<div class="content">
			<div class="articleInfo" v-if="isArticle || isExercise">
				<ContentQuery :path="$route.path" find="one" v-slot="{ data }">
					<p class="articleTitle">{{ data.title }}</p>
					<p class="articleTime">{{ handleTime(data.data) }}</p>
				</ContentQuery>
			</div>
			<nav class="menu">
				<ul class="mainmenu">
					<li class="item">
						<NuxtLink to="/">
							<Icon class="icon" name="icon-park-solid:cup" />
							<span class="text">Home</span>
						</NuxtLink>
					</li>
					<li class="item spot">·</li>
					<li class="item">
						<NuxtLink to="/article">
							<Icon class="icon" name="icon-park-solid:web-page" />
							<span class="text">article</span>
						</NuxtLink>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</template>

<script setup>
// 判断是否处于 articles exercises 页面
const route = useRoute();
const isArticle = computed(() => route.path.includes("/articles/"));
const isExercise = computed(() => route.path.includes("/exercises/"));

// 在文章页时显示文章信息
const config = useRuntimeConfig();

// 格式化时间
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
@import url("~/assets/css/components/appHeader.scss");
</style>
