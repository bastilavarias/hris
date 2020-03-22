<template>
	<div style="margin-bottom: 4rem;">
		<generic-back-button title="Employee Form" class-name="mb-5">
			<template v-slot:right>
				<v-btn icon>
					<v-icon>mdi-printer</v-icon>
				</v-btn>
			</template>
		</generic-back-button>
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
						<generic-department-selection label="Department" outlined
													  :department-id.sync="form.departmentId"></generic-department-selection>
					</v-col>
					<v-col cols="12">
						<generic-designation-selection label="Designation" outlined
													   :designation-id.sync="form.designationId"></generic-designation-selection>
					</v-col>
					<v-col cols="12">
						<v-radio-group label="Work Status" v-model="form.isFullTime">
							<v-radio label="Full Time" :value="true"></v-radio>
							<v-radio label="Part Time" :value="false"></v-radio>
						</v-radio-group>
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
							<v-col cols="12" md="12">
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
							<v-col cols="12">
								<generic-subtitle>L & D Interventions / Training Programs Attended</generic-subtitle>
								<generic-training-table :trainings="form.profile.trainings"></generic-training-table>
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
								<generic-subtitle>Related Questions</generic-subtitle>
								<template v-for="n in 5">
									<generic-question-item :key="n"></generic-question-item>
								</template>
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
			</v-col>
		</v-row>
		<v-speed-dial
				v-model="fab"
				bottom
				right
				fixed
				direction="left"
				:open-on-hover="hover"
				:transition="transition"
		>
			<template v-slot:activator>
				<v-btn
						v-model="fab"
						color="primary"
						dark
						fab
				>
					<v-icon v-if="fab">mdi-close</v-icon>
					<v-icon v-else>mdi-account-circle</v-icon>
				</v-btn>
			</template>
			<v-btn
					fab
					dark
					small
					color="blue darken-2"
					@click="$vuetify.goTo(0)"
			>
				<v-icon>mdi-chevron-up</v-icon>
			</v-btn>
			<v-btn
					fab
					dark
					small
					color="secondary"
					@click="update"
			>
				<v-icon>mdi-pencil</v-icon>
			</v-btn>
			<v-btn
					fab
					dark
					small
					color="red"
			>
				<v-icon>mdi-delete</v-icon>
			</v-btn>
		</v-speed-dial>
	</div>
