import { field, group } from "@nuxthq/studio/theme";

export default defineNuxtSchema({
	appConfig: {
		// parent: group({
		// 	title: "UI",
		// 	description: "UI configuration",
		// 	icon: "i-ph-palette-fill",
		// 	fields: {
		// 		primary: field({
		// 			type: "string",
		// 			title: "Primary",
		// 			description: "Primary color of your UI.",
		// 			icon: "i-ph-palette",
		// 			default: "sky",
		// 			required: ["sky", "mint", "rose", "amber"],
		// 		}),
		// 	},
		// }),
		index: group({
			title: "首页",
			description: "首页的配置信息",
			fields: {
				skill: field({
					type: "array",
					title: "技术",
					description: "这里写你会的技术",
					default: ["JavaScript", "Vue.js", "Node.js", "C", "Kotlin", "MySql"],
				}),
			},
		}),
	},
});
