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
							<v-card-title class="font-weight-bold mt-5 mb-10">
								<div class="flex-grow-1"></div>
								Human Resource Information System
								<div class="flex-grow-1"></div>
							</v-card-title>
							<v-card-subtitle>Account Login</v-card-subtitle>
							<v-card-text>
								<v-text-field
										label="Employee Number"
										outlined
										v-model="form.employeeNumber"
								/>
								<v-text-field
										label="Password"
										type="password"
										outlined
										v-model="form.password"
										@keyup.enter="login"
								/>
								<v-btn
										color="primary"
										block
										class="mt-4"
										@click="login"
								>Login
								</v-btn>
								<div class="pb-5"></div>
								<p class="subtitle-1 text-center">
									Copyright © Universidad de Manila 2020.
								</p>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
    const defaultForm = {
        employeeNumber: "",
        password: ""
    };

    export default {
        data() {
            return {
                defaultForm,
                form: Object.assign({}, defaultForm)
            };
        },

		watch: {
            "$store.state.auth.isAuthenticated"(isAuth) {
                if (isAuth) return this.$router.push({name: 'personal-data-sheet'});
			}
		},

        methods: {
            login() {
                if (this.form.employeeNumber && this.form.password) {
                    this.$store.dispatch("login", this.form);
				}
            }
        }
    };
</script>