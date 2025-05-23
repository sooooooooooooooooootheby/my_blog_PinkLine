export default defineAppConfig({
	info: {
		title: "PinkLine",
		author: "s22y",
		lang: "zh-cn",
		logo: "/logo.webp",
		headLogo: "/logo.webp",
		description: "基于nuxt.js的博客",
		ogDescription: "基于nuxt.js的博客",
		ogImage: "/Canvas-Ruom.webp",
	},
	page: [
		{ path: "/", name: "about", icon: "akar-icons:coffee" },
		{ path: "/article", name: "article", icon: "akar-icons:folder" },
		{ path: "/note", name: "note", icon: "akar-icons:comment" },
		// { path: "/tag", name: "tag", icon: "akar-icons:tag" },
		// { path: "/sort", name: "sort", icon: "akar-icons:sort" },
		{ path: "/friend", name: "friend", icon: "akar-icons:paper-airplane" },
	],
	friend: [
		{
			name: "Sooooooooooooooooootheby",
			url: "#",
			button: "/friend/Sooooooooooooooooootheby.webp",
		},
		{
			name: "lassksy",
			url: "https://www.woodude.top/",
			button: "/friend/lassksy.webp",
		},
		{
			name: "BLxcwg666",
			url: "https://blog.nekorua.com/",
			button: "/friend/BLxcwg666.webp",
		},
		{
			name: "Imken",
			url: "https://imken.moe",
			button: "/friend/Imken.webp",
		},
		{
			name: "Ariasaka",
			url: "https://blog.yaria.top",
			button: "/friend/Ariasaka.webp",
		},
		{
			name: "ZLA 小站",
			url: "https://www.zla.pub/",
			button: "/friend/zla.webp",
		},
		{
			name: "lynn 的小站",
			url: "https://blog.lynn6.top",
			button: "/friend/lynn.webp",
		},
	],
	comment: {
		isComment: true,
		serverUrl: "https://comment.s22y.moe/",
		emoji: ["https://gcore.jsdelivr.net/gh/sooooooooooooooooootheby/pinkline_commit@v1.0.0/r1999"],
	},
	rss: {
		link: "blog.s22y.moe",
	},
});
