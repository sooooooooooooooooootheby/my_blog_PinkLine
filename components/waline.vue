<template>
    <div id="waline"></div>
</template>

<script lang="ts" setup>
import { init } from "@waline/client";

onMounted(() => {
    init({
        el: "#waline",
        serverURL: "https://comment.s22y.moe/",
        reaction: false,
        search: false,
        dark: "html[class='dark-mode']",
        emoji: ["https://gcore.jsdelivr.net/gh/sooooooooooooooooootheby/pinkline_commit@v1.0.0/r1999"],
    });
});
</script>
