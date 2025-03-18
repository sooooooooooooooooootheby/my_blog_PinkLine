<template>
    <div>
        <ul class="note">
            <li class="item mark" v-for="item in note" :key="item.id">
                <ContentRenderer :value="item" />
                <p>{{ handleTime(item.data) }}</p>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
useSeoMeta({
    title: "S22y 的随记",
    ogTitle: "S22y 的随记",
});

const { data: note } = await(async () => {
    return await useAsyncData("note", () => {
        return queryCollection("notes").select("data", "body").order("data", "DESC").all();
    });
})();
</script>

<style lang="scss" scoped>
.note {
    .item {
        margin-bottom: 42px;
        list-style: none;
        border-bottom: 1px solid var(--border-color);
    }
    .item:last-child {
        border-bottom: none;
    }
}
</style>
