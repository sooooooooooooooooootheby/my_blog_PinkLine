<template>
    <div class="appFooter">
        <div class="up">
            <ul class="menu">
                <li class="item">
                    <NuxtLink to="https://www.travellings.cn/go.html" target="_blank"> TRAVELLING </NuxtLink>
                </li>
                <li class="item">
                    <NuxtLink to="/rss.xml" target="_blank"> RSS </NuxtLink>
                </li>
                <li class="item">
                    <NuxtLink to="/exercise">EXERCISE</NuxtLink>
                </li>
            </ul>
            <div class="info">
                <p class="copyright">Copyright ©2024.sooooooooooooooooootheby</p>
            </div>
        </div>
        <img src="/headerBar.webp" alt="headerBar" class="headerBar" />
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@import url("~/assets/css/components/appFooter.scss");
</style>
