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
						<v-list-item-title class="font-weight-bold">John D. Doe</v-list-item-title>
						<v-list-item-subtitle class="font-weight-bold">19-19-101</v-list-item-subtitle>
						<v-list-item-subtitle>Faculty</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-list>
			<v-divider></v-divider>
			<v-subheader>Available Actions</v-subheader>
			<v-list dense rounded>
				<template v-for="(action, index) in userActions">
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
				:elevation="1"
				app
				color="white"
				light
		>
			<v-app-bar-nav-icon @click.stop="isDrawerOpen = !isDrawerOpen"></v-app-bar-nav-icon>
			<v-icon class="mx-4">fab fa-youtube</v-icon>
			<v-spacer></v-spacer>
			<v-btn icon light>
				<v-icon>mdi-bell</v-icon>
			</v-btn>
			<v-menu offset-y>
				<template v-slot:activator="{ on }">
					<v-btn color="transparent" dark depressed exact v-on="on">
						<v-avatar :size="30">
							<v-img src="https://firebasestorage.googleapis.com/v0/b/portfolio-77930.appspot.com/o/resource%2FmyPicture.jpeg?alt=media&token=6b7c665c-60a0-4c59-a3b6-3bdc72c68fbe"></v-img>
						</v-avatar>
					</v-btn>
				</template>
				<v-list>
					<v-list-item exact>Profile</v-list-item>
					<v-list-item :to="{ name: 'user-information' }" exact>Settings</v-list-item>
					<v-list-item :to="{ name: 'login' }" exact>Logout</v-list-item>
				</v-list>
			</v-menu>
		</v-app-bar>
		<v-content>
			<v-container>
				<router-view></router-view>
			</v-container>
		</v-content>
	</v-app>
</template>
<script>
    const userActions = [
        {
            name: "Personal Data Sheet",
            icon: "clipboard-account",
            route: {name: "personal-data-sheet-manager"},
            subActions: []
        },
        {
            name: "Academic Maintenance",
            icon: "cog-transfer",
            route: {},
            subActions: [
                {
                    name: "Subject",
                    icon: "text-subject",
                    route: {name: "subject-manager"},
                    subActions: []
                },
                {
                    name: "Section",
                    icon: "google-classroom",
                    route: {name: "section-manager"},
                    subActions: []
                },
                {
                    name: "College",
                    icon: "school",
                    route: {name: "college-manager"},
                    subActions: []
                },
                {
                    name: "Course",
                    icon: "book",
                    route: {name: "course-manager"},
                    subActions: []
                },
                {
                    name: "Department",
                    icon: "window-closed-variant",
                    route: {name: "department-manager"},
                    subActions: []
                },
            ]
        },
        {
            name: "Room",
            icon: "door",
            route: {name: "room-manager"},
            subActions: []
        },
        {
            name: "Schedule",
            icon: "clock",
            route: {name: "schedule-manager"},
            subActions: []
        },
        {
            name: "Employee",
            icon: "badge-account",
            route: {name: "employee-manager"},
            subActions: []
        },
    ];

    export default {
        name: "home-layout",

        data() {
            return {
                isDrawerOpen: true,
                userActions
            };
        }
    };
</script>