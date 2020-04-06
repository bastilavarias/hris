<template>
	<v-card>
		<v-card-title class="font-weight-bold">
			Employee Schedule Tagger
			<div class="flex-grow-1"></div>
			<v-btn fab color="error" small @click="resetAllFields">
				<v-icon>mdi-refresh</v-icon>
			</v-btn>
		</v-card-title>
		<v-skeleton-loader
				boilerplate
				loading
				type="table"
				tile
				class="mx-auto"
				v-if="isEmployeeScheduleSearchStart"
		></v-skeleton-loader>
		<v-data-table :headers="tableHeaders" :items="personnelSchedule" v-else>
			<template v-slot:top>
				<v-card-text>
					<v-row dense>
						<v-col cols="12" md="6">
							<generic-employee-autocomplete label="Search" solo
														   :employee.sync="selectedEmployee"
														   :search-options.sync="searchOptions"
														   :search-value.sync="searchValue"
														   :search-option.sync="searchOption"
														   :is-loading="isEmployeeListSearchStart"
														   :employees="employeesLocal"
														   :search-options-column="4"
														   :search-bar-column="8"
							>

							</generic-employee-autocomplete>
						</v-col>
						<v-col cols="12" md="2">
							<generic-date-input solo label="From" :date.sync="fromDate"
												:disabled="hasEmployeeSelected"></generic-date-input>
						</v-col>
						<v-col cols="12" md="2">
							<generic-date-input solo label="To" :date.sync="toDate"
												:disabled="hasEmployeeSelected"></generic-date-input>
						</v-col>
						<v-col cols="12" md="2">
							<v-btn color="primary" large block @click="searchSchedule" :disabled="!isSearchScheduleFormValid">
								<span class="mr-1">Search</span>
								<v-icon>mdi-database-search</v-icon>
							</v-btn>
						</v-col>
					</v-row>
				</v-card-text>
			</template>
			<template v-slot:item.date="{item}">
				<span class="text-capitalize">{{formatDate(item.date)}}</span>
			</template>
			<template v-slot:item.startTime="{item}">
				<span class="text-capitalize">{{convertMilitaryTime(item.startTime)}}</span>
			</template>
			<template v-slot:item.endTime="{item}">
				<span class="text-capitalize">{{convertMilitaryTime(item.endTime)}}</span>
			</template>
			<template v-slot:item.actions="{item}">
				<v-btn icon>
					<v-icon>mdi-pencil</v-icon>
				</v-btn>
				<v-btn icon>
					<v-icon>mdi-trash-can</v-icon>
				</v-btn>
			</template>
		</v-data-table>
		<v-card-text>
			<span class="v-card__subtitle pl-0 d-block">Tag a New Schedule</span>
			<v-row dense>
				<v-col cols="12" md="8">
					<v-select label="Month" outlined v-model="form.monthNumber" item-text="text" item-value="number"
							  :items="months" :disabled="hasEmployeeSelected"></v-select>
				</v-col>
				<v-col cols="12" md="4">
					<v-select label="Year" outlined v-model="form.year" :items="years"
							  :disabled="hasEmployeeSelected"></v-select>
				</v-col>
				<v-col cols="12" md="6">
					<generic-time-picker :time.sync="form.startTime" label="Start Time" outlined
										 :disabled="hasEmployeeSelected"></generic-time-picker>
				</v-col>
				<v-col cols="12" md="6">
					<generic-time-picker :time.sync="form.endTime" label="End Time" outlined
										 :disabled="hasEmployeeSelected"></generic-time-picker>
				</v-col>
			</v-row>
		</v-card-text>
		<v-card-actions>
			<v-btn color="primary" block @click="tagNewSchedule" :disabled="!isTaggerFormValid"
				   :loading="isEmployeeTaggingStart">Submit
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
    import GenericCardBackButton from "../../../components/generic/CardBackButton";
    import GenericDateInput from "../../../components/generic/DateInput";
    import GenericTimePicker from "../../../components/generic/TimePicker";
    import GenericSearchToolbar from "../../../components/generic/SearchToolbar";
    import {searchEmployees, setEmployees} from "../../../store/types/employee";
    import GenericEmployeeAutocomplete from "../../../components/generic/EmployeeAutocomplete";
    import {
        createPersonnelSchedule,
        searchPersonnelSchedule,
        setPersonnelSchedule
    } from "../../../store/types/schedule";
    import {setActionName} from "../../../store/types/action";
    import customUtilities from "../../../services/customUtilities";

    const months = [
        {
            number: 0,
            text: "January"
        },
        {
            number: 1,
            text: "February"
        },
        {
            number: 2,
            text: "March"
        },
        {
            number: 3,
            text: "April"
        },
        {
            number: 4,
            text: "May"
        },
        {
            number: 5,
            text: "June"
        },
        {
            number: 6,
            text: "July"
        },
        {
            number: 7,
            text: "August"
        },
        {
            number: 8,
            text: "September"
        },
        {
            number: 9,
            text: "October"
        },
        {
            number: 10,
            text: "November"
        },
        {
            number: 11,
            text: "December"
        },
    ];

    const years = [2020, 2021];

    const tableHeaders = [
        {
            text: "Date",
            value: "date",
            align: "left"
        },
        {
            text: "Start Time",
            value: "startTime"
        },
        {
            text: "End Time",
            value: "endTime"
        },
        {
            text: "Actions",
            value: "actions",
            align: "right"
        }
    ];

    const defaultForm = {
        monthNumber: null,
        startTime: null,
        endTime: null,
        year: 2020
    };

    export default {
        components: {
            GenericEmployeeAutocomplete,
            GenericSearchToolbar, GenericTimePicker, GenericDateInput, GenericCardBackButton
        },

        data() {
            return {
                isAddScheduleDialogShow: false,
                isSearchEmployeeDialogShow: false,
                date: null,
                tableHeaders,
                isEmployeeListSearchStart: false,
                isEmployeeTaggingStart: false,
                isEmployeeScheduleSearchStart: false,
                searchValue: "",
                searchOptions: [
                    "employee number",
                    "last name"
                ],
                searchOption: "",
                employeesLocal: [],
                selectedEmployee: {},
                fromDate: null,
                toDate: null,
                form: Object.assign({}, defaultForm),
                defaultForm,
                months,
                years
            };
        },

        mixins: [customUtilities],

        computed: {
            employees() {
                return this.$store.state.employee.list;
            },

            isTaggerFormValid() {
                return this.form.monthNumber && this.form.startTime && this.form.endTime;
            },

            isSearchScheduleFormValid() {
                return this.fromDate && this.toDate;
            },

            hasEmployeeSelected() {
                return Object.keys(this.selectedEmployee).length === 0;
            },

            personnelSchedule() {
                return this.$store.state.schedule.personnelSchedule;
            }
        },

        watch: {
            searchValue(query) {
                this.isEmployeeListSearchStart = true;
                if (query && this.searchOption) {
                    if (query.trim() && ["employee number", "last name"].includes(this.searchOption)) {
                        const searchConfig = {
                            option: this.searchOption,
                            value: query
                        };
                        return this.$store.dispatch(searchEmployees, searchConfig);
                    }
                }
                this.isEmployeeListSearchStart = false;
                return this.$store.commit(setEmployees, []);
            },

            employees(value) {
                this.isEmployeeListSearchStart = false;
                this.employeesLocal = value;
            },

            "$store.state.action.name"(name) {
                if (name === createPersonnelSchedule) {
                    this.isEmployeeTaggingStart = false;
                    this.$store.commit(setActionName, "");
                    this.clearForm();
                    return;
                }

                if (name === searchPersonnelSchedule) {
                    this.isEmployeeScheduleSearchStart = false;
                    this.$store.commit(setActionName, "");
                }
            }
        },

        methods: {
            tagNewSchedule() {
                const params = {
                    employeeId: this.selectedEmployee.id,
                    ...this.form
                };
                this.isEmployeeTaggingStart = true;
                this.$store.dispatch(createPersonnelSchedule, params);
            },

            searchSchedule() {
                const params = {
                    employeeId: this.selectedEmployee.id,
                    fromDate: this.fromDate,
                    toDate: this.toDate
                };
                this.isEmployeeScheduleSearchStart = true;
                this.$store.dispatch(searchPersonnelSchedule, params);
            },

            clearForm() {
                this.form = Object.assign({}, this.defaultForm);
            },

            resetAllFields() {
                this.clearForm();
                this.searchOption = "";
                this.fromDate = null;
                this.toDate = null;
                this.selectedEmployee = Object.assign({}, {});
                this.$store.commit(setPersonnelSchedule, []);
            }
        }
    };
</script>