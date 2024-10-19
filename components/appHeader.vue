<template>
	<div class="appHeader">
		<div class="content">
			<div class="articleInfo" v-if="isArticle">
				<ContentQuery :path="$route.path" find="one" v-slot="{ data }">
					<p class="articleTitle">{{ data.title }}</p>
					<p class="articleTime">{{ data.time }}</p>
				</ContentQuery>
			</div>
			<nav class="menu">
				<ul class="mainmenu">
					<li class="item">
						<NuxtLink to="/"> about </NuxtLink>
					</li>
					<li class="item">
						<NuxtLink to="/article"> article </NuxtLink>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</template>

<script setup>
// 判断是否处于文章页面
const route = useRoute();
const isArticle = computed(() => route.path.includes("/articles/"));

// 在文章页时显示文章信息
const config = useRuntimeConfig();
</script>

<style lang="scss" scoped>
@import url("~/assets/css/components/appHeader.scss");
</style>
