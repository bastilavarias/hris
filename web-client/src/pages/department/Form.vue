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
				<v-col cols="12">
					<v-autocomplete v-model="form.selectedDepartmentHead" label="Department Head" outlined
									:search-input.sync="form.employeeLastName" :items="employeesLocal"
									:loading="isEmployeeListSearchStart" return-object item-text="profile.lastName" :filter="() => true" cache-items>
						<template v-slot:item="{item}">
							<v-list-item-content>
								<v-list-item-subtitle class="text-uppercase font-weight-bold">
									{{item.employeeNumber}}
								</v-list-item-subtitle>
								<v-list-item-title class="text-capitalize">
									{{item.profile.firstName}}
									{{getTextFirstLetter(item.profile.middleName)}}.
									{{item.profile.lastName}}
								</v-list-item-title>
								<v-list-item-subtitle class="text-capitalize">
									{{item.department.name}}
								</v-list-item-subtitle>
							</v-list-item-content>
						</template>
						<template v-slot:selection="{item}">
							<span class="text-capitalize">
								{{item.profile.firstName}}
								{{getTextFirstLetter(item.profile.middleName)}}.
								{{item.profile.lastName}}
							</span>
						</template>
					</v-autocomplete>
				</v-col>
			</v-row>
		</v-card-text>
		<v-card-actions>
			<generic-form-action-button :operation="operation" :create="create" :update="update"
										:disabled="!isFormValid"
										:is-loading="isLoading"></generic-form-action-button>
		</v-card-actions>
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
    import {searchEmployees, setEmployees} from "../../store/types/employee";

    const defaultForm = {
        name: "",
        description: "",
        selectedDepartmentHead: null,
        employeeLastName: ""
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
                isLoading: false,
                isEmployeeListSearchStart: false,
				employeesLocal: []
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

            employees() {
                return this.$store.state.employee.list;
            }
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
                    this.$store.commit(setDepartmentError, {});
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
                    this.$store.commit(setDepartmentError, {});
                    this.$store.commit(setActionName, "");
                    this.$router.push({name: "department-list"});
                    return;
                }

                if (name === searchEmployees) {
                    this.isEmployeeListSearchStart = false;
                    this.$store.commit(setActionName, "");
                }
            },

            "$store.state.department.current"(department) {
                if (Object.keys(department).length <= 0) return this.$router.push({name: "department-list"});
                this.form.name = department.name;
                this.form.description = department.description;
                if (department.head) {
                    this.employeesLocal.push(department.head);
                    this.form.selectedDepartmentHead = department.head;
				}
                this.isLoading = false;
            },

            "form.employeeLastName"(lastName) {
                this.isEmployeeListSearchStart = true;
                if (lastName) {
                    const searchConfig = {
                        option: "last name",
                        value: lastName
                    };
                    return this.$store.dispatch(searchEmployees, searchConfig);
                }
                this.isEmployeeListSearchStart = false;
                this.$store.commit(setEmployees, []);
            },

			"$store.state.employee.list"(employees) {
                this.employeesLocal = employees;
			}
        },

        methods: {
            create() {
                const {name, description, selectedDepartmentHead} = this.form;

                this.$store.dispatch(createDepartment, {
                    name, description, employeeId: selectedDepartmentHead.id
                });
                this.isLoading = true;
            },

            update() {
                const departmentId = this.$route.params.departmentId;
                const {name, description, selectedDepartmentHead} = this.form;
                this.$store.dispatch(updateDepartment, {
                    departmentId,
                    details: {
                        name, description, employeeId: selectedDepartmentHead.id
					}
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
            this.$store.commit(setDepartmentError, {});
            this.$store.commit(setActionName, "");
        }
    };
</script>