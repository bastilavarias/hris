<template>
	<div>
		<span class="font-weight-bold" style="font-size: 1.5rem;">Personal Data Sheet</span>
		<v-row>
			<v-col cols="12" md="3">
				<v-row dense>
					<v-col cols="12">
						<div class="text-center">
							<generic-image-input :photo.sync="form.profile.photo"
												 :preview.sync="form.profile.photoPreview"></generic-image-input>
						</div>
					</v-col>
					<v-col cols="12">
						<v-text-field label="Employee Number" outlined readonly
									  v-model="form.employeeNumber"></v-text-field>
					</v-col>
					<v-col cols="12">
						<v-text-field label="Department" outlined readonly class="text-capitalize"
									  :value="form.departmentName" style="text-transform: capitalize;">
						</v-text-field>
					</v-col>
					<v-col cols="12">
						<v-text-field label="Designation" outlined readonly
									  :value="form.designationName" style="text-transform: capitalize;"></v-text-field>
					</v-col>
					<v-col cols="12">
						<v-text-field label="Appointment Status" outlined readonly
									  :value="form.isFullTime ? 'Full Time' : 'Part Time'"></v-text-field>
					</v-col>
					<v-col cols="12">
						<generic-subtitle>Actions</generic-subtitle>
						<v-btn class="mb-2" block @click="generatePersonalDataSheetForm" :loading="isPDSGenerationStart">
							<v-icon class="mr-1">mdi-printer</v-icon>
							<span>Print PDS</span>
						</v-btn>
					</v-col>
				</v-row>
			</v-col>
			<v-col cols="12" md="9">
				<v-tabs v-model="tab" fixed-tabs show-arrows class="mb-5">
					<template v-for="(item, index) in tabItems">
						<v-tab :key="index">{{item}}</v-tab>
					</template>
				</v-tabs>
				<v-tabs-items v-model="tab" style="background-color: whitesmoke !important;">
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
										:city.sync="form.profile.address.permanent.city"
										:province.sync="form.profile.address.permanent.province"
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
										:city.sync="form.profile.address.residential.city"
										:province.sync="form.profile.address.residential.province"
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
							<v-col cols="12" md="12" class="mb-10">
								<generic-subtitle>Children Information</generic-subtitle>
								<generic-children-information-table
										:children.sync="form.profile.family.children"></generic-children-information-table>
							</v-col>
						</v-row>
					</v-tab-item>
					<v-tab-item>
						<v-row dense>
							<v-col cols="12">
								<generic-subtitle>Educational Background</generic-subtitle>
								<generic-educational-background-table
										:education.sync="form.profile.education"></generic-educational-background-table>
							</v-col>
							<v-col cols="12">
								<generic-subtitle>Civil Service Eligibility</generic-subtitle>
								<generic-civil-service-eligibility
										:civil-service-eligibility.sync="form.profile.civilServiceEligibility"></generic-civil-service-eligibility>
							</v-col>
							<v-col cols="12">
								<generic-subtitle>Work Experience</generic-subtitle>
								<generic-work-experience
										:work-experiences.sync="form.profile.workExperiences"></generic-work-experience>
							</v-col>
							<v-col cols="12">
								<generic-subtitle>Voluntary Work Experience / Voluntary Organization(s)
								</generic-subtitle>
								<generic-voluntary-work-experience
										:voluntary-work-experiences.sync="form.profile.voluntaryWorkExperiences"></generic-voluntary-work-experience>
							</v-col>
							<v-col cols="12" class="mb-10">
								<generic-subtitle>L & D Interventions / Training Programs Attended</generic-subtitle>
								<generic-training-table
										:trainings.sync="form.profile.trainings"></generic-training-table>
							</v-col>
						</v-row>
					</v-tab-item>
					<v-tab-item>
						<v-row dense>
							<v-col cols="12" md="4">
								<generic-list-input :list.sync="form.profile.hobbies"
													label="Hobbies"></generic-list-input>
							</v-col>
							<v-col cols="12" md="4">
								<generic-list-input :list.sync="form.profile.recognitions"
													label="Recognitions"></generic-list-input>
							</v-col>
							<v-col cols="12" md="4">
								<generic-list-input :list.sync="form.profile.organizations"
													label="Organizations"></generic-list-input>
							</v-col>
							<v-col cols="12">
								<generic-subtitle>References</generic-subtitle>
								<generic-reference-table
										:references.sync="form.profile.references"></generic-reference-table>
							</v-col>
							<v-col cols="12">
								<generic-subtitle>Government Issued ID</generic-subtitle>
								<generic-government-issue-id-form
										:government-id.sync="form.profile.governmentIssueId.governmentId"
										:license-number.sync="form.profile.governmentIssueId.licenseNumber"
										:issuance-place.sync="form.profile.governmentIssueId.issuancePlace"
										:issuance-date.sync="form.profile.governmentIssueId.issuanceDate"
								></generic-government-issue-id-form>
							</v-col>
						</v-row>
					</v-tab-item>
				</v-tabs-items>
				<v-row dense>
					<v-col cols="12">
						<v-btn block color="secondary" :disabled="!isFormValid" :loading="isLoading" @click="update">
							Update
						</v-btn>
					</v-col>
				</v-row>
			</v-col>
		</v-row>

	</div>
