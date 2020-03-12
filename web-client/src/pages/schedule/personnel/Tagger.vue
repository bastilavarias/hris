<template>
	<v-card>
		<v-card-title>
			<div class="font-weight-bold">Personnel Schedule Tagger</div>
		</v-card-title>
		<v-data-table hide-default-footer :headers="tableHeaders" :items="[]">
			<template v-slot:top>
				<v-card-text>
					<v-row dense>
						<v-col cols="12" md="3">
							<v-select solo :items="searchOptions" item-value="id" item-text="name"
									  v-model="selectedSearchOption" label="Search By"></v-select>
						</v-col>
						<v-col cols="12" md="5">
							<v-text-field solo label="Search"></v-text-field>
						</v-col>
						<v-col cols="12" md="2">
							<v-select solo label="Month"></v-select>
						</v-col>
						<v-col cols="12" md="2">
							<v-btn color="primary" large block>
								<span class="mr-1">Search</span>
								<v-icon>mdi-database-search</v-icon>
							</v-btn>
						</v-col>
					</v-row>
					<v-card-subtitle style="padding-left: 0;">
						Change month and time to the table
					</v-card-subtitle>
					<v-row dense>
						<v-col cols="12" md="2">
							<v-select solo label="Month"></v-select>
						</v-col>
						<v-col cols="12" md="2">
							<generic-time-picker label="Time In" :time="null" solo></generic-time-picker>
						</v-col>
						<v-col cols="12" md="2">
							<generic-time-picker label="Time Out" :time="null" solo></generic-time-picker>
						</v-col>
						<v-col cols="12" md="2">
							<v-btn icon large>
								<v-icon>mdi-rotate-3d-variant</v-icon>
							</v-btn>
						</v-col>
					</v-row>
				</v-card-text>
			</template>
			<template v-slot:item.actions="{item}">
				<v-btn icon color="secondary">
					<v-icon>mdi-pencil</v-icon>
				</v-btn>
			</template>
		</v-data-table>
		<v-card-actions>
			<v-row dense>
				<v-col cols="12" md="4">
					<v-btn color="error" block>Clear</v-btn>
				</v-col>
				<v-col cols="12" md="8">
					<v-btn color="primary" block>Submit</v-btn>
				</v-col>
			</v-row>
		</v-card-actions>
	</v-card>
</template>

<script>
    import GenericCardBackButton from "../../../components/generic/CardBackButton";
    import GenericDateInput from "../../../components/generic/DateInput";
    import GenericTimePicker from "../../../components/generic/TimePicker";

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
        name: "personnel-schedule-tagger",
        components: {GenericTimePicker, GenericDateInput, GenericCardBackButton},

        data() {
            return {
                date: null,
                searchOptions,
                selectedSearchOption: 0,
                tableHeaders
            };
        }
    };
</script>