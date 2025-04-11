<template>
    <div class="blog">
        <h1>这些是我的宝藏</h1>
        <p class="count">总共有 {{ count }} 篇文章</p>
        <div class="bar">
            <input placeholder="Search this page..." type="text" name="text" class="input" v-model="searchQuery" />
        </div>
        <div class="search" v-if="searchQuery">
            <ul class="res">
                <li class="item" v-for="item in filteredSections" :key="item.id">
                    <NuxtLink :to="item.id" class="title">
                        <h3>{{ item.title }}</h3>
                    </NuxtLink>
                    <p class="content">{{ item.content }}</p>
                </li>
            </ul>
        </div>
        <ul class="list" v-else>
            <li class="item" v-for="item in list" :key="item.id">
                <NuxtLink :to="item.path" class="jump">
                    <span class="title">{{ item.title }}</span>
                </NuxtLink>
                <span class="data">{{ handleTime(item.data) }}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
useSeoMeta({
    title: "S22y 的文章",
    ogTitle: "S22y 的文章",
});

const { data: list } = await useAsyncData("list", () => {
    return queryCollection("articles").select("title", "description", "data", "path").order("data", "DESC").all();
});

const { data: count } = await useAsyncData("count", () => {
    return queryCollection("articles").count();
});

const searchQuery = ref("");

const { data: sections } = await useAsyncData("search-sections", () => {
    return queryCollectionSearchSections("articles");
});

interface Section {
    id: number;
    title: string;
    content: string;
}

const filteredSections = computed(() => {
    const query = searchQuery.value.toLowerCase();
    return sections.value.filter((section: Section) => {
        return section.title.toLowerCase().includes(query) || section.content.toLowerCase().includes(query);
    });
});
</script>

<style lang="scss" scoped>
.blog {
    .count {
        margin-top: 12px;
    }
    .bar {
        width: 100%;
        margin: 32px 0;
        display: flex;
        align-items: center;

        .input {
            width: 100%;
            height: 45px;
            margin: 0 auto;
            padding: 0 12px;
            border-radius: 12px;
            border: 1.5px solid lightgrey;
            outline: none;
            transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
            box-shadow: 0px 0px 20px -18px;
            background-color: transparent;
            color: var(--font-color);
        }

        .input:hover {
            border: 2px solid lightgrey;
            box-shadow: 0px 0px 20px -17px;
        }

        .input:active {
            transform: scale(0.95);
        }

        .input:focus {
            border: 2px solid grey;
        }
    }
    .search {
        width: 100%;

        .res {
            margin-top: 32px;

            .item {
                margin-bottom: 24px;
                list-style: none;

                .title {
                    color: var(--font-color);
                    margin-bottom: 2px;
                    text-decoration: none;
                    transition: 0.2s;
                }
                .title:hover {
                    color: var(--theme-color);
                }
                .content {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    opacity: 0.8;
                }
            }
        }
    }
    .list {
        .item {
            margin-bottom: 24px;
            list-style: none;
            display: flex;
            justify-content: space-between;

            .jump {
                color: var(--font-color);
                text-decoration: none;
                width: 60%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;

                .title {
                    transition: 0.2s;
                }
                .title:hover {
                    opacity: 0.6;
                }
            }
            .data {
                flex-shrink: 1;
            }
        }
    }
}
</style>
