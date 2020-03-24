<template>
	<v-card>
		<v-card-title>
			<span class="font-weight-bold">Employee Management</span>
			<div class="flex-grow-1"></div>
			<generic-tooltip-button icon="plus" color="primary" title="Create New Employee"
									:to="{name: 'employee-create-form', params: {operation: 'create'}}"></generic-tooltip-button>
		</v-card-title>
		<v-data-table :headers="tableHeaders" :items="employees" :loading="isLoading">
			<template v-slot:top>
				<v-card-text>
					<generic-search-toolbar :search-options="searchOptions" :search-option.sync="searchOption"
											:search-value.sync="searchValue"
											:action="search"></generic-search-toolbar>
				</v-card-text>
			</template>
			<template v-slot:item.employeeNumber="{item}">
				<span class="font-weight-bold text-uppercase">{{item.employeeNumber}}</span>
			</template>
			<template v-slot:item.name="{item}">
				<span class="text-capitalize">
					{{currentUser.id === item.id ? "You" : `${item.profile.firstName} ${item.profile.middleName ? getTextFirstLetter(item.profile.middleName) : ""}. ${item.profile.lastName}`}}
				</span>
			</template>
			<template v-slot:item.department="{item}">
				<span class="text-capitalize">{{item.department ? item.department.name : "N/A"}}</span>
			</template>
			<template v-slot:item.designation="{item}">
				<span class="text-capitalize">{{item.designation ? item.designation.name : "N/A"}}</span>
			</template>
			<template v-slot:item.status="{item}">
				<v-chip small :color="item.isDeleted ? 'error' : 'success'">{{item.isDeleted ? "Disabled" : "Active"}}
				</v-chip>
			</template>
			<template v-slot:item.actions="{item}">
				<v-btn icon @click="view(item)">
					<v-icon>mdi-eye</v-icon>
				</v-btn>
			</template>
		</v-data-table>
	</v-card>
</template>

<script>
    import GenericSearchToolbar from "../../components/generic/SearchToolbar";
    import GenericTooltipButton from "../../components/generic/TooltipButton";
    import {getAllEmployees, searchEmployees, setEmployeeError, setEmployees} from "../../store/types/employee";
    import {setActionName} from "../../store/types/action";
    import GenericConfirmDialog from "../../components/generic/CustomDialog";
    import customUtilities from "../../services/customUtilities";

    const tableHeaders = [
        {
            text: "Employee Number",
            value: "employeeNumber",
            align: "left"
        },
        {
            text: "Name",
            value: "name"
        },
        {
            text: "Department",
            value: "department"
        },
        {
            text: "Designation",
            value: "designation"
        },
        {
            text: "Status",
            value: "status"
        },
        {
            text: "Actions",
            value: "actions"
        }
    ];
    const searchOptions = [
        "all",
        "employee number",
        "last name"
    ];

    export default {
        components: {GenericConfirmDialog, GenericTooltipButton, GenericSearchToolbar},

        data() {
            return {
                searchOptions,
                tableHeaders,
                isLoading: false,
                searchOption: "all",
                searchValue: "",
            };
        },

        mixins: [customUtilities],

        computed: {
            employees() {
                return this.$store.state.employee.list;
            },

            currentUser() {
                return this.$store.state.account.user;
            }
        },

        watch: {
            "$store.state.action.name"(name) {
                if (name === getAllEmployees || searchEmployees) {
                    this.isLoading = false;
                    this.$store.commit(setActionName, "");
                }
            },

            searchOption(opt) {
                if (opt === "all") return this.$store.dispatch(getAllEmployees);
            }
        },

        methods: {
            search() {
                this.isLoading = true;
                if (this.searchOption === "all") return this.$store.dispatch(getAllEmployees);
                if (this.searchValue.trim() && ["employee number", "last name"].includes(this.searchOption)) {
                    const searchConfig = {
                        option: this.searchOption,
                        value: this.searchValue
                    };
                    return this.$store.dispatch(searchEmployees, searchConfig);
                }
                this.isLoading = false;
                return this.$store.commit(setEmployees, []);
            },

            view({id}) {
                const isSameUser = id === this.currentUser.id;
                if (isSameUser) {
                    this.$router.push({name: "personal-data-sheet"});
                    return;
                }
                this.$router.push(
                    {
                        name: "employee-update-form",
                        params: {
                            employeeId: id
                        }
                    }
                );
            }
        },

        destroyed() {
            this.$store.commit(setEmployees, []);
            this.$store.commit(setEmployeeError, {});
            this.$store.commit(setActionName, "");
        }
    };
</script>