</template>

<script>
    import GenericImageInput from "../../components/generic/PhotoInput";
    import GenericDepartmentSelection from "../../components/selection/Department";
    import GenericDesignationSelection from "../../components/selection/Designation";
    import GenericSubtitle from "../../components/generic/Subtitle";
    import GenericProfile from "../../components/form/Profile";
    import GenericBenefitForm from "../../components/form/Benefit";
    import GenericContactForm from "../../components/form/Contact";
    import GenericAddressForm from "../../components/form/Address";
    import GenericFamilyForm from "../../components/form/Family";
    import GenericChildrenInformationTable from "../../components/table/ChildrenInformation";
    import GenericEducationalBackgroundTable from "../../components/table/EducationalBackground";
    import GenericCivilServiceEligibility from "../../components/table/CivilServiceEligibility";
    import GenericWorkExperience from "../../components/table/WorkExperience";
    import GenericTrainingTable from "../../components/table/Training";
    import GenericListInput from "../../components/generic/ListInput";
    import GenericGovernmentIssueIdForm from "../../components/form/GovernmentIssueId";
    import GenericReferenceTable from "../../components/table/Reference";
    import GenericVoluntaryWorkExperience from "../../components/table/VoluntaryWorkExperience";
    import {
        generatePersonalDataSheet,
        getPersonalDataSheet,
        updatePersonalDataSheet
    } from "../../store/types/personalDataSheet";
    import {setActionName} from "../../store/types/action";

    const defaultForm = {
        employeeNumber: "",
        departmentName: "",
        designationName: "",
        isFullTime: true,
        profile: {
            firstName: "",
            middleName: "",
            lastName: "",
            extension: "",
            photo: null,
            photoPreview: "",
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
                    city: "",
                    province: "",
                    zipCode: "",
                },
                residential: {
                    houseNumber: "",
                    street: "",
                    subdivision: "",
                    barangay: "",
                    city: "",
                    province: "",
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
            references: [],
            governmentIssueId: {
                governmentId: "",
                licenseNumber: "",
                issuanceDate: null,
                issuancePlace: ""
            }
        }
    };
    const tabItems = [
        "Profile",
        "Address Details",
        "Family Details",
        "Experience",
        "Other Information"
    ];

    export default {
        components: {
            GenericVoluntaryWorkExperience,
            GenericReferenceTable,
            GenericGovernmentIssueIdForm,
            GenericListInput,
            GenericTrainingTable,
            GenericWorkExperience,
            GenericCivilServiceEligibility,
            GenericEducationalBackgroundTable,
            GenericChildrenInformationTable,
            GenericFamilyForm,
            GenericAddressForm,
            GenericContactForm,
            GenericBenefitForm,
            GenericProfile,
            GenericSubtitle, GenericDesignationSelection, GenericDepartmentSelection, GenericImageInput
        },

        data() {
            return {
                tab: 0,
                form: Object.assign({}, defaultForm),
                defaultForm,
                isLoading: false,
				isPDSGenerationStart: false,
                tabItems
            };
        },

        computed: {
            isFormValid() {
                return this.form.profile.lastName && this.form.profile.firstName && this.form.profile.birthDate && this.form.profile.birthPlace && this.form.profile.sex && this.form.profile.civilStatus && this.form.profile.citizenship.length > 0;
            }
        },

        watch: {
            "$store.state.personalDataSheet.current"(employee) {
                const {employeeNumber, isFullTime, department, designation, profile} = employee;

                const {firstName, middleName, lastName, extension, birthDate, birthPlace, sex, civilStatus, citizenship, bloodType, height, weight, photo, benefit, contact, address, family, education, civilServiceEligibility, workExperiences, voluntaryWorkExperiences, trainings, hobbies, recognitions, organizations, references, governmentIssueId} = profile;

                const {gsisId, pagibigId, sssNumber, tinNumber, philhealthId, agencyEmployeeNumber} = benefit;

                const {telephoneNumber, mobileNumber, emailAddress} = contact;

                const {permanent, residential} = address;

                const {spouse, father, mother, children} = family;

                const {governmentId, issuanceDate, issuancePlace, licenseNumber} = governmentIssueId;

                this.form.employeeNumber = employeeNumber;
                this.form.departmentName = department.name;
                this.form.designationName = designation.name;
                this.form.isFullTime = !!isFullTime;

                this.form.profile.firstName = firstName;
                this.form.profile.middleName = middleName;
                this.form.profile.lastName = lastName;
                this.form.profile.extension = extension;
                this.form.profile.birthDate = birthDate;
                this.form.profile.birthPlace = birthPlace ? birthPlace : "";
                this.form.profile.sex = sex;
                this.form.profile.civilStatus = civilStatus;
                this.form.profile.citizenship = citizenship ? citizenship : [];
                this.form.profile.bloodType = bloodType;
                this.form.profile.height = height;
                this.form.profile.weight = weight;
                this.form.profile.photoPreview = photo.url;

                this.form.profile.benefit.gsisId = gsisId;
                this.form.profile.benefit.pagibigId = pagibigId;
                this.form.profile.benefit.sssNumber = sssNumber;
                this.form.profile.benefit.tinNumber = tinNumber;
                this.form.profile.benefit.philhealthId = philhealthId;
                this.form.profile.benefit.agencyEmployeeNumber = agencyEmployeeNumber;

                this.form.profile.contact.telephoneNumber = telephoneNumber;
                this.form.profile.contact.mobileNumber = mobileNumber;
                this.form.profile.contact.emailAddress = emailAddress;

                this.form.profile.address.permanent.city = permanent.city ? permanent.city : "";
                this.form.profile.address.permanent.province = permanent.province ? permanent.province : "";
                this.form.profile.address.permanent.houseNumber = permanent.houseNumber;
                this.form.profile.address.permanent.street = permanent.street;
                this.form.profile.address.permanent.zipCode = permanent.zipCode;
                this.form.profile.address.permanent.barangay = permanent.barangay;
                this.form.profile.address.permanent.subdivision = permanent.subdivision;
                this.form.profile.address.residential.houseNumber = residential.houseNumber;
                this.form.profile.address.residential.street = residential.street;
                this.form.profile.address.residential.zipCode = residential.zipCode;
                this.form.profile.address.residential.barangay = residential.barangay;
                this.form.profile.address.residential.city = residential.city ? residential.city : "";
                this.form.profile.address.residential.province = residential.province ? residential.province : "";
                this.form.profile.address.residential.subdivision = residential.subdivision;

                this.form.profile.family.spouse.lastName = spouse.lastName;
                this.form.profile.family.spouse.middleName = spouse.middleName;
                this.form.profile.family.spouse.firstName = spouse.firstName;
                this.form.profile.family.spouse.extension = spouse.extension;
                this.form.profile.family.father.lastName = father.lastName;
                this.form.profile.family.father.middleName = father.middleName;
                this.form.profile.family.father.firstName = father.firstName;
                this.form.profile.family.father.extension = father.extension;
                this.form.profile.family.mother.lastName = mother.lastName;
                this.form.profile.family.mother.middleName = mother.middleName;
                this.form.profile.family.mother.firstName = mother.firstName;
                this.form.profile.family.mother.extension = mother.extension;
                this.form.profile.family.children = children ? children : [];

                this.form.profile.education = education ? education : [];

                this.form.profile.civilServiceEligibility = civilServiceEligibility ? civilServiceEligibility : [];

                this.form.profile.workExperiences = workExperiences ? workExperiences : [];

                this.form.profile.voluntaryWorkExperiences = voluntaryWorkExperiences ? voluntaryWorkExperiences : [];

                this.form.profile.trainings = trainings ? trainings : [];

                this.form.profile.hobbies = hobbies ? hobbies : [];
                this.form.profile.recognitions = recognitions ? recognitions : [];
                this.form.profile.organizations = organizations ? organizations : [];

                this.form.profile.references = references ? references : [];

                this.form.profile.governmentIssueId.governmentId = governmentId ? governmentId : "";
                this.form.profile.governmentIssueId.licenseNumber = licenseNumber ? licenseNumber : "";
                this.form.profile.governmentIssueId.issuanceDate = issuanceDate ? issuanceDate : "";
                this.form.profile.governmentIssueId.issuancePlace = issuancePlace ? issuancePlace : "";
            },

            "$store.state.action.name"(name) {
                if (name === updatePersonalDataSheet) {
                    this.$store.commit(setActionName, "");
                    this.isLoading = false;
                    return;
                }

                if (name === generatePersonalDataSheet) {
                    this.$store.commit(setActionName, "");
                    this.isPDSGenerationStart = false;
                }
            }
        },

        methods: {
            update() {
                this.isLoading = true;
                this.$store.dispatch(updatePersonalDataSheet, this.form.profile);
            },

            generatePersonalDataSheetForm() {
                this.isPDSGenerationStart = true;
                const lastName = this.form.profile.lastName;
                this.$store.dispatch(generatePersonalDataSheet, lastName);
            }
        },

        created() {
            this.$store.dispatch(getPersonalDataSheet);
        },

        destroyed() {
            this.$store.commit(setActionName, "");
        }
    };
</script>

