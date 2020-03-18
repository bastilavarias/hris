<template>
	<div>
		<v-row align="center" dense class="mb-5">
			<v-btn icon class="mr-1">
				<v-icon>mdi-chevron-left</v-icon>
			</v-btn>
			<span class="font-weight-bold" style="font-size: 1.5rem;">Employee Form</span>
		</v-row>
		<v-tabs v-model="tab">
			<v-tab>Work Information</v-tab>
			<v-tab>Profile</v-tab>
		</v-tabs>
		<v-tabs-items v-model="tab">
			<v-tab-item>
				<v-card-text>
					<v-row dense>
						<v-col cols="12">
							<v-text-field label="Employee Number" outlined v-model="form.employeeNumber"
										  :error="hasError(error.employeeNumber)"
										  :error-messages="error.employeeNumber"></v-text-field>
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
								<v-radio label="Full Time" :value="true"></v-radio>
								<v-radio label="Part Time" :value="false"></v-radio>
							</v-radio-group>
						</v-col>
					</v-row>
				</v-card-text>
			</v-tab-item>
			<v-tab-item>
				<v-card-text>
					<generic-form-profile :first-name.sync="form.profile.firstName"
										  :middle-name.sync="form.profile.middleName"
										  :last-name.sync="form.profile.lastName" :photo.sync="form.profile.photo"
										  :extension.sync="form.profile.extension"
										  :birth-date.sync="form.profile.birthDate"
										  :birth-place.sync="form.profile.birthPlace"
										  :sex.sync="form.profile.sex" :civil-status.sync="form.profile.civilStatus"
										  :citizenship.sync="form.profile.citizenship"
										  :blood-type.sync="form.profile.bloodType"
										  :height.sync="form.profile.height" :weight.sync="form.profile.weight"
					></generic-form-profile>
				</v-card-text>
			</v-tab-item>
		</v-tabs-items>
		<generic-form-action-button :operation="operation" :create="create" :update="update"
									:disabled="!isFormValid"
									:is-loading="isLoading"></generic-form-action-button>
	</div>
</template>

<script>
    import {
        createEmployee,
        getSingleEmployee,
        setEmployeeError,
        setEmployees,
        updateEmployee
    } from "../../store/types/employee";
    import {setActionName} from "../../store/types/action";
    import GenericFormActionButton from "../../components/generic/FormActionButton";
    import {getAllDesignations} from "../../store/types/designation";
    import {getAllDepartments} from "../../store/types/department";
    import GenericDepartmentSelection from "../../components/selection/Department";
    import GenericDesignationSelection from "../../components/selection/Designation";
    import GenericFormProfile from "../../components/form/Profile";
    import customUtilities from "../../services/customUtilities";

    const defaultForm = {
        employeeNumber: "",
        departmentId: "",
        designationId: "",
        isFullTime: null,
        profile: {
            firstName: "",
            middleName: "",
            lastName: "",
            extension: "",
            photo: "",
            birthDate: null,
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
            GenericFormProfile,
            GenericDesignationSelection,
            GenericDepartmentSelection,
            GenericFormActionButton
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
                return true;
            },

            error() {
                return this.$store.state.employee.error;
            }
        },

        watch: {
            "$store.state.action.name"(name) {
                if (name === `${createEmployee}-error`) {
                    this.tab = 0;
                    this.$vuetify.goTo(0);
                    this.$store.commit(setActionName, "");
                    this.isLoading = false;
                    return;
                }

                if (name === createEmployee) {
                    this.$store.commit(setEmployeeError, {});
                    this.$store.commit(setActionName, "");
                    this.isLoading = false;
                    this.clearForm();
                    return;
                }

                if (name === `${updateEmployee}-errors`) {
                    this.$store.commit(setActionName, "");
                    this.isLoading = false;
                    return;
                }

                if (name === updateEmployee) {
                    this.form = Object.assign({}, this.defaultForm);
                    this.$store.commit(setEmployeeError, []);
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
            clearForm() {
                this.form.employeeNumber = "";
                this.form.departmentId = null;
                this.form.designationId = null;
                this.form.isFullTime = null;
                this.form.profile.lastName = "";
                this.form.profile.middleName = "";
                this.form.profile.firstName = "";
                this.form.profile.extension = "";
                this.form.profile.photo = "";
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
            this.$store.commit(setEmployeeError, []);
            this.$store.commit(setActionName, "");
        }
    };
</script>