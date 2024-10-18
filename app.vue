<template>
	<header>
		<appHeader />
	</header>
	<main>
		<NuxtPage></NuxtPage>
	</main>
	<footer>
		<appFooter />
	</footer>
</template>

<script setup></script>

<style lang="scss" scoped>
header {
	width: calc(90vw - 40vw);
	height: 83px;
	padding: 0 25vw;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 2;
}
main {
	width: 40vw;
	margin: 0 auto;
	padding-top: 83px;
	position: relative;
	z-index: 1;
}
footer {
	width: 50vw;
	margin: 0 auto;
	padding: 40px 0;
	position: relative;
	z-index: 1;
}

@media (max-width: 900px) {
	header {
		width: calc(100vw - 5vw);
		padding: 0 2.5vw;
	}
	main {
		width: calc(100vw - 40px);
		padding: 0 20px;
		padding-top: 83px;
	}
	footer {
		width: calc(100vw - 40px);
		padding: 40px 20px;
	}
}
</style>
