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
							<span>Reference Information</span>
						</v-card-title>
						<v-card-text>
							<v-row dense>
								<v-col cols="12">
									<v-text-field label="Name" outlined></v-text-field>
								</v-col>
								<v-col cols="12" md="8">
									<v-text-field label="Address" outlined></v-text-field>
								</v-col>
								<v-col cols="12" md="4">
									<v-text-field label="Contact No." outlined></v-text-field>
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
    const tableHeaders = [
        {
            text: "Name"
        },
        {
            text: "Address"
        },
        {
            text: "Contact #"
        }
    ];

    export default {
        name: "generic-reference-table",
        data() {
            return {
                dialog: false,
                tableHeaders
            };
        }
    };
</script>