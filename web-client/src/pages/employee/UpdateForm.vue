<template>
	<div>
		<generic-back-button title="Employee Form" class-name="mb-5">
			<template v-slot:right>
				<v-btn icon>
					<v-icon>mdi-printer</v-icon>
				</v-btn>
				<v-btn icon>
					<v-icon>mdi-content-save</v-icon>
				</v-btn>
			</template>
		</generic-back-button>
		<v-row>
			<v-col cols="12" md="3">
				<v-row dense>
					<v-col cols="12">
						<div class="text-center">
							<generic-image-input :photo="null"></generic-image-input>
						</div>
					</v-col>
					<v-col cols="12">
						<v-text-field label="Employee Number" outlined readonly></v-text-field>
					</v-col>
					<v-col cols="12">
						<v-text-field label="Department" outlined></v-text-field>
					</v-col>
					<v-col cols="12">
						<v-text-field label="Designation" outlined></v-text-field>
					</v-col>
				</v-row>
			</v-col>
			<v-col cols="12" md="9">
				<v-tabs v-model="tab" fixed-tabs show-arrows class="mb-5">
					<v-tab>Profile</v-tab>
					<v-tab>Address Details</v-tab>
					<v-tab>Family Details</v-tab>
					<v-tab>Experience</v-tab>
					<v-tab>Others</v-tab>
				</v-tabs>
				<v-tabs-items v-model="tab">
					<v-tab-item>
						<v-row dense>
							<v-col cols="12">
								<generic-profile></generic-profile>
							</v-col>
							<v-col cols="12">
								<generic-subtitle>Benefits</generic-subtitle>
								<generic-benefit-form></generic-benefit-form>
							</v-col>
							<v-col cols="12">
								<generic-subtitle>Contact</generic-subtitle>
								<generic-contact-form></generic-contact-form>
							</v-col>
						</v-row>
					</v-tab-item>
					<v-tab-item>
						<v-row dense>
							<v-col cols="12">
								<generic-subtitle>Permanent Address</generic-subtitle>
								<generic-address-form></generic-address-form>
							</v-col>
							<v-col cols="12">
								<generic-subtitle>Residential Address</generic-subtitle>
								<generic-address-form></generic-address-form>
							</v-col>
						</v-row>
					</v-tab-item>
					<v-tab-item>
						<v-row dense>
							<v-col cols="12">
								<generic-subtitle>Spouse Information</generic-subtitle>
								<generic-family-form></generic-family-form>
							</v-col>
							<v-col cols="12" md="6">
								<generic-subtitle>Father Information</generic-subtitle>
								<generic-family-form></generic-family-form>
							</v-col>
							<v-col cols="12" md="6">
								<generic-subtitle>Mother Information</generic-subtitle>
								<generic-family-form></generic-family-form>
							</v-col>
							<v-col cols="12" md="12">
								<generic-subtitle>Children Information</generic-subtitle>
								<generic-children-information-table></generic-children-information-table>
							</v-col>
						</v-row>
					</v-tab-item>
					<v-tab-item>
						<v-row dense>
							<v-col cols="12">
								<generic-subtitle>Educational Background</generic-subtitle>
								<generic-educational-background-table></generic-educational-background-table>
							</v-col>
							<v-col cols="12">
								<generic-subtitle>Civil Service Eligibility</generic-subtitle>
								<generic-civil-service-eligibility></generic-civil-service-eligibility>
							</v-col>
							<v-col cols="12">
								<generic-subtitle>Work Experience</generic-subtitle>
								<generic-work-experience></generic-work-experience>
							</v-col>
							<v-col cols="12">
								<generic-subtitle>Voluntary Work Experience / Voluntary Organization(s)</generic-subtitle>
								<generic-voluntary-work-experience></generic-voluntary-work-experience>
							</v-col>
							<v-col cols="12">
								<generic-subtitle>L & D Interventions / Training Programs Attended</generic-subtitle>
								<generic-learning-development-intervention></generic-learning-development-intervention>
							</v-col>
						</v-row>
					</v-tab-item>
				</v-tabs-items>
			</v-col>
		</v-row>
		<generic-up-button></generic-up-button>
	</div>
</template>
<script>
    import GenericBackButton from "../../components/generic/BackButton";
    import GenericImageInput from "../../components/generic/PhotoInput";
    import GenericProfile from "../../components/form/Profile";
    import GenericUpButton from "../../components/generic/UpButton";
    import GenericBenefitForm from "../../components/form/Benefit";
    import GenericSubtitle from "../../components/generic/Subtitle";
    import GenericContactForm from "../../components/form/Contact";
    import GenericAddressForm from "../../components/form/Address";
    import GenericFamilyForm from "../../components/form/Family";
    import GenericChildrenInformationTable from "../../components/table/ChildrenInformation";
    import GenericEducationalBackgroundTable from "../../components/table/EducationalBackground";
    import GenericCivilServiceEligibility from "../../components/table/CivilServiceEligibility";
    import GenericWorkExperience from "../../components/table/WorkExperience";
    import GenericVoluntaryWorkExperience from "../../components/table/VoluntaryWorkExperience";
    import GenericLearningDevelopmentIntervention from "../../components/table/LearningDevelopmentIntervention";
    export default {
        components: {
            GenericLearningDevelopmentIntervention,
            GenericVoluntaryWorkExperience,
            GenericWorkExperience,
            GenericCivilServiceEligibility,
            GenericEducationalBackgroundTable,
            GenericChildrenInformationTable,
            GenericFamilyForm,
            GenericAddressForm,
            GenericContactForm,
            GenericSubtitle,
            GenericBenefitForm, GenericUpButton, GenericProfile, GenericImageInput, GenericBackButton},

		data() {
            return {
                tab: 0
			}
		}
    };
</script>