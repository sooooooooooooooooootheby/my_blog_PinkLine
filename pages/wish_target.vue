<template>
	<div class="wish_target">
		<div class="target">
			<span>Target</span>
			<ul>
				<li v-for="(item, index) in target" :key="index">
					<p>On {{ item.time }} - {{ item.title }}</p>
				</li>
			</ul>
		</div>
		<div class="wish">
			<span>Wish</span>
			<ul>
				<li v-for="(item, index) in wish" :key="index">
					<p>{{ item.title }} - need {{ item.money }}</p>
				</li>
			</ul>
		</div>
		<div class="sponsor">
			<span>Sponsor</span>
			<p style="margin-top: 12px">If my project or article helps you, you're welcome to buy me a coke</p>
			<p>Payment term: not yet (I'm soooooooooooo lazy)</p>
		</div>
	</div>
</template>

<script setup>
const target = ref([
	{
		title: "通过英语B级能力测验",
		time: "Dec15 2024",
	},
	{
		title: "通过专升本考试",
		time: "May 2025",
	},
]);

const wish = ref([
	{
		title: "A macbook air",
		money: "6k",
	},
	{
		title: "A camera",
		money: "4k",
	},
]);
</script>

<style lang="scss" scoped>
@import url("~/assets/css/pages/wish_target.scss");
</style>
