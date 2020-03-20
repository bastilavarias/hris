<template>
	<div style="margin-bottom: 4rem;">
		<generic-back-button title="Employee Form" class-name="mb-5">
			<template v-slot:right>
				<v-btn icon>
					<v-icon>mdi-printer</v-icon>
				</v-btn>
				<v-btn icon @click="update">
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
					<v-tab>Other Information</v-tab>
				</v-tabs>
				<v-tabs-items v-model="tab">
					<v-tab-item>
						<v-row dense>
							<v-col cols="12">
								<generic-profile
										:first-name.sync="form.profile.firstName"
										:middle-name.sync="form.profile.middleName"
										:last-name.sync="form.profile.lastName"
										:extension.sync="form.profile.extension"
										:birth-date.sync="form.profile.birthDate"
										:birth-place.sync="form.profile.birthPlace"
										:sex.sync="form.profile.sex"
										:civil-status.sync="form.profile.civilStatus"
										:citizenship.sync="form.profile.citizenship"
										:blood-type.sync="form.profile.bloodType"
										:height.sync="form.profile.height"
										:weight.sync="form.profile.weight"
								></generic-profile>
							</v-col>
							<v-col cols="12">
								<generic-subtitle>Benefits</generic-subtitle>
								<generic-benefit-form
										:gsis-id.sync="form.profile.benefit.gsisId"
										:pagibig-id.sync="form.profile.benefit.pagibigId"
										:philhealth-id.sync="form.profile.benefit.philhealthId"
										:sss-number.sync="form.profile.benefit.sssNumber"
										:tin-number.sync="form.profile.benefit.tinNumber"
										:agency-employee-number.sync="form.profile.benefit.agencyEmployeeNumber"
								></generic-benefit-form>
							</v-col>
							<v-col cols="12">
								<generic-subtitle>Contact</generic-subtitle>
								<generic-contact-form
										:telephone-number.sync="form.profile.contact.telephoneNumber"
										:mobile-number.sync="form.profile.contact.mobileNumber"
										:email-address.sync="form.profile.contact.emailAddress"
								></generic-contact-form>
							</v-col>
						</v-row>
					</v-tab-item>
					<v-tab-item>
						<v-row dense>
							<v-col cols="12">
								<generic-subtitle>Permanent Address</generic-subtitle>
								<generic-address-form
										:house-number.sync="form.profile.address.permanent.houseNumber"
										:street.sync="form.profile.address.permanent.street"
										:subdivision.sync="form.profile.address.permanent.subdivision"
										:barangay.sync="form.profile.address.permanent.barangay"
										:city-id.sync="form.profile.address.permanent.cityId"
										:province-id.sync="form.profile.address.permanent.provinceId"
										:zip-code.sync="form.profile.address.permanent.zipCode"
								></generic-address-form>
							</v-col>
							<v-col cols="12">
								<generic-subtitle>Residential Address</generic-subtitle>
								<generic-address-form
										:house-number.sync="form.profile.address.residential.houseNumber"
										:street.sync="form.profile.address.residential.street"
										:subdivision.sync="form.profile.address.residential.subdivision"
										:barangay.sync="form.profile.address.residential.barangay"
										:city-id.sync="form.profile.address.residential.cityId"
										:province-id.sync="form.profile.address.residential.provinceId"
										:zip-code.sync="form.profile.address.residential.zipCode"
								></generic-address-form>
							</v-col>
						</v-row>
					</v-tab-item>
					<v-tab-item>
						<v-row dense>
							<v-col cols="12">
								<generic-subtitle>Spouse Information</generic-subtitle>
								<generic-family-form
									:first-name.sync="form.profile.family.spouse.firstName"
									:middle-name.sync="form.profile.family.spouse.middleName"
									:last-name.sync="form.profile.family.spouse.lastName"
									:extension.sync="form.profile.family.spouse.extension"
								></generic-family-form>
							</v-col>
							<v-col cols="12" md="6">
								<generic-subtitle>Father Information</generic-subtitle>
								<generic-family-form
										:first-name.sync="form.profile.family.father.firstName"
										:middle-name.sync="form.profile.family.father.middleName"
										:last-name.sync="form.profile.family.father.lastName"
										:extension.sync="form.profile.family.father.extension"
								></generic-family-form>
							</v-col>
							<v-col cols="12" md="6">
								<generic-subtitle>Mother Information</generic-subtitle>
								<generic-family-form
										:first-name.sync="form.profile.family.mother.firstName"
										:middle-name.sync="form.profile.family.mother.middleName"
										:last-name.sync="form.profile.family.mother.lastName"
										:extension.sync="form.profile.family.mother.extension"
								></generic-family-form>
							</v-col>
							<v-col cols="12" md="12">
								<generic-subtitle>Children Information</generic-subtitle>
								<generic-children-information-table :children.sync="form.profile.family.children"></generic-children-information-table>
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
								<generic-subtitle>Voluntary Work Experience / Voluntary Organization(s)
								</generic-subtitle>
								<generic-voluntary-work-experience></generic-voluntary-work-experience>
							</v-col>
							<v-col cols="12">
								<generic-subtitle>L & D Interventions / Training Programs Attended</generic-subtitle>
								<generic-learning-development-intervention></generic-learning-development-intervention>
							</v-col>
						</v-row>
					</v-tab-item>
					<v-tab-item>
						<v-row dense>
							<v-col cols="12" md="4">
								<generic-list-input label="Hobbies"></generic-list-input>
							</v-col>
							<v-col cols="12" md="4">
								<generic-list-input label="Recognitions"></generic-list-input>
							</v-col>
							<v-col cols="12" md="4">
								<generic-list-input label="Organizations"></generic-list-input>
							</v-col>
							<v-col cols="12">
								<generic-subtitle>Related Questions</generic-subtitle>
								<template v-for="n in 5">
									<generic-question-item :key="n"></generic-question-item>
								</template>
							</v-col>
							<v-col cols="12">
								<generic-subtitle>References</generic-subtitle>
								<generic-reference-table></generic-reference-table>
							</v-col>
							<v-col cols="12">
								<generic-subtitle>Government Issued ID</generic-subtitle>
								<generic-government-id-form></generic-government-id-form>
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
    import GenericListInput from "../../components/generic/ListInput";
    import GenericQuestionItem from "../../components/generic/QuestionItem";
    import GenericReferenceTable from "../../components/table/Reference";
    import GenericGovernmentIdForm from "../../components/form/GovernmentId";

    const defaultForm = {
        employeeNumber: "",
        departmentId: "",
        designationId: "",
        isFullTime: true,
        profile: {
            firstName: "",
            middleName: "",
            lastName: "",
            extension: "",
            photo: null,
            birthDate: null,
            birthPlace: "",
            sex: "",
            civilStatus: "",
            citizenship: [],
            bloodType: "",
            height: 0,
            weight: 0,
            benefit: {
                gsisId: "",
                pagibigId: "",
                philhealthId: "",
                sssNumber: "",
                tinNumber: "",
                agencyEmployeeNumber: ""
            },
            contact: {telephoneNumber: "", mobileNumber: "", emailAddress: ""},
            address: {
                permanent: {
                    houseNumber: "",
                    street: "",
                    subdivision: "",
                    barangay: "",
                    cityId: null,
                    provinceId: null,
                    zipCode: "",
                },
                residential: {
                    houseNumber: "",
                    street: "",
                    subdivision: "",
                    barangay: "",
                    cityId: null,
                    provinceId: null,
                    zipCode: "",
                },
            },
            family: {
                spouse: {
                    firstName: "",
                    middleName: "",
                    lastName: "",
                    extension: "",
                },
                father: {
                    firstName: "",
                    middleName: "",
                    lastName: "",
                    extension: "",
                },
                mother: {
                    firstName: "",
                    middleName: "",
                    lastName: "",
                    extension: "",
                },
                children: []
            },
            education: [],
            civilServiceEligibility: [],
            workExperiences: [],
            voluntaryWorkExperiences: [],
            trainings: [],
            hobbies: [],
            recognitions: [],
            organizations: [],
            governmentIssueId: {
                governmentId: "",
                license: "",
                issuanceDate: null,
                issuancePlace: ""
            }
        }
    };

    export default {
        components: {
            GenericGovernmentIdForm,
            GenericReferenceTable,
            GenericQuestionItem,
            GenericListInput,
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
            GenericBenefitForm, GenericUpButton, GenericProfile, GenericImageInput, GenericBackButton
        },

        data() {
            return {
                tab: 0,
                form: Object.assign({}, defaultForm),
                defaultForm
            };
        },

        methods: {
            update() {
                console.log(this.form);
            }
        }
    };
</script>