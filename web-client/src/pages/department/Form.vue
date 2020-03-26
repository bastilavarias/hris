<template>
	<v-card>
		<v-card-title>
			<generic-back-button title="Department Details" class-name="mb-5"></generic-back-button>
		</v-card-title>
		<v-card-text>
			<v-row>
				<v-col cols="12">
					<v-text-field label="Name" v-model="form.name" outlined :error="hasError(error.name)"
								  :error-messages="error.name"></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-text-field label="Description" v-model="form.description" outlined></v-text-field>
				</v-col>
			</v-row>
			<generic-form-action-button :operation="operation" :create="create" :update="update"
										:disabled="!isFormValid"
										:is-loading="isLoading"></generic-form-action-button>
		</v-card-text>
	</v-card>
</template>

<script>
    import GenericCardBackButton from "../../components/generic/CardBackButton";
    import {
        createDepartment,
        getSingleDepartment,
        setDepartmentError,
        setDepartments,
        updateDepartment
    } from "../../store/types/department";
    import {setActionName} from "../../store/types/action";
    import GenericFormActionButton from "../../components/generic/FormActionButton";
    import GenericCollegeSelection from "../../components/selection/College";
    import GenericBackButton from "../../components/generic/BackButton";
    import customUtilities from "../../services/customUtilities";

    const defaultForm = {
        name: "",
        description: "",
        employeeId: null
    };

    export default {
        components: {
            GenericBackButton,
            GenericCollegeSelection, GenericFormActionButton, GenericCardBackButton
        },

        data() {
            return {
                form: Object.assign({}, defaultForm),
                defaultForm,
                operation: "create",
                isLoading: false
            };
        },

        mixins: [customUtilities],

        computed: {
            isFormValid() {
                return this.form.name;
            },

            error() {
                return this.$store.state.department.error;
            },

            colleges() {
                return this.$store.state.college.list;
            },
        },

        watch: {
            "$store.state.action.name"(name) {
                if (name === `${createDepartment}-error`) {
                    this.$store.commit(setActionName, "");
                    this.isLoading = false;
                    return;
                }

                if (name === createDepartment) {
                    this.form = Object.assign({}, this.defaultForm);
                    this.$store.commit(setDepartmentError, []);
                    this.$store.commit(setActionName, "");
                    this.isLoading = false;
                    return;
                }

                if (name === `${updateDepartment}-error`) {
                    this.$store.commit(setActionName, "");
                    this.isLoading = false;
                    return;
                }

                if (name === updateDepartment) {
                    this.form = Object.assign({}, this.defaultForm);
                    this.$store.commit(setDepartmentError, []);
                    this.$store.commit(setActionName, "");
                    this.$router.push({name: "department-list"});
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
            this.$store.commit(setDepartmentError, []);
            this.$store.commit(setActionName, "");
        }
    };
</script>