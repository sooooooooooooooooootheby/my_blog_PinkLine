<template>
	<div>
		<h1 class="text-3xl font-bold dark:text-white">我该怎么做?!</h1>
		<div class="my-2 mb-10 text-sm text-gray-600 dark:text-gray-400">
			<p>
				不知道你有没有这种烦恼, 隔三差五或者经常有些反复的问题要解决, 但是解决步骤记不下来, 每次都要找ai, 肥肠麻烦,
				我是有这种烦恼.<del>例如三天两头就要问问ai怎么居中div</del>.
			</p>
			<p>所以我创建了这个页面, 把隔三差五就会用到的, 但是每次我都记不住要问ai的问题记在这里, 这样我要查就不用再去问ai了.</p>
		</div>
		<ol>
			<li v-for="item in list" class="mb-8 list-decimal">
				<p>
					<NuxtLink :to="item.path" class="text-xl font-bold">{{ item.title }}</NuxtLink>
				</p>
				<span class="rounded-lg bg-pinkline-50 px-2 py-1 text-xs text-pinkline-500">{{ item.ai }}</span>
			</li>
		</ol>
	</div>
</template>

<script lang="ts" setup>
const appConfig = useAppConfig();

useSeoMeta({
	title: `我该怎么做?! | ${appConfig.info.title}`,
	ogTitle: `我该怎么做?! | ${appConfig.info.title}`,
});

// 这是文章列表的部分
const { data: list } = await useAsyncData("ailist", async () => {
	return await queryCollection("ai").select("title", "ai", "path").all();
});
</script>
