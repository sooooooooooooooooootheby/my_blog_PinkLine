<template>
	<div>
		<!-- <h1 class="text-3xl font-bold dark:text-white">All post</h1> -->
		<div class="mt-2 mb-10">
			<p class="text-3xl font-bold text-gray-800 dark:text-gray-300">已经写了 {{ list?.length }} 篇文章了, 太棒了.</p>
		</div>
		<ul>
			<li v-for="item in list" class="mb-8">
				<NuxtLink :to="item.path">
					<h2 class="text-xl font-bold dark:text-white">{{ item.title }}</h2>
					<p class="my-2 text-sm text-gray-700 dark:text-gray-300">{{ item.description }}</p>
				</NuxtLink>
				<div class="flex text-sm text-gray-600 dark:text-gray-400">
					<div class="flex items-center">
						<span>{{ handleTime(item.date) }}</span>
						<Icon name="mynaui:edit" v-if="item.update" />
					</div>
					<div class="mx-1">·</div>
					<NuxtLink :to="`/sort?sort=${item.sort}`">
						<span>#{{ item.sort }}</span>
					</NuxtLink>
				</div>
			</li>
		</ul>
	</div>
</template>

<script lang="ts" setup>
const appConfig = useAppConfig();

useSeoMeta({
	title: appConfig.info.author + " 的文章",
	ogTitle: appConfig.info.author + " 的文章",
});

// 这是文章列表的部分
const { data: list } = await useAsyncData("list", async () => {
	const Original = await queryCollection("articles").select("title", "description", "date", "update", "path", "sort").all();
	const processed = Original.map((item) => ({
		...item,
		date: item.update || item.date,
	})).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	return processed;
});

// 这是查询的部分
const searchQuery = ref("");

const { data: sections } = await useAsyncData("search-sections", () => {
	return queryCollectionSearchSections("articles");
});

interface Section {
	id: string;
	title: string;
	content: string;
}
</script>
