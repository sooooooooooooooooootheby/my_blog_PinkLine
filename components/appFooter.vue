<template>
    <div class="appFooter">
        <div class="guider">
            <NuxtLink to="/">{{ $t("menu.home") }}</NuxtLink>
            <NuxtLink to="/article" :class="{ link: $route.path === '/article' }">{{ $t("menu.article") }}</NuxtLink>
            <NuxtLink to="/friend" :class="{ link: $route.path === '/friend' }">{{ $t("menu.friend") }}</NuxtLink>
            <NuxtLink to="/rss.xml" target="_blank"> RSS </NuxtLink>
        </div>
        <div class="divider"></div>
        <div class="bar">
            <p class="copyright">Copyright ©2023~2025.sooooooooooooooooootheby</p>
            <p>{{ count }}</p>
        </div>
        <span class="signature">Sooooooooooooooooootheby & AliceClodia</span>
    </div>
</template>

<script setup>
const count = ref(0);

const getCount = async () => {
    try {
        const res = await $fetch("https://api.s22y.moe/count/get?name=s22y");
        count.value = res.data.count;
    } catch (error) {
        console.error(error);
    }
};

onMounted(() => {
    if (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
        getCount();
    }
});
</script>

<style lang="scss" scoped>
.appFooter {
    max-width: 800px;
    height: 100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    .guider {
        width: 100%;
        display: flex;

        a {
            margin-right: 24px;
            font-family: sc;
        }
        .link {
            color: #d0785b;
        }
    }
    .divider {
        margin: 6px 0;
    }
    .bar {
        display: flex;
        justify-content: space-between;
    }
    .signature {
        margin: 0 auto;
        padding: 32px 0;
        font-family: Champignon;
        font-size: 3rem;
        color: #d0785b;
    }
}

@media (max-width: 768px) {
    .appFooter {
        max-width: 100vw;
        padding: 0 24px;

        .bar {
            display: flex;
            flex-direction: column;
        }
        .signature {
            font-size: 1.4rem;
        }
    }
}
</style>
