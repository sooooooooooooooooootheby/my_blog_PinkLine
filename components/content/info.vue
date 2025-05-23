<template>
	<div class="flex flex-col rounded-lg border border-gray-300 bg-gray-50 p-2 dark:bg-[#000000] dark:border-gray-700">
		<div
			v-for="slotName in slotNames"
			:key="slotName"
			class="my-2 flex rounded-md border border-gray-300 bg-white p-2 px-4 text-gray-800 first:mt-0 last:mb-0 dark:bg-[#09090B] dark:text-gray-200 dark:border-gray-700"
		>
			<slot :name="slotName" mdc-unwrap="p" />
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			slotNames: ["name", "url", "description", "button", "avatar"],
		};
	},
};
</script>

<style scoped>
/* 确保插槽内容继承正确的文本颜色 */
.card-slot ::slotted(*) {
	color: inherit;
}
</style>
