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
								<v-col cols="12" md="10">
									<v-text-field label="License Title" outlined></v-text-field>
								</v-col>
								<v-col cols="12" md="2">
									<v-text-field label="Rating" outlined></v-text-field>
								</v-col>
								<v-col cols="12" md="4">
									<generic-date-input label="Examination Date" outlined></generic-date-input>
								</v-col>
								<v-col cols="12" md="8">
									<v-text-field label="Examination Place" outlined></v-text-field>
								</v-col>
								<v-col cols="12" md="8">
									<v-text-field label="License Number" outlined></v-text-field>
								</v-col>
								<v-col cols="12" md="4">
									<generic-date-input label="Validity Date" outlined></generic-date-input>
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
            text: "License Title"
        },
        {
            text: "Rating"
        },
        {
            text: "Examination Date"
        },
        {
            text: "Examination Place"
        },
        {
            text: "License Number"
        },
        {
            text: "Validity Date"
        },
        {
            text: "Actions",
            align: "right"
        }
    ];

    export default {
        name: "generic-civil-service-eligibility",
        components: {GenericDateInput},
        data() {
            return {
                dialog: false,
                tableHeaders
            };
        }
    };
</script>