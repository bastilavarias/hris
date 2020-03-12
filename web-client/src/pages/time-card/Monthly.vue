<template>
	<v-card>
		<v-card-title>
			<span class="font-weight-bold">Monthly Time Card</span>
		</v-card-title>
		<v-card-subtitle>This module is for HR</v-card-subtitle>
		<v-data-table hide-default-footer :headers="tableHeaders">
			<template v-slot:top>
				<v-card-text>
					<v-row dense>
						<v-col cols="12" md="3">
							<v-text-field label="Employee No." solo></v-text-field>
						</v-col>
						<v-col cols="12" md="4">
							<v-text-field label="Last Name" solo></v-text-field>
						</v-col>
						<v-col cols="12" md="3">
							<v-select label="Month" solo readonly></v-select>
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
	const tableHeaders = [
		{
		    text: "Date",
			value: "date",
			align: "left"
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
        name: "monthly-time-card",

		data() {
            return {
                tableHeaders
			}
		}
    };
</script>