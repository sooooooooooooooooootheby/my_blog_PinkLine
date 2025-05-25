<template>
	<div class="my-6 flex items-center border-b-1 border-pinkline-200 text-lg">
		<div class="mr-2 flex size-8 items-center justify-center">
			<img src="/logo.webp" alt="avatar" class="rounded-full">
		</div>
		<div class="flex-1">
			<slot />
		</div>
	</div>
</template>

<script lang="ts" setup></script>
