import { field, group } from "@nuxthq/studio/theme";

export default defineNuxtSchema({
	appConfig: {
		index: group({
			title: "首页配置",
			description: "首页的信息配置",
			fields: {
				skill: field({
					type: "array",
					title: "技术栈",
					description: "技术栈",
					default: ["JavaScript", "Vue.js", "Node.js", "C", "Kotlin", "MySql"],
				}),
                project: field({
					type: "array",
					title: "项目",
					description: "项目列表",
                }),
                api: field({
					type: "array",
					title: "api",
					description: "api列表",
                }),
                friend: field({
					type: "array",
					title: "友链",
					description: "友链列表",
                })
			},
		}),

		// project: group({
		// 	title: "项目列表",
		// 	description: "展示用户的各类项目",
		// 	fields: {
		// 		projects: field({
		// 			type: "array",
		// 			title: "项目",
		// 			default: [
		// 				{
		// 					title: "网易云无损解析",
		// 					description: "如果你苦于没有黑胶或者车载模式转换地磁播放器，不妨试试这个网站，它可以下载无损音乐。",
		// 					url: "https://soooooooooooooooooootheby.top/",
		// 				},
		// 				{
		// 					title: "Discord 表情贴纸下载器",
		// 					description: "这是一个可以下载贴纸的工具。",
		// 					url: "https://dge.sooooooooooooooooootheby.top/",
		// 				},
		// 			],
		// 		}),
		// 	},
		// }),

		// api: group({
		// 	title: "API 列表",
		// 	description: "用户提供的 API 服务",
		// 	fields: {
		// 		apis: field({
		// 			type: "array",
		// 			title: "API 项目",
		// 			default: [
		// 				{
		// 					title: "网易云音乐API",
		// 					description: "这个是大佬写的非常强大的 API 服务，可能被律师函警告了，fork了一份自己建服务。",
		// 					url: "https://netease.sooooooooooooooooootheby.top/NetEaseCloudMusicApi",
		// 				},
		// 				{
		// 					title: "网易云无损解析",
		// 					description: "这个是另外一大佬写的 API，可以解析下载音乐。",
		// 					url: "https://netease.sooooooooooooooooootheby.top/NetEase_url",
		// 				},
		// 			],
		// 		}),
		// 	},
		// }),

		// friend: group({
		// 	title: "朋友列表",
		// 	description: "用户的朋友信息",
		// 	fields: {
		// 		friends: field({
		// 			type: "array",
		// 			title: "朋友",
		// 			default: [
		// 				{
		// 					name: "Sooooooooooooooooootheby",
		// 					url: "#",
		// 				},
		// 				{
		// 					name: "lassksy",
		// 					url: "https://www.wodude.top/",
		// 				},
		// 			],
		// 		}),
		// 	},
		// }),
	},
});
