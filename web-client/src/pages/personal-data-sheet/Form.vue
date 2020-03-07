<template>
	<div>
		<v-card tile>
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
		</v-card>
		<v-tabs-items v-model="tab">
			<v-tab-item>
				<personal-data-sheet-work-information></personal-data-sheet-work-information>
			</v-tab-item>
			<v-tab-item>
				<personal-data-sheet-personal-information></personal-data-sheet-personal-information>
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script>
    import PersonalDataSheetWorkInformation from "../../components/personal-data-sheet/WorkInformation";
    import PersonalDataSheetPersonalInformation from "../../components/personal-data-sheet/PersonalInformation";

    const tabActions = [
        "Work Information",
        "Personal",
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
            };
        }
    };
</script>