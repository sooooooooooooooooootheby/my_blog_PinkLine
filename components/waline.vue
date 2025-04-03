<template>
    <div id="waline"></div>
</template>

<script lang="ts" setup>
import { init } from "@waline/client";

onMounted(() => {
    init({
        el: "#waline",
        serverURL: "https://comment.blog.s22y.moe/",
        reaction: false,
        search: false,
        dark: "html[class='dark-mode']",
        emoji: [
            "https://gcore.jsdelivr.net/gh/sooooooooooooooooootheby/Emoji_Chest@v1.0.0/package/r1999",
            "https://gcore.jsdelivr.net/gh/sooooooooooooooooootheby/Emoji_Chest@v1.0.0/package/aurakingdom",
            "https://gcore.jsdelivr.net/gh/sooooooooooooooooootheby/Emoji_Chest@v1.0.0/package/mita"
        ],
    });
});
</script>

<style lang="scss">
.wl-emoji {
    height: 2.4rem !important;
}
</style>
