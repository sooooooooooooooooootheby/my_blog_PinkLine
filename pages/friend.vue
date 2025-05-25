<template>
	<div>
		<div class="mb-6">
			<h1 class="mb-10 text-3xl font-bold dark:text-white">来自互联网的朋友</h1>
			<ul v-if="appConfig.friend.length" class="w-full mb-8 flex flex-wrap">
				<li v-for="item in appConfig.friend" class="m-2">
					<a :href="item.url" target="_block">
						<div class="w-[88px] h-[31px] overflow-hidden flex items-center">
							<img :src="item.button" :alt="item.name" />
						</div>
					</a>
				</li>
			</ul>
			<p v-else>博主还没有友链哦, 欢迎交换友链.</p>
			<div class="prose prose-sm sm:prose-base dark:prose-invert max-w-full">
				<ContentRenderer v-if="friend" :value="friend" />
			</div>
		</div>
		<clientOnly v-if="appConfig.comment.isComment">
			<waline />
		</clientOnly>
	</div>
</template>

<script lang="ts" setup>
const appConfig = useAppConfig();
const route = useRoute();

useSeoMeta({
	title: `朋友们 | ${appConfig.info.title}`,
	ogTitle: `朋友们 | ${appConfig.info.title}`,
});

const { data: friend } = await useAsyncData(route.path, () => {
	return queryCollection("content").path("/page/friend").first();
});
</script>
