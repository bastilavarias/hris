<template>
	<div>
		<v-row align="center" dense class="mb-5">
			<v-btn icon class="mr-1">
				<v-icon>mdi-chevron-left</v-icon>
			</v-btn>
			<span class="font-weight-bold" style="font-size: 1.5rem;">Employee Form</span>
		</v-row>
		<generic-form-error-list :errors="errors"></generic-form-error-list>
		<v-tabs v-model="tab">
			<v-tab>Work Information</v-tab>
			<v-tab>Profile</v-tab>
		</v-tabs>
		<v-tabs-items v-model="tab">
			<v-tab-item>
				<v-card-text>
					<v-row dense>
						<v-col cols="12">
							<v-text-field label="Employee Number" outlined></v-text-field>
						</v-col>
						<v-col cols="12" md="8">
							<generic-department-selection :department-id="null" label="Department"
														  outlined></generic-department-selection>
						</v-col>
						<v-col cols="12" md="4">
							<generic-designation-selection :designation-id="null" label="Designation"
														   outlined></generic-designation-selection>
						</v-col>
						<v-col cols="12">
							<v-radio-group label="Work Status" row>
								<v-radio label="Full Time"></v-radio>
								<v-radio label="Part Time"></v-radio>
							</v-radio-group>
						</v-col>
					</v-row>
				</v-card-text>
			</v-tab-item>
			<v-tab-item>
				<v-card-text>
					<v-row dense>
						<v-col cols="12" md="8">
							<v-row dense>
								<v-col cols="10">
									<v-text-field label="Surname" outlined></v-text-field>
								</v-col>
								<v-col cols="2">
									<v-text-field label="Extension" outlined></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field label="Middle Name" outlined></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field label="First Name" outlined></v-text-field>
								</v-col>
							</v-row>
						</v-col>
						<v-col cols="12" md="4">
							<div class="text-center">
								<generic-image-input></generic-image-input>
							</div>
						</v-col>
						<v-col cols="12" md="4">
							<generic-date-input label="Date Of Birth" outlined></generic-date-input>
						</v-col>
						<v-col cols="12" md="8">
							<generic-city-selection outlined :city-id="null" label="Birth Place"></generic-city-selection>
						</v-col>
						<v-col cols="12" md="2">
							<generic-sex-selection outlined :sex-id="null" label="Sex"></generic-sex-selection>
						</v-col>
						<v-col cols="12" md="5">
							<generic-civil-status-selection outlined civil-status-id="null" label="Civil Status"></generic-civil-status-selection>
						</v-col>
						<v-col cols="12" md="5">
							<generic-citizen-selection label="Citizenship(s)" :citizens-id="[]"
													   outlined></generic-citizen-selection>
						</v-col>
						<v-col cols="12" md="6">
							<generic-blood-type-selection outlined :blood-type-id="null" label="Blood Type"></generic-blood-type-selection>
						</v-col>
						<v-col cols="12" md="3">
							<v-text-field type="number" label="Height" suffix="m" outlined></v-text-field>
						</v-col>
						<v-col cols="12" md="3">
							<v-text-field type="number" label="Weight" suffix="kg" outlined></v-text-field>
						</v-col>
					</v-row>
				</v-card-text>
			</v-tab-item>
		</v-tabs-items>
		<generic-form-action-button :operation="operation" :create="create" :update="update"
									:disabled="!isFormValid"
									:is-loading="isLoading"></generic-form-action-button>
	</div>
</template>

<script>
    import GenericCardBackButton from "../../components/generic/CardBackButton";
    import {
        createEmployee,
        getSingleEmployee,
        setEmployeeErrors,
        setEmployees,
        updateEmployee
    } from "../../store/types/employee";
    import {setActionName} from "../../store/types/action";
    import GenericFormErrorList from "../../components/generic/FormErrorList";
    import GenericFormActionButton from "../../components/generic/FormActionButton";
    import GenericCollegeSelection from "../../components/generic/selection/College";
    import GenericImageInput from "../../components/generic/PhotoInput";
    import PersonalDataSheetWorkInformation from "../../components/personal-data-sheet/WorkInformation";
    import PersonalDataSheetProfile from "../../components/personal-data-sheet/personal-information/Profile";
    import {getAllDesignations} from "../../store/types/designation";
    import {getAllDepartments} from "../../store/types/department";
    import GenericDepartmentSelection from "../../components/generic/selection/Department";
    import GenericDesignationSelection from "../../components/generic/selection/Designation";
    import GenericDateInput from "../../components/generic/DateInput";
    import GenericCitizenSelection from "../../components/generic/selection/Citizen";
    import GenericCitySelection from "../../components/generic/selection/City";
    import GenericSexSelection from "../../components/generic/selection/Sex";
    import GenericCivilStatusSelection from "../../components/generic/selection/CivilStatus";
    import GenericBloodTypeSelection from "../../components/generic/selection/BloodType";

    const defaultForm = {
        employeeNumber: "",
        departmentId: "",
        designationId: "",
        workStatus: "",
        profile: {
            surname: ""
        }
    };

    const bloodTypes = [
        "O+",
        "O-",
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
    ];

    export default {
        components: {
            GenericBloodTypeSelection,
            GenericCivilStatusSelection,
            GenericSexSelection,
            GenericCitySelection,
            GenericCitizenSelection,
            GenericDateInput,
            GenericDesignationSelection,
            GenericDepartmentSelection,
            PersonalDataSheetProfile,
            PersonalDataSheetWorkInformation,
            GenericImageInput,
            GenericCollegeSelection, GenericFormActionButton, GenericFormErrorList, GenericCardBackButton
        },

        data() {
            return {
                form: Object.assign({}, defaultForm),
                defaultForm,
                operation: "create",
                isLoading: false,
                tab: 1,
                bloodTypes
            };
        },

        computed: {
            isFormValid() {
                return true;
            },

            errors() {
                return this.$store.state.employee.errors;
            }
        },

        watch: {
            "$store.state.action.name"(name) {
                if (name === `${createEmployee}-errors`) {
                    this.$store.commit(setActionName, "");
                    this.isLoading = false;
                    return;
                }

                if (name === createEmployee) {
                    this.form = Object.assign({}, this.defaultForm);
                    this.$store.commit(setEmployeeErrors, []);
                    this.$store.commit(setActionName, "");
                    this.isLoading = false;
                    return;
                }

                if (name === `${updateEmployee}-errors`) {
                    this.$store.commit(setActionName, "");
                    this.isLoading = false;
                    return;
                }

                if (name === updateEmployee) {
                    this.form = Object.assign({}, this.defaultForm);
                    this.$store.commit(setEmployeeErrors, []);
                    this.$store.commit(setActionName, "");
                    this.$router.push({name: "employee-management"});
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
            create() {
                this.$store.dispatch(createEmployee, this.form);
                // this.isLoading = true;
            },

            update() {
                const employeeId = this.$route.params.employeeId;
                this.$store.dispatch(updateEmployee, {
                    employeeId,
                    details: this.form
                });
                this.isLoading = true;
            }
        },

        created() {
            this.$store.dispatch(getAllDepartments);
            this.$store.dispatch(getAllDesignations);
            const operation = this.$route.params.operation;
            if (operation === "update") {
                const employeeId = this.$route.params.employeeId;
                this.operation = operation;
                this.$store.dispatch(getSingleEmployee, employeeId);
                this.isLoading = true;
            }
        },

        destroyed() {
            this.$store.commit(setEmployees, []);
            this.$store.commit(setEmployeeErrors, []);
            this.$store.commit(setActionName, "");
        }
    };
</script>