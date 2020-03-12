<template>
	<v-card>
		<v-card-title>
			<span class="font-weight-bold">Daily Time Card</span>
		</v-card-title>
		<v-card-subtitle>This module is for HR</v-card-subtitle>
		<v-data-table hide-default-footer :headers="tableHeaders">
			<template v-slot:top>
				<v-card-text>
					<v-row dense>
						<v-col cols="12" md="4">
							<generic-date-input solo label="Date"></generic-date-input>
						</v-col>
						<v-col cols="12" md="6">
							<v-autocomplete label="Department" solo readonly></v-autocomplete>
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
		<v-card-actions>
			<v-btn color="primary" block>Submit</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
    import GenericDateInput from "../../components/generic/DateInput";
    const tableHeaders = [
        {
            text: "Name",
            value: "name",
            align: "left"
        },
        {
            text: "Date",
            value: "date",
        },
        {
            text: "Time In",
            value: "timeIn",
        },
        {
            text: "Time Out",
            value: "timeOut",
        },
        {
            text: "Action",
            value: "action",
            align: "right"
        }
    ];

    export default {
        name: "daily-time-card",
        components: {GenericDateInput},
        data() {
            return {
                tableHeaders
            }
        }
    };
</script>