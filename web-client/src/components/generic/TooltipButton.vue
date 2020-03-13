<template>
	<v-tooltip bottom>
		<template v-slot:activator="{ on }">
			<v-btn icon :class="`${className}`" v-on="on" :to="to">
				<v-icon>mdi-{{icon}}</v-icon>
			</v-btn>
		</template>
		<span class="text-capitalize">{{title}}</span>
	</v-tooltip>
</template>

<script>
	export default {
	    name: "generic-tooltip-button",

		props: {
	        to: {
	            type: Object,
				required: true
			},
	        icon: {
	            type: String,
				required: false
			},
	        title: {
	            type: String,
				required: false
			},
	        color: {
	            type: String,
				required: true
			},
	        className: {
	            type: String,
				required: false
			}
		}
	}
</script>