<template>
	<div class="articleContent">
		<ContentDoc />
	</div>
</template>

<script setup></script>

<style lang="scss" scoped>
.articleContent {
	width: 100%;
	min-width: 100px;
	max-width: 900px;
	margin: 0 auto;
	padding-top: 32px;
}

@media (max-width: 900px) {
	.articleContent {
		width: 100%;
		min-width: 10vw;
	}
}
</style>
