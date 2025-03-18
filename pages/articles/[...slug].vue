<template>
    <template v-if="article">
        <div class="mark">
            <h1>{{ article.title }}</h1>
            <p>{{ handleTime(article.data) }}</p>
            <ContentRenderer :value="article" />
            <div style="margin-top: 64px">
                <ClientOnly>
                    <waline />
                </ClientOnly>
            </div>
        </div>
    </template>
    <template v-else>
        <div class="empty-page">
            <h1>Page Not Found</h1>
            <p>Oops! The content you're looking for doesn't exist.</p>
            <NuxtLink to="/">Go back home</NuxtLink>
        </div>
    </template>
</template>

<script lang="ts" setup>
const route = useRoute();
const { data: article } = await useAsyncData(route.path, () => {
    return queryCollection("articles").path(route.path).select("title", "data", "body", "description").first();
});

useSeoMeta({
    title: `${article.value.title} | s22y`,
    ogTitle: `${article.value.title} | s22y`,
    description: article.value.description,
});
</script>

<style lang="scss" scoped></style>
