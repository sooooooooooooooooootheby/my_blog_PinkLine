<template>
    <div class="app">
        <div class="main">
            <div class="head">
                <appHeader />
            </div>
            <div class="page">
                <NuxtLoadingIndicator color="#d9908e" :height="2" />
                <NuxtLayout>
                    <NuxtPage />
                </NuxtLayout>
            </div>
            <div class="foot">
                <appFooter />
            </div>
        </div>
        <div class="background"></div>
    </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.app {
    .main {
        .head {
            width: 600px;
            margin: 0 auto;
        }
        .page {
            width: 600px;
            min-height: calc(100vh - 96px - 91px);
            margin: 0 auto;
            padding: 82px 0;
        }
        .footer {
            width: 600px;
            margin: 0 auto;
        }
    }
    .background {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: -99;
    }
}

.page-enter-active,
.page-leave-active {
    transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
    margin-top: 12px;
    opacity: 0;
}

@media (max-width: 600px) {
    .app {
        .main {
            .head,
            .page,
            .footer {
                width: calc(100vw - 40px);
                padding: 0 20px;
                overflow: hidden;
            }
        }
    }
}
</style>
