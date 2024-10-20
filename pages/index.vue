<template>
	<div class="home">
		<div class="one">
			<div class="greet">
				<p class="greet_title1">Hi.👋</p>
				<p class="greet_title2">I'm</p>
				<p class="greet_title3"><Icon class="icon" name="icon-park-solid:connect-address-two" />现居 中国南宁.</p>
				<p class="greet_title3"><Icon class="icon" name="icon-park-solid:blossom" />梦想是躺平什么都不用做.</p>
			</div>
			<div class="introduce">
				<p class="introduce_1">目前大学在读, 专业是计算机网络技术.</p>
				<p class="introduce_2">目前在备战专升本考试, 业余时间会做一些小玩意, 可以去我的<a href="https://github.com/sooooooooooooooooootheby">Github主页</a>查看.</p>
			</div>
			<div class="content skill">
				<span class="title"> 技术 </span>
				<ul>
					<li v-for="(item, index) in skill" :key="index">{{ item }}</li>
				</ul>
			</div>
			<div class="content project">
				<span class="title"> 项目 </span>
				<ul>
					<li v-for="(item, index) in project" :key="index">
						<a :href="item.url" target="_blank"> {{ item.title }} </a>
						<p>{{ item.description }}</p>
					</li>
				</ul>
			</div>
			<div class="content friend">
				<span class="title"> 朋友们 </span>
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
useHead({
	title: "about",
});
const skill = ref(["JavaScript", "Vue.js", "Sass", "Node.js", "C", "Kotlin", "MySql"]);
const project = ref([
	{
		title: "网易云无损解析",
		description: "如果你苦于没有黑胶会员或者想要转战本地播放器, 不妨试试这个网站, 它可以下载无损音乐",
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
