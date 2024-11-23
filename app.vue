<template>
	<header>
		<appHeader />
	</header>
	<main>
		<NuxtPage></NuxtPage>
	</main>
	<footer>
		<appFooter />
		<SpeedInsights/>
		<Analytics/>
	</footer>
</template>

<script setup>
import { SpeedInsights } from "@vercel/speed-insights/nuxt"
import { Analytics } from '@vercel/analytics/nuxt'

useHead({
	title: "River of star Dreams",
	meta: [{ name: "description", content: "s22y's webSite" }],
	link: [
		{ rel: "shortcut icon", href: "/logo_small.webp" },
		{ rel: "apple-touch-icon", href: "/logo_small.webp" },
	],
	titleTemplate(titleChunk) {
		return titleChunk ? `${titleChunk} - s22y's webSite` : "s22y's webSite";
	},
});
</script>

<style lang="scss" scoped>
header {
	width: 700px;
	height: auto;
	margin: 0 auto;
	padding-top: 82px;
}
main {
	width: 700px;
	min-height: 80vh;
	margin: 0 auto;
	position: relative;
	z-index: 1;
}
footer {
	width: 700px;
	margin: 0 auto;
	padding: 20px 0;
}

@media (max-width: 900px) {
	header {
		width: calc(100vw - 40px);
		height: 48px;
		padding: 64px 2.5vw 0;
	}
	main {
		width: calc(100vw - 40px);
		padding: 0 20px;
	}
	footer {
		width: calc(100vw - 40px);
		padding: 40px 20px;
	}
}
</style>
