<template>
	<ul class="p-0!">
		<li v-for="item in list" class="flex items-center rounded-lg border-1 border-gray-300 p-3! dark:border-gray-700">
			<div class="flex-1">
				<p class="m-0!">{{ item.name }}</p>
				<p class="m-0! text-xs text-gray-500">{{ item.info }}</p>
			</div>
			<a :href="item.url" class="flex items-center" target="_blank">
                <Icon class="text-lg duration-300 hover:rotate-45" name="mynaui:arrow-up-right" />
            </a>
		</li>
	</ul>
</template>

<script lang="ts" setup>
const props = defineProps<{
	name: string[];
	url: string[];
	info: string[];
}>();

interface list {
	name: string;
	url: string;
	info: string;
}

const list = ref<list[]>([]);

onMounted(() => {
	list.value = props.name.map((item, index) => {
		return {
			name: item,
			url: props.url[index],
			info: props.info[index],
		};
	});
});
</script>
