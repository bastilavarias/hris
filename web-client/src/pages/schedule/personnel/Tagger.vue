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
				v-if="isPersonnelScheduleSearchStart"
		></v-skeleton-loader>
		<v-data-table v-model="selectedScheduleList" :headers="tableHeaders" :items="personnelSchedule" show-select
					  v-else>
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
							<v-btn color="primary" large block @click="searchSchedule"
								   :disabled="!isSearchScheduleFormValid">
								<span class="mr-1">Search</span>
								<v-icon>mdi-database-search</v-icon>
							</v-btn>
						</v-col>
					</v-row>
					<v-row justify="end" align="center">
						<div class="mr-3">
							<v-dialog v-model="isUpdateDialogShow" max-width="350">
								<template v-slot:activator="{ on }">
									<v-btn fab color="secondary" small
										   class="mr-2" :disabled="!hasSelectedSchedule" v-on="on">
										<v-icon>mdi-pencil</v-icon>
									</v-btn>
								</template>
								<v-card>
									<v-card-title>Change Time Details</v-card-title>
									<v-card-text>
										<v-row dense>
											<v-col cols="12">
												<v-text-field readonly outlined label="Selected Date"
															  :value="getSelectedScheduleDateRange"></v-text-field>
											</v-col>
											<v-col cols="12">
												<generic-time-picker :time.sync="selectedStartTime" label="Start Time"
																	 outlined></generic-time-picker>
											</v-col>
											<v-col cols="12">
												<generic-time-picker :time.sync="selectedEndTime" label="End Time"
																	 outlined></generic-time-picker>
											</v-col>
										</v-row>
									</v-card-text>
									<v-card-actions>
										<v-spacer></v-spacer>
										<v-btn color="black" text @click="isUpdateDialogShow = false">Close</v-btn>
										<v-btn color="secondary" @click="updateSchedule" :disabled="!isUpdateFormValid"
											   :loading="isPersonnelScheduleOperationStart">
											Submit
										</v-btn>
									</v-card-actions>
								</v-card>
							</v-dialog>
							<v-btn fab color="error" small @click="isDeleteDialogShow = true" :disabled="!hasSelectedSchedule">
								<v-icon>mdi-trash-can</v-icon>
							</v-btn>
						</div>
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
				   :loading="isPersonnelTaggingStart">Submit
			</v-btn>
		</v-card-actions>
		<generic-confirm-dialog :is-show.sync="isDeleteDialogShow"
								message="Are you sure you want to delete this schedule?"
								color="secondary"
								:is-loading="isPersonnelScheduleOperationStart"
								:action="deleteSchedule"></generic-confirm-dialog>
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
        createPersonnelSchedule, deletePersonnelSchedule,
        searchPersonnelSchedule,
        setPersonnelSchedule,
        updatePersonnelSchedule
    } from "../../../store/types/schedule";
    import {setActionName} from "../../../store/types/action";
    import customUtilities from "../../../services/customUtilities";
    import GenericConfirmDialog from "../../../components/generic/CustomDialog";

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
            GenericConfirmDialog,
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
                isPersonnelTaggingStart: false,
                isPersonnelScheduleSearchStart: false,
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
                years,
                selectedScheduleList: [],
                isUpdateDialogShow: false,
				isDeleteDialogShow: false,
                selectedStartTime: null,
                selectedEndTime: null,
                isPersonnelScheduleOperationStart: false
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

            isUpdateFormValid() {
                return this.selectedStartTime && this.selectedEndTime;
            },

            isSearchScheduleFormValid() {
                return this.fromDate && this.toDate;
            },

            hasEmployeeSelected() {
                return Object.keys(this.selectedEmployee).length === 0;
            },

            hasSelectedSchedule() {
                return this.selectedScheduleList.length > 0;
            },

            personnelSchedule() {
                return this.$store.state.schedule.personnelSchedule;
            },

            getSelectedScheduleDateRange() {
                const scheduleList = this.selectedScheduleList;
                const listLength = scheduleList.length;
                if (listLength === 0) return "";
                if (listLength === 1) return this.formatDate(scheduleList[0].date);
                return `${this.formatDate(scheduleList[0].date)} - ${this.formatDate(scheduleList[listLength - 1].date)}`;
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
                    this.isPersonnelTaggingStart = false;
                    this.$store.commit(setActionName, "");
                    this.clearForm();
                    return;
                }

                if (name === searchPersonnelSchedule) {
                    this.isPersonnelScheduleSearchStart = false;
                    this.$store.commit(setActionName, "");
                    return;
                }

                if (name === updatePersonnelSchedule) {
                    this.$store.commit(setActionName, "");
                    this.isUpdateDialogShow = false;
                    this.isPersonnelScheduleOperationStart = false;
                    this.resetAllFields();
                    return;
                }

                if (name === deletePersonnelSchedule) {
                    this.$store.commit(setActionName, "");
                    this.isPersonnelScheduleOperationStart = false;
                    this.isDeleteDialogShow = false;
                    this.resetAllFields();
                }
            }
        },

        methods: {
            tagNewSchedule() {
                const params = {
                    employeeId: this.selectedEmployee.id,
                    ...this.form
                };
                this.isPersonnelTaggingStart = true;
                this.$store.dispatch(createPersonnelSchedule, params);
            },

            searchSchedule() {
                const params = {
                    employeeId: this.selectedEmployee.id,
                    fromDate: this.fromDate,
                    toDate: this.toDate
                };
                this.isPersonnelScheduleSearchStart = true;
                this.$store.dispatch(searchPersonnelSchedule, params);
            },

            updateSchedule() {
                const params = {
                    employeeId: this.selectedEmployee.id,
                    scheduleIdList: this.selectedScheduleList.map(schedule => schedule.id),
                    startTime: this.selectedStartTime,
                    endTime: this.selectedEndTime
                };
                this.isPersonnelScheduleOperationStart = true;
                this.$store.dispatch(updatePersonnelSchedule, params);
            },

			deleteSchedule() {
                const params = {
                    employeeId: this.selectedEmployee.id,
                    scheduleIdList: this.selectedScheduleList.map(schedule => schedule.id)
                };
                this.isPersonnelScheduleOperationStart = true;
                this.$store.dispatch(deletePersonnelSchedule, params);
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
                this.selectedStartTime = null;
                this.selectedEndTime = null;
                this.selectedScheduleList = [];
            }
        }
    };
</script>