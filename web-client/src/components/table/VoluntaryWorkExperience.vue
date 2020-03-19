<template>
	<v-data-table hide-default-footer :headers="tableHeaders">
		<template v-slot:top>
			<v-row no-gutters>
				<div class="flex-grow-1"></div>
				<v-dialog v-model="dialog" max-width="800">
					<template v-slot:activator="{ on }">
						<v-btn color="primary" v-on="on">
							Add Information
						</v-btn>
					</template>
					<v-card>
						<v-card-title>
							<span>License Information</span>
						</v-card-title>
						<v-card-text>
							<v-row dense>
								<v-col cols="12" md="8">
									<v-text-field label="Company" outlined></v-text-field>
								</v-col>
								<v-col cols="12" md="4">
									<v-text-field label="Position" outlined></v-text-field>
								</v-col>
								<v-col cols="12" md="12">
									<v-text-field label="Address" outlined></v-text-field>
								</v-col>
								<v-col cols="12" md="4">
									<generic-date-input label="From" outlined></generic-date-input>
								</v-col>
								<v-col cols="12" md="4">
									<generic-date-input label="To" outlined></generic-date-input>
								</v-col>
								<v-col cols="12" md="4">
									<v-text-field type="number" label="Number Of Hours" hint="Estimate" outlined></v-text-field>
								</v-col>
							</v-row>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn text @click="dialog = false">Cancel</v-btn>
							<v-btn color="primary">Save</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-row>
		</template>
	</v-data-table>
</template>

<script>
    import GenericDateInput from "../generic/DateInput";
    const tableHeaders = [
        {
            text: "Organization",
			align: "left"
        },
        {
            text: "Address"
        },
        {
            text: "Span"
        },
        {
            text: "Number Of Hours"
        },
        {
            text: "Position"
        },
        {text: "Actions", align: "right"}
    ];


    export default {
        name: "generic-voluntary-work-experience",
        components: {GenericDateInput},
        data() {
            return {
                dialog: false,
                tableHeaders
            };
        }
    };
</script>