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
					default: [],
				}),
				api: field({
					type: "array",
					title: "api",
					description: "api列表",
					default: [],
				}),
				friend: field({
					type: "array",
					title: "友链",
					description: "友链列表",
					default: [],
				}),
			},
		}),
	},
});
