<template>
	<v-card>
		<generic-card-back-button title="Department Information"></generic-card-back-button>
		<v-card-text>
			<generic-form-error-list :errors="errors"></generic-form-error-list>
			<v-row>
				<v-col cols="12">
					<v-text-field label="Name" v-model="form.name"></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-text-field label="Description" v-model="form.description"></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-autocomplete label="Head" v-model="form.employeeId"></v-autocomplete>
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
        createDepartment,
        getSingleDepartment,
        setDepartmentErrors,
        setDepartments,
        updateDepartment
    } from "../../store/types/department";
    import {setActionName} from "../../store/types/action";
    import GenericFormErrorList from "../../components/generic/FormErrorList";
    import GenericFormActionButton from "../../components/generic/FormActionButton";
    import GenericCollegeSelection from "../../components/generic/CollegeSelection";

    const defaultForm = {
        name: "",
        description: "",
		employeeId: null
    };

    export default {
        components: {GenericCollegeSelection, GenericFormActionButton, GenericFormErrorList, GenericCardBackButton},

        data() {
            return {
                form: Object.assign({}, defaultForm),
                defaultForm,
                operation: "create",
                isLoading: false
            };
        },

        computed: {
            isFormValid() {
                return this.form.name;
            },

            errors() {
                return this.$store.state.department.errors;
            },

            colleges() {
                return this.$store.state.college.list;
            },
        },

        watch: {
            "$store.state.action.name"(name) {
                if (name === `${createDepartment}-errors`) {
                    this.$store.commit(setActionName, "");
                    this.isLoading = false;
                    return;
                }

                if (name === createDepartment) {
                    this.form = Object.assign({}, this.defaultForm);
                    this.$store.commit(setDepartmentErrors, []);
                    this.$store.commit(setActionName, "");
                    this.isLoading = false;
                    return;
                }

                if (name === `${updateDepartment}-errors`) {
                    this.$store.commit(setActionName, "");
                    this.isLoading = false;
                    return;
                }

                if (name === updateDepartment) {
                    this.form = Object.assign({}, this.defaultForm);
                    this.$store.commit(setDepartmentErrors, []);
                    this.$store.commit(setActionName, "");
                    this.$router.push({name: "department-management"});
                }
            },

            "$store.state.department.current"(department) {
                if (Object.keys(department).length <= 0) return this.$router.push({name: "department-list"});
                this.form.name = department.name;
                this.form.description = department.description;
                this.isLoading = false;
            }
        },

        methods: {
            create() {
                this.$store.dispatch(createDepartment, this.form);
                this.isLoading = true;
            },

            update() {
                const departmentId = this.$route.params.departmentId;
                this.$store.dispatch(updateDepartment, {
                    departmentId,
                    details: this.form
                });
                this.isLoading = true;
            }
        },

        created() {
            const operation = this.$route.params.operation;
            if (operation === "update") {
                const departmentId = this.$route.params.departmentId;
                this.operation = operation;
                this.$store.dispatch(getSingleDepartment, departmentId);
                this.isLoading = true;
            }
        },

        destroyed() {
            this.$store.commit(setDepartments, []);
            this.$store.commit(setDepartmentErrors, []);
            this.$store.commit(setActionName, "");
        }
    };
</script>