export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },

    app: {
        pageTransition: { name: "page", mode: "out-in" },
        head: {
            title: "S22y",
            htmlAttrs: {
                lang: "zh-cn",
            },
            link: [{ rel: "icon", type: "image/x-icon", href: "/logo_small.webp" }],
            meta: [
                { name: "description", content: "去码头整点薯条" },
                { name: "ogDescription", content: "去码头整点薯条" },
                { name: "ogImage", content: "/Canvas-Ruom.webp" },
            ],
        },
    },

    modules: ["@nuxt/content", "@nuxtjs/color-mode", "@nuxt/icon", "nuxt-module-feed"],

    css: ["~/assets/base.scss", "~/assets/theme.scss", "~/assets/sspai.scss", "~/assets/waline.css"],

    nitro: {
        prerender: {
            routes: ["/rss.xml"],
        },
    },

    content: {
        preview: {
            api: "https://api.nuxt.studio",
        },
    },
});
