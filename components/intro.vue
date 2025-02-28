<template>
    <div class="intro">
        <p>
            {{ props.content }}
        </p>
        <div class="divider">
            <span class="signature">S22y</span>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(["content"]);

</script>

<style lang="scss" scoped>
.intro {
    margin-bottom: 32px;

    p {
        letter-spacing: 0.3px;
        font-family: CrimsonText-5, sc;
    }
    .signature {
        font-family: Champignon;
        font-size: 2rem;
        color: #d0785b;
    }
}
</style>
