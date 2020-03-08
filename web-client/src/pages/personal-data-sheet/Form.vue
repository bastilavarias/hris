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
			<v-tabs v-model="tab" show-arrows>
				<template v-for="(action, index) in tabActions">
					<v-tab :key="index">
						{{action}}
					</v-tab>
				</template>
			</v-tabs>
		</v-card>
		<v-tabs-items v-model="tab">
			<v-tab-item>
				<v-row>
					<v-col cols="12">
						<personal-data-sheet-work-information></personal-data-sheet-work-information>
					</v-col>
				</v-row>
			</v-tab-item>
			<v-tab-item>
				<v-row>
					<v-col cols="12">
						<personal-data-sheet-personal-information></personal-data-sheet-personal-information>
					</v-col>
					<v-col cols="12">
						<personal-data-sheet-benefits-information></personal-data-sheet-benefits-information>
					</v-col>
					<v-col cols="12">
						<personal-data-sheet-address-details></personal-data-sheet-address-details>
					</v-col>
					<v-col cols="12">
						<personal-data-sheet-contact-information></personal-data-sheet-contact-information>
					</v-col>
					<v-col cols="12">
						<personal-data-sheet-family-background></personal-data-sheet-family-background>
					</v-col>
					<v-col cols="12">
						<personal-data-sheet-educational-background></personal-data-sheet-educational-background>
					</v-col>
				</v-row>
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script>
    import PersonalDataSheetWorkInformation from "../../components/personal-data-sheet/WorkInformation";
    import PersonalDataSheetPersonalInformation from "../../components/personal-data-sheet/PersonalInformation";
    import PersonalDataSheetAddressDetails from "../../components/personal-data-sheet/AddressDetails";
    import PersonalDataSheetContactInformation from "../../components/personal-data-sheet/ContactInformation";
    import PersonalDataSheetBenefitsInformation from "../../components/personal-data-sheet/BenefitsInformation";
    import PersonalDataSheetFamilyBackground from "../../components/personal-data-sheet/FamilyBackground";
    import PersonalDataSheetEducationalBackground from "../../components/personal-data-sheet/EducationalBackground";

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
            PersonalDataSheetEducationalBackground,
            PersonalDataSheetFamilyBackground,
            PersonalDataSheetBenefitsInformation,
            PersonalDataSheetContactInformation,
            PersonalDataSheetAddressDetails,
            PersonalDataSheetPersonalInformation, PersonalDataSheetWorkInformation},
        data() {
            return {
                tab: 0,
                tabActions
            };
        }
    };
</script>