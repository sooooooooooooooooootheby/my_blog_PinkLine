<template>
    <div class="touch">
        <intro :content="$t('touch.intro')" />
        <ul class="list">
            <li class="item">
                <span>{{ $t("touch.list.item1.title") }}</span>
                <p>{{ $t("touch.list.item1.content") }}</p>
            </li>
            <li class="item">
                <span>{{ $t("touch.list.item2.title") }}</span>
                <p>{{ $t("touch.list.item2.content") }}</p>
            </li>
        </ul>
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.touch {
    .title {
        text-indent: 2em;
        font-size: 18px;
        letter-spacing: 0.1px;
        word-spacing: 1px;
    }
    .list {
        .item {
            margin-bottom: 12px;

            span {
                font-size: 1.2rem;
                font-family: sc;
            }
            p {
                opacity: 0.8;
            }
        }
    }
}
</style>
