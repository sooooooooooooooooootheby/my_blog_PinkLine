export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },

    modules: ["@nuxt/icon", "@nuxt/content", "@nuxthq/studio", "@nuxtjs/tailwindcss", "@nuxtjs/i18n"],
    content: {
        highlight: {
            theme: "github-dark",
        },
    },
    nitro: {
        prerender: {
            routes: ["/rss.xml"],
        },
    },

    css: ["~/assets/css/base.scss"],

    app: {
        pageTransition: { name: "page", mode: "out-in" },
    },

    i18n: {
        vueI18n: "./i18n.config.ts",
        locales: ["en", "zh"],
        defaultLocale: "en",
        experimental: {
            localeDetector: "localeDetector.ts",
        },
    },
});
