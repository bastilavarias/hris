<template>
	<v-card>
		<generic-card-back-button title="New Employee Time Card"></generic-card-back-button>
		<v-tabs v-model="tab" color="primary">
			<template v-for="(action, index) in tabActions">
				<v-tab :key="index" :to="action.to">
					{{action.name}}
				</v-tab>
			</template>
		</v-tabs>
		<router-view></router-view>
	</v-card>
</template>

<script>
    import GenericCardBackButton from "../../../components/generic/CardBackButton";

    export default {
        components: {GenericCardBackButton},
        data() {
            return {
                tab: 0,
                tabActions: [
                    {
                        name: "Daily",
                        to: {name: "time-card-management-form-daily"}
                    },
                    {
                        name: "Monthly",
                        to: {name: "time-card-management-form-monthly"}
                    }
                ]
            };
        }
    };
</script>