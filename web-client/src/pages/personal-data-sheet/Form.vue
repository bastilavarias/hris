<template>
	<div>
		<v-card color="transparent" flat>
			<generic-card-back-button title="Fill Up Personal Data Sheet">
				<template v-slot:right>
					<v-btn color="primary">
						<span class="mr-1">Save</span>
						<v-icon>mdi-content-save</v-icon>
					</v-btn>
				</template>
			</generic-card-back-button>
			<v-tabs v-model="tab" show-arrows color="primary">
				<template v-for="(action, index) in tabActions">
					<v-tab :key="index">
						{{action}}
					</v-tab>
				</template>
			</v-tabs>
			<v-tabs-items v-model="tab">
				<v-tab-item>
					<v-row>
						<v-col cols="12">
							<personal-data-sheet-work-information></personal-data-sheet-work-information>
						</v-col>
						<v-col cols="12">
							<personal-data-sheet-basic-information></personal-data-sheet-basic-information>
						</v-col>
						<v-col cols="12">
							<personal-data-sheet-benefits-information></personal-data-sheet-benefits-information>
						</v-col>
						<v-col cols="12">
							<personal-data-sheet-contact-information></personal-data-sheet-contact-information>
						</v-col>
						<v-col cols="12">
							<personal-data-sheet-address-details></personal-data-sheet-address-details>
						</v-col>
						<v-col cols="12">
							<personal-data-sheet-family-background></personal-data-sheet-family-background>
						</v-col>
						<v-col cols="12">
							<personal-data-sheet-educational-background></personal-data-sheet-educational-background>
						</v-col>
						<v-col cols="12">
							<personal-data-sheet-civil-service-eligibility></personal-data-sheet-civil-service-eligibility>
						</v-col>
					</v-row>
				</v-tab-item>
				<v-tab-item>
					<v-row>
						<v-col cols="12">
							<personal-data-sheet-work-experience></personal-data-sheet-work-experience>
						</v-col>
						<v-col cols="12">
							<personal-data-sheet-voluntary-work-experience></personal-data-sheet-voluntary-work-experience>
						</v-col>
						<v-col cols="12">
							<personal-data-sheet-training-programs-details></personal-data-sheet-training-programs-details>
						</v-col>
					</v-row>
				</v-tab-item>
				<v-tab-item>
					<v-row>
						<v-col cols="12">
							<personal-data-sheet-other-information>	</personal-data-sheet-other-information>
						</v-col>
						<v-col cols="12">
							<personal-data-sheet-related-questions></personal-data-sheet-related-questions>
						</v-col>
						<v-col cols="12">
							<personal-data-sheet-references></personal-data-sheet-references>
						</v-col>
					</v-row>
				</v-tab-item>
			</v-tabs-items>
		</v-card>
	</div>
</template>

<script>
    import PersonalDataSheetWorkInformation from "../../components/personal-data-sheet/WorkInformation";
    import PersonalDataSheetAddressDetails from "../../components/personal-data-sheet/personal-information/AddressDetails";
    import PersonalDataSheetContactInformation from "../../components/personal-data-sheet/personal-information/ContactInformation";
    import PersonalDataSheetBenefitsInformation from "../../components/personal-data-sheet/personal-information/BenefitsInformation";
    import PersonalDataSheetFamilyBackground from "../../components/personal-data-sheet/personal-information/FamilyBackground";
    import PersonalDataSheetEducationalBackground from "../../components/personal-data-sheet/personal-information/EducationalBackground";
    import PersonalDataSheetCivilServiceEligibility from "../../components/personal-data-sheet/personal-information/CivilServiceEligibility";
    import PersonalDataSheetWorkExperience from "../../components/personal-data-sheet/experience/WorkExperience";
    import PersonalDataSheetVoluntaryWorkExperience from "../../components/personal-data-sheet/experience/VoluntaryWorkExperience";
    import PersonalDataSheetBasicInformation from "../../components/personal-data-sheet/personal-information/BasicInformation";
    import PersonalDataSheetTrainingProgramsDetails from "../../components/personal-data-sheet/experience/TrainingProgramsDetails";
    import PersonalDataSheetOtherInformation from "../../components/personal-data-sheet/others/OtherInformation";
    import PersonalDataSheetRelatedQuestions from "../../components/personal-data-sheet/others/RelatedQuestions";
    import PersonalDataSheetReferences from "../../components/personal-data-sheet/others/References";
    import GenericCardBackButton from "../../components/generic/CardBackButton";

    const tabActions = [
        "Personal Information",
        "Experience",
        "Others"
    ];

    export default {
        name: "personal-data-sheet-form",
        components: {
            GenericCardBackButton,
            PersonalDataSheetReferences,
            PersonalDataSheetRelatedQuestions,
            PersonalDataSheetOtherInformation,
            PersonalDataSheetTrainingProgramsDetails,
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