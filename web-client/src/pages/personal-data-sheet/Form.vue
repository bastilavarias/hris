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
				<div class="flex-grow-1"></div>
				<v-btn color="primary">
					<span class="mr-1">Save</span>
					<v-icon>mdi-database-plus</v-icon>
				</v-btn>
			</v-card-title>
			<v-tabs v-model="tab" show-arrows color="primary">
				<template v-for="(action, index) in tabActions">
					<v-tab :key="index">
						{{action}}
					</v-tab>
				</template>
			</v-tabs>
			<v-tabs-items v-model="tab">
				<v-tab-item>
					<personal-data-sheet-work-information></personal-data-sheet-work-information>
				</v-tab-item>
				<v-tab-item>
					<personal-data-sheet-basic-information></personal-data-sheet-basic-information>
					<personal-data-sheet-benefits-information></personal-data-sheet-benefits-information>
					<personal-data-sheet-address-details></personal-data-sheet-address-details>
					<personal-data-sheet-family-background></personal-data-sheet-family-background>
					<personal-data-sheet-educational-background></personal-data-sheet-educational-background>
					<personal-data-sheet-civil-service-eligibility></personal-data-sheet-civil-service-eligibility>
				</v-tab-item>
				<v-tab-item>
					<personal-data-sheet-work-experience></personal-data-sheet-work-experience>
					<personal-data-sheet-voluntary-work-experience></personal-data-sheet-voluntary-work-experience>
				</v-tab-item>
			</v-tabs-items>
		</v-card>
	</div>
</template>

<script>
    import PersonalDataSheetWorkInformation from "../../components/personal-data-sheet/WorkInformation";
    import PersonalDataSheetAddressDetails from "../../components/personal-data-sheet/AddressDetails";
    import PersonalDataSheetContactInformation from "../../components/personal-data-sheet/ContactInformation";
    import PersonalDataSheetBenefitsInformation from "../../components/personal-data-sheet/BenefitsInformation";
    import PersonalDataSheetFamilyBackground from "../../components/personal-data-sheet/FamilyBackground";
    import PersonalDataSheetEducationalBackground from "../../components/personal-data-sheet/EducationalBackground";
    import PersonalDataSheetCivilServiceEligibility from "../../components/personal-data-sheet/CivilServiceEligibility";
    import PersonalDataSheetWorkExperience from "../../components/personal-data-sheet/WorkExperience";
    import PersonalDataSheetVoluntaryWorkExperience from "../../components/personal-data-sheet/VoluntaryWorkExperience";
    import PersonalDataSheetBasicInformation from "../../components/personal-data-sheet/BasicInformation";

    const tabActions = [
        "Work Information",
        "Personal Information",
        "Experience",
        "Credentials",
        "Others"
    ];

    export default {
        name: "personal-data-sheet-form",
        components: {
            PersonalDataSheetBasicInformation,
            PersonalDataSheetVoluntaryWorkExperience,
            PersonalDataSheetWorkExperience,
            PersonalDataSheetCivilServiceEligibility,
            PersonalDataSheetEducationalBackground,
            PersonalDataSheetFamilyBackground,
            PersonalDataSheetBenefitsInformation,
            PersonalDataSheetContactInformation,
            PersonalDataSheetAddressDetails,
            PersonalDataSheetWorkInformation
        },
        data() {
            return {
                tab: 0,
                tabActions
            };
        }
    };
</script>