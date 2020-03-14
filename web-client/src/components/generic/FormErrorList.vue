<template>
	<v-alert type="error" v-if="errors.length > 0">
		<template v-for="(error, index) in errors">
			<span class="mr-1 d-block" :key="index">{{error}}</span>
		</template>
	</v-alert>
</template>

<script>
    export default {
        name: "generic-form-error-list",

        props: {
            errors: {
                type: Array,
                required: true
            }
        }
    };
</script>