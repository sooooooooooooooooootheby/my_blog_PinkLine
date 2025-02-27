<template>
    <div>
        <header>
            <appHeader />
        </header>
        <main>
            <div class="content">
                <NuxtPage />
            </div>
            <div class="bg"></div>
        </main>
        <footer>
            <appFooter />
        </footer>
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.page-enter-active,
.page-leave-active {
    transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(1px);
}
.content {
    width: 800px;
    margin: 0 auto;
    min-height: calc(100vh - 100px);
    padding-top: 42px;
    padding-bottom: 128px;
}
.bg {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    background-image: url("/bg.webp");
    background-attachment: fixed;
    background-size: cover;
}

@media (max-width: 768px) {
    .content {
        width: 90%;
        padding-top: 20px;
        padding-bottom: 60px;
    }
    .bg {
        background-position: center center;
    }
}
</style>
