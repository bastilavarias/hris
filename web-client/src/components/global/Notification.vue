<template>
	<v-dialog v-model="isShow" width="500">
		<v-card dark color="white">
			<div class="success text-center py-5">
				<v-icon :size="75">mdi-check-circle</v-icon>
			</div>
			<v-card-text class="text-center pt-10">
				<span class="d-block subtitle-1 text-center black--text">
					{{message ? message : ""}}
				</span>
			</v-card-text>
			<v-card-actions>
				<div class="flex-grow-1"></div>
				<v-btn light text class="text-capitalize black--text" @click="isShow = false">Close</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
    export default {
        name: "global-notification",
        data() {
            return {
                isShow: true
            };
        },
        computed: {
            message() {
                return this.$store.state.notification.message;
            }
        },
        watch: {
            message(message) {
                this.isShow = message.length > 0;
            }
        }
    };
</script>