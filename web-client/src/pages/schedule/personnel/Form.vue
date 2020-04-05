<template>
	<v-card>
		<v-card-title>
			<generic-card-back-button title="Employee Schedule Tagger"></generic-card-back-button>
		</v-card-title>
		<v-data-table :headers="tableHeaders">
			<template v-slot:top>
				<v-card-text>
					<v-row dense>
						<v-col cols="12" md="2">
							<v-select label="Search By" solo></v-select>
						</v-col>
						<v-col cols="12" md="4">
							<v-text-field label="Search" solo></v-text-field>
						</v-col>
						<v-col cols="12" md="2">
							<generic-date-input solo label="From"></generic-date-input>
						</v-col>
						<v-col cols="12" md="2">
							<generic-date-input solo label="To"></generic-date-input>
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
				<v-col cols="12" md="6">
					<v-select label="Month" solo></v-select>
				</v-col>
				<v-col cols="12" md="3">
					<generic-time-picker :time="null" label="Start Time" solo></generic-time-picker>
				</v-col>
				<v-col cols="12" md="3">
					<generic-time-picker :time="null" label="End Time" solo></generic-time-picker>
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
    import moment from "moment";
    import GenericSearchToolbar from "../../../components/generic/SearchToolbar";

    const searchOptions = [
        {
            id: 0,
            name: "Employee Number"
        },
        {
            id: 1,
            name: "Last Name"
        }
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

    export default {
        components: {GenericSearchToolbar, GenericTimePicker, GenericDateInput, GenericCardBackButton},

        data() {
            return {
                isAddScheduleDialogShow: false,
                isSearchEmployeeDialogShow: false,
                date: null,
                searchOptions,
                selectedSearchOption: 0,
                tableHeaders
            };
        }
    };
</script>