<template>
	<v-snackbar
			v-model="isShowLocal"
			right
			vertical
			:color="type"
			:timeout="3000"
	>
		<span class="body-2 text-capitalize">{{message}}</span>
		<v-btn text small @click="close">close</v-btn>
	</v-snackbar>
</template>

<script>

    import {setNotificationConfig} from "../../store/types/notification";

    export default {
        name: "global-notification",
        data() {
            return {
                isShowLocal: false
            };
        },
        computed: {
            message() {
                return this.$store.state.notification.message;
            },
            type() {
                return this.$store.state.notification.type;
            }
        },

        watch: {
            message(message) {
                this.isShowLocal = message.length > 0;
                setTimeout(() => this.close(), 3000);
            }
        },

        methods: {
            close() {
                this.isShowLocal = false;
                this.$store.commit(setNotificationConfig, {message: "", type: ""});
            }
        }
    };
</script>