<template>
	<div>
		<h1 class="mb-10 text-3xl font-bold dark:text-white">日常记录</h1>
		<ul>
			<li v-for="item in note" class="mb-8 hasemoji prose max-w-full!">
				<ContentRenderer :value="item" class="dark:text-white" />
				<p class="mt-1 text-xs text-gray-600 dark:text-gray-400">{{ handleTime(item.date) }}</p>
			</li>
		</ul>
	</div>
</template>

<script lang="ts" setup>
const appConfig = useAppConfig();

useSeoMeta({
	title: `随记 | ${appConfig.info.title}`,
	ogTitle: `随记 | ${appConfig.info.title}`,
});

const { data: note } = await (async () => {
	return await useAsyncData("note", () => {
		return queryCollection("notes").select("date", "body").order("date", "DESC").all();
	});
})();
</script>
