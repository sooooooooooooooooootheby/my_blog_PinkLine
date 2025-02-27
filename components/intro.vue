<template>
    <div class="intro">
        <p>
            {{ props.content }}
        </p>
        <div class="divider"><img src="/signature.png" alt="signature" /></div>
    </div>
</template>

<script setup>
const props = defineProps(["content"]);

</script>

<style lang="scss" scoped>
.intro {
    margin-bottom: 32px;

    img {
        width: 48px;
        height: auto;
        opacity: 0.8;
    }
    p {
        letter-spacing: 0.3px;
        font-family: CrimsonText-5, sc;
    }
}
</style>
