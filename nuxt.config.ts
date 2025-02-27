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
        head: {
            title: "S22y",
            meta: [
                { name: "description", content: "去码头整点薯条!" },
                { name: "keywords", content: "s22y, github, blog" },
                { property: "og:title", content: "s22y" },
                { property: "og:description", content: "去码头整点薯条!" },
                { property: "og:image", content: "/og.webp" },
            ],
            link: [{ rel: "icon", type: "image/x-icon", href: "/logo_small.webp" }],
        },
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
