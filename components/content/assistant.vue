<template>
	<div class="mt-6 flex">
		<div class="mr-2 size-8 flex items-center justify-center">
            <Icon class="text-3xl" name="lucide:bot" />
        </div>
		<div class="flex-1">
			<slot mdc-unwrap="p" />
		</div>
	</div>
</template>

<script lang="ts" setup></script>