</template>
<script>
    import GenericBackButton from "../../components/generic/BackButton";
    import GenericImageInput from "../../components/generic/PhotoInput";
    import GenericProfile from "../../components/form/Profile";
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
    import GenericListInput from "../../components/generic/ListInput";
    import GenericQuestionItem from "../../components/generic/QuestionItem";
    import GenericReferenceTable from "../../components/table/Reference";
    import GenericTrainingTable from "../../components/table/Training";
    import {getSingleEmployee, updateEmployee} from "../../store/types/employee";
    import GenericDepartmentSelection from "../../components/selection/Department";
    import GenericDesignationSelection from "../../components/selection/Designation";
    import {getAllDepartments} from "../../store/types/department";
    import {getAllDesignations} from "../../store/types/designation";
    import {setActionName} from "../../store/types/action";
    import GenericGovernmentIssueIdForm from "../../components/form/GovernmentIssueId";

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

    export default {
        components: {
            GenericGovernmentIssueIdForm,
            GenericDesignationSelection,
            GenericDepartmentSelection,
            GenericTrainingTable,
            GenericReferenceTable,
            GenericQuestionItem,
            GenericListInput,
            GenericVoluntaryWorkExperience,
            GenericWorkExperience,
            GenericCivilServiceEligibility,
            GenericEducationalBackgroundTable,
            GenericChildrenInformationTable,
            GenericFamilyForm,
            GenericAddressForm,
            GenericContactForm,
            GenericSubtitle,
            GenericBenefitForm, GenericProfile, GenericImageInput, GenericBackButton
        },

        data() {
            return {
                tab: 0,
                form: Object.assign({}, defaultForm),
                defaultForm,
                photoName: "",
                direction: "top",
                fab: false,
                fling: false,
                hover: false,
                tabs: null,
                top: false,
                right: true,
                bottom: true,
                left: false,
                transition: "slide-y-reverse-transition",
            };
        },

        watch: {
            "$store.state.employee.current"(employee) {
                if (Object.keys(employee).length <= 0) return this.$router.push({name: "employee-management"});
                const {employeeNumber, isFullTime, department, designation, profile} = employee;

                const {firstName, middleName, lastName, extension, birthDate, birthPlace, sex, civilStatus, citizenship, bloodType, height, weight, photo, benefit, contact, address, family, education, civilServiceEligibility, workExperiences, voluntaryWorkExperiences, trainings, hobbies, recognitions, organizations, references, govermentIssueId} = profile;

                const {gsisId, pagibigId, sssNumber, tinNumber, philhealthId, agencyEmployeeNumber} = benefit;

                const {telephoneNumber, mobileNumber, emailAddress} = contact;

                const {permanent, residential} = address;

                const {spouse, father, mother, children} = family;

                const {governmentId, issuanceDate, issuancePlace, licenseNumber} = govermentIssueId;

                this.form.employeeNumber = employeeNumber;
                this.form.departmentId = department.id;
                this.form.designationId = designation.id;
                this.form.isFullTime = !!isFullTime;

                this.form.profile.firstName = firstName;
                this.form.profile.middleName = middleName;
                this.form.profile.lastName = lastName;
                this.form.profile.extension = extension;
                this.form.profile.birthDate = birthDate;
                this.form.profile.birthPlace = birthPlace;
                this.form.profile.sex = sex;
                this.form.profile.civilStatus = civilStatus;
                this.form.profile.citizenship = citizenship;
                this.form.profile.bloodType = bloodType;
                this.form.profile.height = height;
                this.form.profile.weight = weight;
                this.form.profile.photoPreview = photo;

                this.form.profile.benefit.gsisId = gsisId;
                this.form.profile.benefit.pagibigId = pagibigId;
                this.form.profile.benefit.sssNumber = sssNumber;
                this.form.profile.benefit.tinNumber = tinNumber;
                this.form.profile.benefit.philhealthId = philhealthId;
                this.form.profile.benefit.agencyEmployeeNumber = agencyEmployeeNumber;

                this.form.profile.contact.telephoneNumber = telephoneNumber;
                this.form.profile.contact.mobileNumber = mobileNumber;
                this.form.profile.contact.emailAddress = emailAddress;

                this.form.profile.address.permanent.city = permanent.city;
                this.form.profile.address.permanent.province = permanent.province;
                this.form.profile.address.permanent.houseNumber = permanent.houseNumber;
                this.form.profile.address.permanent.street = permanent.street;
                this.form.profile.address.permanent.zipCode = permanent.zipCode;
                this.form.profile.address.permanent.barangay = permanent.barangay;
                this.form.profile.address.permanent.subdivision = permanent.subdivision;
                this.form.profile.address.residential.houseNumber = residential.houseNumber;
                this.form.profile.address.residential.street = residential.street;
                this.form.profile.address.residential.zipCode = residential.zipCode;
                this.form.profile.address.residential.barangay = residential.barangay;
                this.form.profile.address.residential.city = residential.city;
                this.form.profile.address.residential.province = residential.province;
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
            }
        },

        methods: {
            update() {
                const employeeId = this.$route.params.employeeId;
                this.$store.dispatch(updateEmployee, {employeeId, ...this.form});
            }
        },

        created() {
            const employeeId = this.$route.params.employeeId;
            this.$store.dispatch(getSingleEmployee, employeeId);
            this.$store.dispatch(getAllDepartments);
            this.$store.dispatch(getAllDesignations);
        },

        destroyed() {
            this.$store.commit(setActionName, "");
        }
    };
</script>