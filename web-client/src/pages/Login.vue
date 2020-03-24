<template>
	<v-app>
		<v-content>
			<v-container>
				<v-row justify="center">
					<v-col cols="12" sm="8" md="6" lg="4">
						<v-card flat color="transparent">
							<v-row align="center" justify="center">
								<v-avatar :size="100">
									<v-img :src="require('../assets/udmLogo.png')"/>
								</v-avatar>
							</v-row>
							<v-card-title class="font-weight-bold mt-5 mb-5">
								<div class="flex-grow-1"></div>
								Human Resource Information System
								<div class="flex-grow-1"></div>
							</v-card-title>
							<v-card-text>
								<v-row dense>
									<v-col cols="12">
										<v-text-field
												label="Username"
												outlined
												v-model="form.username"
												autofocus
												:error="hasError(error.name)"
												:error-messages="error.username"
										/>
									</v-col>
									<v-col cols="12">
										<v-text-field
												label="Password"
												type="password"
												outlined
												v-model="form.password"
												@keyup.enter="login"
												:error="hasError(error.password)"
												:error-messages="error.password"
										/>
									</v-col>
									<v-col cols="12">
										<v-btn
												color="primary"
												block
												class="mt-4"
												@click="login"
												:loading="isLoading"
												:disabled="!isFormValid"
										>Login
										</v-btn>
									</v-col>
								</v-row>
							</v-card-text>
							<span class="d-block subtitle-2 text-center mt-5">
									Copyright © Universidad de Manila 2020.
								</span>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
    import {loginAccount, setAccountError} from "../store/types/account";
    import {setActionName} from "../store/types/action";
    import customUtilities from "../services/customUtilities";

    const defaultForm = {
        username: "",
        password: ""
    };

    export default {
        data() {
            return {
                defaultForm,
                form: Object.assign({}, defaultForm),
                isLoading: false
            };
        },

        mixins: [customUtilities],

        computed: {
            isFormValid() {
                return this.form.username && this.form.password;
            },

            error() {
                return this.$store.state.account.error;
            }
        },

        watch: {
            "$store.state.account.isAuthenticated"(isAuthenticated) {
                if (isAuthenticated) return this.$router.push({name: "employee-list"});
            },

            "$store.state.action.name"(name) {
                if (name === `${loginAccount}-error`) {
                    this.$store.commit(setActionName, "");
                    this.isLoading = false;
                }
            }
        },

        methods: {
            login() {
                if (this.form.username && this.form.password) {
                    this.isLoading = true;
                    this.$store.dispatch(loginAccount, this.form);
                }
            }
        },

        destroyed() {
            this.$store.commit(setAccountError, {});
            this.$store.commit(setActionName, "");
        }
    };
</script>