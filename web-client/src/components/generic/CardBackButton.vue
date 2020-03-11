<template>
	<v-card-title>
		<v-btn icon class="mr-1" @click="$router.go(-1)">
			<v-icon>mdi-chevron-left</v-icon>
		</v-btn>
		<span class="font-weight-bold">
				{{title}}
				</span>
		<div class="flex-grow-1"></div>
		<slot name="right"></slot>
	</v-card-title>
</template>

<script>
	export default {
	    name: "generic-card-back-button",

		props: {
	        title: {
	            type: String,
				required: true
			}
		}
	}
</script>