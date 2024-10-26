export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },

	modules: ["@nuxt/icon", "@nuxt/content", '@nuxthq/studio'],
	content: {
		highlight: {
			theme: "github-dark",
		},
	},

	css: ["~/assets/css/base.scss"],

	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: "@use '~/assets/css/theme/handle.scss' as *; @use '~/assets/css/theme/themes.scss' as *;",
					api: "modern-compiler",
				},
			},
		},
	},
});
