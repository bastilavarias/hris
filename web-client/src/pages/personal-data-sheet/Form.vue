<template>
	<div>
		<v-card>
			<v-card-title>
				<v-btn icon class="mr-1" @click="$router.go(-1)">
					<v-icon>mdi-chevron-left</v-icon>
				</v-btn>
				<span class="font-weight-bold">
				Fill Up Personal Data Sheet
			</span>
			</v-card-title>
			<v-tabs v-model="tab" show-arrows fixed-tabs>
				<template v-for="(action, index) in tabActions">
					<v-tab :key="index">
						{{action}}
					</v-tab>
				</template>
			</v-tabs>
			<v-tabs-items v-model="tab">
				<v-tab-item>
					<v-card-subtitle>Work Information</v-card-subtitle>
					<v-card-text>
						<personal-data-sheet-work-information></personal-data-sheet-work-information>
					</v-card-text>
				</v-tab-item>
				<v-tab-item>
					<v-card-subtitle>Personal Information</v-card-subtitle>
					<v-card-text>
						<personal-data-sheet-personal-information></personal-data-sheet-personal-information>
					</v-card-text>
				</v-tab-item>
			</v-tabs-items>
			<v-card-actions>
				<v-btn color="primary" block>Submit</v-btn>
			</v-card-actions>
		</v-card>
	</div>
</template>

<script>
	import PersonalDataSheetWorkInformation from "../../components/personal-data-sheet/WorkInformation";
    import PersonalDataSheetPersonalInformation from "../../components/personal-data-sheet/PersonalInformation";
    const tabActions = [
		"Work Information",
		"Personal Information",
		"Experience",
		"Credentials",
        "Others"
	];

    export default {
        name: "personal-data-sheet-form",
        components: {PersonalDataSheetPersonalInformation, PersonalDataSheetWorkInformation},
        data() {
            return {
                tab: 0,
				tabActions
			}
		}
    }
</script>