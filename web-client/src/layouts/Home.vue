<template>
	<v-app>
		<v-navigation-drawer
				app
				color="white"
				light
				v-model="isDrawerOpen"
		>
			<v-list rounded two-line>
				<v-list-item>
					<v-list-item-avatar :size="35">
						<v-img :src="require('../assets/udmLogo.png')"></v-img>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title class="font-weight-bold text-capitalize">{{user.profile.firstName}}
																	{{user.profile.middleName ? `${getTextFirstLetter(user.profile.middleName)}.` : ''}}
																	{{user.profile.lastName}}
						</v-list-item-title>
						<v-list-item-subtitle class="font-weight-bold text-uppercase">{{user.employeeNumber}}</v-list-item-subtitle>
						<v-list-item-subtitle class="text-capitalize">{{user.designation}}</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-list>
			<v-divider></v-divider>
			<v-subheader>Available Actions</v-subheader>
			<v-list dense rounded>
				<template v-for="(action, index) in user.actions">
					<v-list-item
							:key="index"
							:to="action.route"
							active-class="primary white--text"
							v-if="action.subActions.length <= 0"
					>
						<v-list-item-action>
							<v-icon>mdi-{{ action.icon }}</v-icon>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>
								{{ action.name }}
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-list-group :key="index" :prepend-icon="`mdi-${action.icon}`" v-else>
						<template v-slot:activator>
							<v-list-item-title
							>{{ action.name }}
							</v-list-item-title>
						</template>
						<template v-for="(subAction, subActionIndex) in action.subActions">
							<v-list-item :key="subActionIndex" :to="subAction.route" active-class="primary white--text">
								<v-list-item-action>
									<v-icon>mdi-{{ subAction.icon }}</v-icon>
								</v-list-item-action>
								<v-list-item-content>
									<v-list-item-title
									>{{ subAction.name }}
									</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</template>
					</v-list-group>
				</template>
			</v-list>
		</v-navigation-drawer>
		<v-app-bar
				app
				color="white"
				light
				elevate-on-scroll
		>
			<v-app-bar-nav-icon @click.stop="isDrawerOpen = !isDrawerOpen"></v-app-bar-nav-icon>
			<v-icon class="mx-4">fab fa-youtube</v-icon>
			<v-spacer></v-spacer>
			<generic-notification></generic-notification>
			<v-menu offset-y>
				<template v-slot:activator="{ on }">
					<v-btn color="transparent" dark depressed exact v-on="on">
						<v-avatar :size="30">
							<v-img :src="user.profile.photo"></v-img>
						</v-avatar>
					</v-btn>
				</template>
				<v-list>
					<v-list-item @click="purgeAuth" exact>Logout</v-list-item>
				</v-list>
			</v-menu>
		</v-app-bar>
		<v-content>
			<v-container>
				<router-view></router-view>
			</v-container>
			<global-notification></global-notification>
		</v-content>
	</v-app>
</template>
<script>
    import GenericNotification from "../components/generic/Notification";
    import GlobalNotification from "../components/global/Notification";
    import customUtilities from "../services/customUtilities";
    import {purgeAccountToken} from "../store/types/account";

    export default {
        name: "home-layout",
        components: {GlobalNotification, GenericNotification},
        data() {
            return {
                isDrawerOpen: true,
            };
        },

        mixins: [customUtilities],

        computed: {
            user() {
                return this.$store.state.account.user;
            },

            isAuthenticated() {
                return this.$store.state.account.isAuthenticated;
            }
        },

		watch: {
            isAuthenticated(isAuthenticated) {
                if (!isAuthenticated) return this.$router.push({name: "login"});
			}
		},

        methods: {
            purgeAuth() {
                this.$store.commit(purgeAccountToken);
            }
        },

        created() {
            // if (!this.isAuthenticated) {
            //     this.$store.dispatch("login", {employeeNumber: "hr", password: "hr"});
            //     this.$router.push({name: "employee-list"});
            // }
        }
    };
</script>