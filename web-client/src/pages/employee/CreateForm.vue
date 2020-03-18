<template>
	<v-card>
		<generic-card-back-button title="Employee Form"></generic-card-back-button>
		<v-card-text>
			<generic-form-error-list :errors="errors"></generic-form-error-list>
			<v-row>
				<v-col cols="12" md="4" class="text-center">
					<generic-image-input></generic-image-input>
				</v-col>
				<v-col cols="12" md="8">
					<v-tabs v-model="tab" fixed-tabs>
						<v-tab>Work Information</v-tab>
						<v-tab>Profile</v-tab>
					</v-tabs>
					<v-tabs-items v-model="tab">
						<v-tab-item>
							<personal-data-sheet-work-information></personal-data-sheet-work-information>
						</v-tab-item>
						<v-tab-item>
							<personal-data-sheet-profile></personal-data-sheet-profile>
						</v-tab-item>
					</v-tabs-items>
				</v-col>
			</v-row>
		</v-card-text>
		<generic-form-action-button :operation="operation" :create="create" :update="update"
		<generic-form-action-button :operation="operation" :create="create" :update="update"
									:disabled="!isFormValid"
									:is-loading="isLoading"></generic-form-action-button>
	</v-card>
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
    import GenericCollegeSelection from "../../components/generic/CollegeSelection";
    import GenericImageInput from "../../components/generic/ImageInput";
    import PersonalDataSheetWorkInformation from "../../components/personal-data-sheet/WorkInformation";
    import PersonalDataSheetProfile from "../../components/personal-data-sheet/personal-information/Profile";
    import {getAllDesignations} from "../../store/types/designation";

    const defaultForm = {
        code: "",
        name: "",
        description: "",
        collegeId: ""
    };

    export default {
        components: {
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
                tab: 0
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