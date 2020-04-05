<template>
	<v-card>
		<v-card-title class="font-weight-bold">
			Employee Schedule Tagger
		</v-card-title>
		<v-data-table :headers="tableHeaders">
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
							<generic-date-input solo label="From" :date.sync="fromDate"></generic-date-input>
						</v-col>
						<v-col cols="12" md="2">
							<generic-date-input solo label="To" :date.sync="toDate"></generic-date-input>
						</v-col>
						<v-col cols="12" md="2">
							<v-btn color="primary" large block>
								<span class="mr-1">Search</span>
								<v-icon>mdi-database-search</v-icon>
							</v-btn>
						</v-col>
					</v-row>
				</v-card-text>
			</template>
		</v-data-table>
		<v-card-text>
			<span class="v-card__subtitle pl-0 d-block">Tag a New Schedule</span>
			<v-row dense>
				<v-col cols="12" md="8">
					<v-select label="Month" outlined v-model="form.monthNumber" item-text="text" item-value="number"></v-select>
				</v-col>
				<v-col cols="12" md="4">
					<v-select label="Year" outlined readonly></v-select>
				</v-col>
				<v-col cols="12" md="6">
					<generic-time-picker :time.sync="form.startTime" label="Start Time" outlined></generic-time-picker>
				</v-col>
				<v-col cols="12" md="6">
					<generic-time-picker :time.sync="form.endTime" label="End Time" outlined></generic-time-picker>
				</v-col>
			</v-row>
		</v-card-text>
		<v-card-actions>
			<v-btn color="primary" block>Submit</v-btn>
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
            text: "February"
        },
    ];

    const tableHeaders = [
        {
            text: "Date",
            value: "date",
            align: "left"
        },
        {
            text: "Time In",
            value: "time In"
        },
        {
            text: "Time Out",
            value: "timeOut"
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
        endTime: null
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
                defaultForm
            };
        },

        computed: {
            employees() {
                return this.$store.state.employee.list;
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
            }
        }
    };
</script>