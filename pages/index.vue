<template>
    <div class="index mark custom">
        <ContentRenderer :value="about" />
    </div>
</template>

<script lang="ts" setup>
const route = useRoute();

const { data: about } = await useAsyncData(route.path, () => {
    return queryCollection("content").path("/page/").first();
});
</script>

<style lang="scss" scoped></style>
