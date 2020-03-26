<template>
	<div>
		<generic-back-button class-name="mb-5" title="Employee Form"></generic-back-button>
		<generic-subtitle>Work Information</generic-subtitle>
		<v-row dense>
			<v-col cols="12">
				<v-text-field placeholder="XX-XXXX-XXXX" label="Employee Number" outlined
							  v-model="form.employeeNumber"
							  :error="hasError(error.employeeNumber)" :error-messages="error.employeeNumber"
							  append-outer-icon="mdi-refresh" @click:append-outer="generateEmployeeNumber"
				></v-text-field>
			</v-col>
			<v-col cols="12" md="8">
				<generic-department-selection :department-id.sync="form.departmentId" label="Department"
											  outlined></generic-department-selection>
			</v-col>
			<v-col cols="12" md="4">
				<generic-designation-selection :designation-id.sync="form.designationId" label="Designation"
											   outlined></generic-designation-selection>
			</v-col>
			<v-col cols="12">
				<v-radio-group label="Work Status" row v-model="form.isFullTime">
					<v-radio labe	l="Full Time" :value="true"></v-radio>
					<v-radio label="Part Time" :value="false"></v-radio>
				</v-radio-group>
			</v-col>
			<v-col cols="12">
				<generic-subtitle>Profile</generic-subtitle>
				<generic-form-profile-with-image-input :first-name.sync="form.profile.firstName"
													   :middle-name.sync="form.profile.middleName"
													   :last-name.sync="form.profile.lastName"
													   :photo.sync="form.profile.photo"
													   :extension.sync="form.profile.extension"
													   :birth-date.sync="form.profile.birthDate"
													   :birth-place.sync="form.profile.birthPlace"
													   :sex.sync="form.profile.sex"
													   :civil-status.sync="form.profile.civilStatus"
													   :citizenship.sync="form.profile.citizenship"
													   :blood-type.sync="form.profile.bloodType"
													   :height.sync="form.profile.height"
													   :weight.sync="form.profile.weight"
				></generic-form-profile-with-image-input>
			</v-col>
			<v-col cols="12">
				<v-btn :loading="isLoading" color="primary" @click="create" block :disabled="!isFormValid">Save</v-btn>
			</v-col>
		</v-row>
	</div>
</template>

<script>
    import {createEmployee, generateEmployeeNumber, setEmployeeError, setEmployees} from "../../store/types/employee";
    import {setActionName} from "../../store/types/action";
    import {getAllDesignations} from "../../store/types/designation";
    import {getAllDepartments} from "../../store/types/department";
    import GenericDepartmentSelection from "../../components/selection/Department";
    import GenericDesignationSelection from "../../components/selection/Designation";
    import customUtilities from "../../services/customUtilities";
    import GenericBackButton from "../../components/generic/BackButton";
    import GenericFormProfileWithImageInput from "../../components/form/ProfileWithImageInput";
    import GenericUpButton from "../../components/generic/UpButton";
    import GenericSubtitle from "../../components/generic/Subtitle";

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
            birthDate: "",
            birthPlace: "",
            sex: "",
            civilStatus: "",
            citizenship: [],
            bloodType: "",
            height: 0,
            weight: 0
        }
    };

    export default {
        components: {
            GenericSubtitle,
            GenericUpButton,
            GenericFormProfileWithImageInput,
            GenericBackButton,
            GenericDesignationSelection,
            GenericDepartmentSelection
        },

        data() {
            return {
                form: Object.assign({}, defaultForm),
                defaultForm,
                operation: "create",
                isLoading: false,
                tab: 0
            };
        },

        mixins: [customUtilities],

        computed: {
            isFormValid() {
                return this.form.departmentId && this.form.designationId && this.form.profile.lastName && this.form.profile.firstName && this.form.profile.birthDate && this.form.profile.birthPlace && this.form.profile.sex && this.form.profile.civilStatus && this.form.profile.citizenship.length > 0;

            },

            error() {
                return this.$store.state.employee.error;
            },

            generatedEmployeeNumber() {
                return this.$store.state.employee.employeeNumber;
            }
        },

        watch: {
            "$store.state.action.name"(name) {
                if (name === `${createEmployee}-error`) {
                    this.$vuetify.goTo(0);
                    this.$store.commit(setActionName, "");
                    this.isLoading = false;
                    return;
                }

                if (name === createEmployee) {
                    this.$store.commit(setEmployeeError, {});
                    this.$store.commit(setActionName, "");
                    this.$store.dispatch(generateEmployeeNumber);
                    this.isLoading = false;
                    this.clearForm();
                }
            },

            "$store.state.employee.current"(employee) {
                if (Object.keys(employee).length <= 0) return this.$router.push({name: "employee-management"});
                this.form.code = employee.code;
                this.form.name = employee.name;
                this.form.description = employee.description;
                this.form.collegeId = employee.college.id;
                this.isLoading = false;
            }
        },

        methods: {
            clearForm() {
                this.form.employeeNumber = "";
                this.form.departmentId = null;
                this.form.designationId = null;
                this.form.isFullTime = true;
                this.form.profile.lastName = "";
                this.form.profile.middleName = "";
                this.form.profile.firstName = "";
                this.form.profile.extension = "";
                this.form.profile.photo = null;
                this.form.profile.birthDate = null;
                this.form.profile.birthPlace = "";
                this.form.profile.sex = "";
                this.form.profile.civilStatus = "";
                this.form.profile.citizenship = [];
                this.form.profile.bloodType = "";
                this.form.profile.height = 0;
                this.form.profile.weight = 0;
            },

            create() {
                this.$store.dispatch(createEmployee, this.form);
                this.isLoading = true;
            },

            generateEmployeeNumber() {
                this.form.employeeNumber = this.generatedEmployeeNumber;
            }
        },

        created() {
            this.$store.dispatch(getAllDepartments);
            this.$store.dispatch(getAllDesignations);
            this.$store.dispatch(generateEmployeeNumber);
        },

        destroyed() {
            this.$store.commit(setEmployees, []);
            this.$store.commit(setEmployeeError, {});
            this.$store.commit(setActionName, "");
        }
    };
</script>