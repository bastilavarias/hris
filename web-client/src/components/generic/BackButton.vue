<template>
	<v-row align="center" dense :class="`${className}`">
		<v-btn icon class="mr-1" @click="$router.go(-1)">
			<v-icon>mdi-chevron-left</v-icon>
		</v-btn>
		<span class="font-weight-bold" style="font-size: 1.25rem;">{{title}}</span>
		<div class="flex-grow-1"></div>
		<div>
			<slot name="right"></slot>
		</div>
	</v-row>
</template>

<script>
    export default {
        name: "generic-back-button",

        props: {
            className: {
                type: String,
                required: false
            },

            title: {
                type: String,
                required: true
            }
        }
    };
</script>