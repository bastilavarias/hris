<template>
	<div>
		<v-btn color="primary" block @click="create" :disabled="disabled" :loading="isLoading"
			   v-if="operation === 'create'">Submit
		</v-btn>
		<v-btn color="secondary" block @click="update" :disabled="disabled" :loading="isLoading" v-else>Update</v-btn>
	</div>
</template>

<script>
    export default {
        name: "generic-form-action-button",

        props: {
            operation: {
                type: String,
                required: false
            },

            create: {
                type: Function,
                required: false
            },

            update: {
                type: Function,
                required: false
            },

            disabled: {
                type: Boolean,
                required: false
            },

            isLoading: {
                type: Boolean,
                required: false
            },
        }
    };
</script>