<template>
    <div class="index prose">
        <h1>{{ greeting.title }}</h1>
        <intro :content="greeting.content" />
        <ul>
            <li>
                <p>
                    <!-- I am <b>Sooooooooooooooooootheby</b> —— a name as whimsically elongated as the winding lanes of the English
                    countryside. Should you find its grandeur a touch excessive, you may, with a dash of casual charm, simply
                    call me <b>S22y</b>. I hail from the picturesque region of Guangxi in China, where the hills roll like the
                    verses of a romantic poem. At present, I am immersed in my studies at a Technical school, with my gaze fixed
                    upon the 2025 The Examination for Promotion from Junior College to Bachelor's Degree in Regular Higher
                    Education. Though, I must confess, the path ahead seems as uncertain as the British weather. -->
                    {{ $t("index.ul.li1") }}
                </p>
            </li>
            <li>
                <p>
                    <!-- My heart beats with a fervent passion for the art of web front-end development, where I wield
                    Vue.js and Nuxt.js with a certain finesse. My repertoire extends to the realms of
                    the backend as well, where I dabble in the likes of MySQL and conjure servers with
                    Node.js, as one might craft a potion in a wizard's lair. -->
                    {{ $t("index.ul.li2") }}
                </p>
            </li>
            <li>
                <p>
                    <!-- In the quietude of my leisure, I indulge in the creation of various contraptions—some of utility, others of
                    whimsy. I extend an invitation to peruse
                    <a href="https://github.com/sooooooooooooooooootheby">my Github</a>
                    repository, where these creations reside. Should they prove to be of service to you, it would bring me no
                    small measure of joy. -->
                    {{ $t("index.ul.li3") }}
                </p>
            </li>
            <li>
                <p>
                    {{ $t("index.ul.li4") }}
                    <Icon class="icon" name="fa-brands:js-square" />
                    <Icon class="icon" name="mingcute:vue-fill" />
                    <Icon class="icon" name="tabler:brand-nodejs" />
                    <Icon class="icon" name="devicon-plain:c" />
                    <Icon class="icon" name="tabler:brand-kotlin" />
                    <Icon class="icon" name="whh:mysqltwo" />
                    <Icon class="icon" name="simple-icons:nuxt" />
                </p>
            </li>
            <small>{{ $t("index.ul.small") }}</small>
        </ul>
        <NuxtLink class="getInTouch btn" to="touch">{{ $t("index.ul.touch") }}</NuxtLink>
    </div>
</template>

<script setup>
const { t } = useI18n();

const greeting = ref({
    title: "",
    content: "",
});

const getGreeting = () => {
    const now = new Date();
    const hours = now.getHours();

    if (hours < 12) {
        greeting.value.title = t("index.greeting1.title");
        greeting.value.content = t("index.greeting1.content");
    } else if (hours < 18) {
        greeting.value.title = t("index.greeting2.title");
        greeting.value.content = t("index.greeting2.content");
    } else {
        greeting.value.title = t("index.greeting3.title");
        greeting.value.content = t("index.greeting3.content");
    }
};

onMounted(() => {
    getGreeting();
});
</script>

<style lang="scss" scoped>
.index {
    width: 100%;
    max-width: 100%;

    img {
        width: 48px;
        height: auto;
    }
    h1,
    .intro {
        letter-spacing: 0.3px;
    }
    p,
    li {
        letter-spacing: 0.1px;
        word-spacing: 1px;
        margin: 8px 0;
    }
    small {
        font-size: 12px;
        margin-left: 10px;
    }
    code {
        font-size: 0.8rem;
    }
    .icon {
        margin-right: 4px;
    }
    .getInTouch {
        height: 2.6rem;
        min-height: 2rem;
        margin-left: 24px;
        padding: 0 24px;
        font-size: 14px;
        text-decoration: none;
        border-radius: 999px;
        background-color: transparent;
        font-family: sc;
    }
}
</style>
