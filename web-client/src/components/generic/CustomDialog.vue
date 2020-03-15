<template>
	<v-dialog v-model="isShowLocal" width="500">
		<v-card>
			<v-card-title :class="`${color} white--text`">
				Confirm Dialog
				<div class="flex-grow-1"></div>
				<v-icon color="white" large>
					mdi-alert
				</v-icon>
			</v-card-title>
			<v-card-text class="pt-5">
				{{message}}
			</v-card-text>
			<v-card-actions>
				<div class="flex-grow-1"></div>
				<v-btn text class="black--text" @click="isShowLocal = false">Cancel</v-btn>
				<v-btn :color="color" :loading="isLoading" @click="action">Confirm</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
    export default {
        name: "generic-confirm-dialog",

        props: {
            isShow: {
                type: Boolean,
                required: true
            },

            action: {
                type: Function,
                required: true
            },

            message: {
                type: String,
                required: true
            },

			color: {
                type: String,
                required: true
			},

			isLoading: {
                type: Boolean,
                required: false
			}
        },

        data() {
            return {
                isShowLocal: false
            };
        },

        watch: {
            isShow(val) {
                this.isShowLocal = val;
            },

            isShowLocal(val) {
                this.$emit("update:isShow", val);
            }
        },

        created() {
            this.isShowLocal = this.isShow;
        }
    };
</script>