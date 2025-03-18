<template>
    <div class="header">
        <div class="info">
            <img src="/logo_MG.gif" alt="logo_MG" class="img" />
        </div>
        <ul class="navigate pc">
            <li class="item" v-if="isPath('/')"><NuxtLink to="/">about</NuxtLink></li>
            <li class="item" v-if="isPath('/article')"><NuxtLink to="/article">article</NuxtLink></li>
            <li class="item" v-if="isPath('/note')"><NuxtLink to="/note">note</NuxtLink></li>
            <li class="item" v-if="isPath('/friend')"><NuxtLink to="/friend">friend</NuxtLink></li>
            <li class="item" v-if="isPath('/search')"><NuxtLink to="/search">search</NuxtLink></li>
            <li class="item"><NuxtLink to="/rss.xml" target="_blank">rss</NuxtLink></li>
        </ul>
        <ul class="navigate mobi">
            <li class="item" v-if="isPath('/')">
                <NuxtLink to="/"><Icon name="akar-icons:coffee" /></NuxtLink>
            </li>
            <li class="item" v-if="isPath('/article')">
                <NuxtLink to="/article"><Icon name="akar-icons:folder" /></NuxtLink>
            </li>
            <li class="item" v-if="isPath('/note')">
                <NuxtLink to="/note"><Icon name="akar-icons:comment" /></NuxtLink>
            </li>
            <li class="item" v-if="isPath('/friend')">
                <NuxtLink to="/friend"><Icon name="akar-icons:paper-airplane" /></NuxtLink>
            </li>
            <li class="item" v-if="isPath('/search')">
                <NuxtLink to="/search"><Icon name="akar-icons:search" /></NuxtLink>
            </li>
            <li class="item">
                <NuxtLink to="/rss.xml" target="_blank"><Icon name="akar-icons:rss" /></NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const isPath = (path: string): boolean => {
    if (path === route.path) {
        return false;
    } else {
        return true;
    }
};
</script>

<style lang="scss" scoped>
.header {
    width: 100%;
    height: 64px;
    padding-top: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .info {
        display: flex;
        align-items: center;

        .img {
            width: 24px;
            height: 24px;
            margin-right: 8px;
        }
    }
    .navigate {
        display: flex;

        .item {
            list-style: none;
            margin-left: 8px;

            a {
                color: var(--font-color);
                opacity: 0.8;
            }
        }
    }
    .mobi {
        display: none;
        font-size: 1.1rem;

        .item {
            margin-left: 12px;
        }
    }
}

@media (max-width: 600px) {
    .header {
        .pc {
            display: none;
        }
        .mobi {
            display: flex;
        }
    }
}
</style>
