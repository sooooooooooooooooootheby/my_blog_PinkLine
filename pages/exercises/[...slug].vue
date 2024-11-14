<template>
	<div class="articleContent">
		<div class="info">
			<ContentQuery :path="$route.path" find="one" v-slot="{ data }">
				<p class="articleTitle">{{ data.title }}</p>
				<p class="articleTime">{{ handleTime(data.data) }}</p>
			</ContentQuery>
		</div>
		<ContentDoc />
	</div>
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
	width: 100%;
	min-width: 100px;
	max-width: 900px;
	margin: 0 auto;
	padding-top: 32px;
	.info {
		display: none;
	}
}

@media (max-width: 900px) {
	.articleContent {
		width: 100%;
		min-width: 10vw;
		.info {
			display: block;
			margin-bottom: 24px;
			p {
				margin: 0;
			}
			.articleTitle {
				font-size: 1.2rem;
			}
			.articleTime {
				font-size: 0.9rem;
			}
		}
	}
}
</style>
