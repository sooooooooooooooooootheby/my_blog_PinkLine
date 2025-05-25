<template>
	<div>
		<template v-if="chat">
			<div class="text-gray-600 dark:text-gray-400">
				<NuxtLink to="/ai">
					<Icon name="akar-icons:arrow-back" class="mr-1 text-xs" />
					<span class="text-sm">回到收藏列表</span>
				</NuxtLink>
			</div>
			<div class="hasemoji prose prose-xs sm:prose-sm dark:prose-invert max-w-full!">
				<ContentRenderer :value="chat" />
			</div>
		</template>
		<template v-else>
			<div class="dark:text-white">
				<h1 class="mb-2 text-center text-xl font-bold">哦😯, 看起来我们没有找到你需要的收藏.</h1>
				<NuxtLink to="/ai">
					<p class="text-center underline">回到收藏列表</p>
				</NuxtLink>
			</div>
		</template>
	</div>
</template>

<script lang="ts" setup>
const appConfig = useAppConfig();
const route = useRoute();

const { data: chat } = await useAsyncData(route.path, () => {
	return queryCollection("ai").path(route.path).select("title", "ai", "body").first();
});
</script>
