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
				<p class="introduce_1">大学在读, 专业是计算机网络技术.</p>
				<p class="introduce_2">目前在备战专升本考试, 业余时间会做一些小玩意, 可以去我的<a href="https://github.com/sooooooooooooooooootheby?tab=repositories">Github</a>查看.</p>
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
			<div class="content project">
				<span class="title"> Api </span>
				<ul>
					<li v-for="(item, index) in api" :key="index">
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
			<div class="content contact">
				<span class="title"> 联系 </span>
				<ul>
					<li>Github: <a href="https://github.com/sooooooooooooooooootheby" target="_blank">https://github.com/sooooooooooooooooootheby</a></li>
					<li>Email: sooooooooooooooooootheby@gmail.com</li>
					<li>Discord: sooooooooooooooooootheby</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup>
useHead({
	title: "about",
});
const skill = ref(["JavaScript", "Vue.js", "Node.js", "C", "Kotlin", "MySql"]);
const project = ref([
	{
		title: "网易云无损解析",
		description: "如果你苦于没有黑胶会员或者想要转战本地播放器, 不妨试试这个网站, 它可以下载无损音乐",
		url: "https://neteasepage.sooooooooooooooooootheby.top/",
	},
	{
		title: "Discord 表情贴纸下载器",
		description: "这是一个可以下载discord服务器中表情和贴纸的下载工具",
		url: "https://dge.sooooooooooooooooootheby.top/",
	},
]);
const api = ref([
	{
		title: "网易云音乐api",
		description: "这个是大佬写的非常强大的api服务, 可惜被律师函警告了, fork了一份自己建服务",
		url: "https://netease.sooooooooooooooooootheby.top/NeteaseCloudMusicApi/",
	},
	{
		title: "网易云无损解析",
		description: "这个是另外一个大佬写的api, 可以解析下载音乐, 很强, 我自己建了服务用来改进了她的解析功能.",
		url: "https://netease.sooooooooooooooooootheby.top/Netease_url/",
	}
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
	{
		name: "Imken",
		url: "https://imken.moe",
	},
]);
</script>

<style lang="scss" scoped>
@import url("~/assets/css/pages/index.scss");
</style>
