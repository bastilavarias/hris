<template>
	<v-btn
			fixed
			dark
			fab
			bottom
			right
			color="primary"
			@click="$vuetify.goTo(0)"
	>
		<v-icon>mdi-chevron-up</v-icon>
	</v-btn>
</template>

<script>
	export default {
	    name: "generic-up-button"
	}
</script>