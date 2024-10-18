<template>
	<div :class="{ appHeader: true, background: !isTop }">
		<div class="content">
			<img src="/logo_small.webp" alt="logo" class="logo" />
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
// 控制页面滚动时，header的背景色
const isTop = ref(true);
const handleScroll = () => {
	if (window.scrollY > 0) {
		isTop.value = false;
	} else {
		isTop.value = true;
	}
};
onMounted(() => {
	window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
	window.removeEventListener("scroll", handleScroll);
});

// 判断是否处于文章页面
const route = useRoute();
const isArticle = computed(() => route.path.includes("/articles/"));

// 在文章页时显示文章信息
const config = useRuntimeConfig();
</script>

<style lang="scss" scoped>
@import url("~/assets/css/components/appHeader.scss");
</style>
