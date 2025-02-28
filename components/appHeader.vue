<template>
    <div class="appHeader">
        <div class="guider">
            <NuxtLink to="/">{{ $t("menu.home") }}</NuxtLink>
            <NuxtLink to="/article" :class="{ link: $route.path === '/article' }">{{ $t("menu.article") }}</NuxtLink>
            <NuxtLink to="/project" :class="{ link: $route.path === '/project' }">{{ $t("menu.project") }}</NuxtLink>
            <NuxtLink to="/friend" :class="{ link: $route.path === '/friend' }">{{ $t("menu.friend") }}</NuxtLink>
        </div>
        <div class="tool">
            <Icon class="icon" name="fa-solid:language" @click="cutLang" />
        </div>
    </div>
</template>

<script setup>
const { t, setLocale } = useI18n();

const cutLang = () => {
    const lang = t("lang");
    setLocale(lang === "zh" ? "en" : "zh");
};
</script>

<style lang="scss" scoped>
.appHeader {
    max-width: 800px;
    height: 100px;
    margin: 0 auto;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    .guider {
        display: flex;

        a {
            margin-right: 24px;
            font-family: sc;
        }
        .link {
            color: #d0785b;
        }
    }
    .tool {
        .icon {
            font-size: 18px;
            cursor: pointer;
        }
    }
}

@media (max-width: 768px) {
    .appHeader {
        max-width: 100vw;
        padding: 0 24px;
    }
}
</style>
