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
        </div>
        <div class="signature">
            <img src="/signature1.png" alt="signature" />
        </div>
    </div>
</template>

<script setup></script>

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
    .signature {
        margin: 0 auto;
        padding: 24px 0;

        img {
            height: 64px;
        }
    }
}

@media (max-width: 768px) {
    .appFooter {
        max-width: 100vw;
        padding: 0 24px;
    }
}
</style>
