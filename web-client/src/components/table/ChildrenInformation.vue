<template>
	<div>
		<v-data-table hide-default-footer :headers="tableHeaders">
			<template v-slot:top>
				<v-row no-gutters>
					<div class="flex-grow-1"></div>
					<v-dialog v-model="dialog" max-width="500">
						<template v-slot:activator="{ on }">
							<v-btn small color="primary" v-on="on">
								Add Child Information
							</v-btn>
						</template>
						<v-card>
							<v-card-title>
								<span>Child Information</span>
							</v-card-title>
							<v-card-text>
								<v-row dense>
									<v-col cols="12">
										<v-text-field label="Name" outlined></v-text-field>
									</v-col>
									<v-col cols="12">
										<generic-date-input label="Birth Date" outlined></generic-date-input>
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
	</div>
</template>

<script>
    import GenericDateInput from "../generic/DateInput";
    const tableHeaders = [
        {
            text: "Name"
        },
        {
            text: "Birth Date"
        },
        {
            text: "Actions",
            align: "right"
        }
    ];

    export default {
        name: "generic-children-information-table",
        components: {GenericDateInput},
        data() {
            return {
                tableHeaders,
				dialog: false
			}
		}
    };
</script>