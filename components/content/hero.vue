<template>
	<div class="relative h-64 w-full bg-red-50 max-md:h-42">
		<img src="/Canvas-Ruom.webp" alt="cover" class="rounded-t-lg m-0! h-full w-full object-cover" />
		<img src="/logo.webp" alt="logo" class="absolute -bottom-[64px] left-1/2 m-0! size-32 -translate-x-1/2 rounded-full border-6 border-white dark:border-black" />
	</div>
	<div class="item-center mt-20 flex flex-col [&>*]:text-center">
		<div class="text-3xl [&>*]:m-0">
			<slot name="name" />
		</div>
		<div class="text-xl [&>*]:m-0">
			<slot name="subname" />
		</div>
		<div class="text-md opacity-80 [&>*]:m-0">
			<slot name="info" />
		</div>
	</div>
	<div class="my-4 flex items-center justify-center">
		<span class="inline-flex items-center rounded-full border-1 border-gray-600 px-3 py-1 text-xs dark:border-gray-200 mr-2">
			<Icon name="mynaui:location-solid" class="mr-1" />
			<slot name="location" mdc-unwrap="p" />
		</span>
		<span class="inline-flex items-center rounded-full border-1 border-gray-600 px-3 py-1 text-xs dark:border-gray-200">
			<Icon name="mynaui:accessibility-solid" class="mr-1" />
			<slot name="mbti" mdc-unwrap="p" />
		</span>
		<ul class="m-0! flex p-0!">
			<li v-for="item in contacts" class="list-none">
				<a :href="item.a" target="_blank" class="ml-2 flex items-center justify-center text-gray-600 dark:text-gray-200">
					<Icon :name="item.icon" class="text-2xl" />
				</a>
			</li>
		</ul>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps<{
	icon: string[];
	a: string[];
}>();

interface contact {
	icon: string;
	a: string;
}

const contacts = ref<contact[]>([]);

onMounted(() => {
	contacts.value = props.icon.map((item, index) => {
		return {
			icon: item,
			a: props.a[index],
		};
	});
});
</script>
