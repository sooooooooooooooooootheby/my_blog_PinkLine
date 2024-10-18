<template>
	<div class="home">
		<div class="one">
			<div class="greet">
				<p class="greet_title1">Hi.👋</p>
				<p class="greet_title2">I'm</p>
				<p class="greet_title3"><Icon class="icon" name="icon-park-solid:connect-address-two" />Currently live in Nanning, China.</p>
				<p class="greet_title3"><Icon class="icon" name="icon-park-solid:blossom" />dream is to lie down and do nothin</p>
			</div>
			<div class="introduce">
				<p class="introduce_1">I'm a big student, major is network technology.</p>
				<p class="introduce_2">I'm studying for exams. Occasionally make some interesting tools.</p>
			</div>
			<div class="content skill">
				<span class="title"> Skill </span>
				<ul>
					<li v-for="(item, index) in skill" :key="index">{{ item }}</li>
				</ul>
			</div>
			<div class="content project">
				<span class="title"> Project </span>
				<ul>
					<li v-for="(item, index) in project" :key="index">
						<a :href="item.url" target="_blank"> {{ item.title }}: </a>
						<p>{{ item.description }}</p>
					</li>
				</ul>
			</div>
			<div class="content friend">
				<span class="title"> Friends </span>
				<ul>
					<li v-for="(item, index) in friend" :key="index">
						<a :href="item.url" target="_blank">
							<img class="avatar" :src="`/friend/${item.name}.webp`" alt="avatar" />
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup>
const skill = ref(["JavaScript", "Vue.js", "Sass", "Node.js", "C", "Kotlin", "MySql"]);
const project = ref([
	{
		title: "NetEase cloud music lossless analysis",
		description: "A website that allows you to download songs from NetEase Cloud Music for free.",
		url: "https://neteasepage.sooooooooooooooooootheby.top/",
	},
]);
const friend = ref([
	{
		name: "Sooooooooooooooooootheby",
		url: "#",
	},
	{
		name: "lassksy",
		url: "https://www.woodude.top/",
	},
	{
		name: "BLxcwg666",
		url: "https://blog.nekorua.com/",
	},
]);
</script>

<style lang="scss" scoped>
@import url("~/assets/css/pages/index.scss");
</style>
