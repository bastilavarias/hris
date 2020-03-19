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
							<span>Education Details</span>
						</v-card-title>
						<v-card-text>
							<v-row dense>
								<v-col cols="12" md="4">
									<v-select label="Level" outlined></v-select>
								</v-col>
								<v-col cols="12" md="8">
									<v-text-field label="School Name" outlined></v-text-field>
								</v-col>
								<v-col cols="12" md="6">
									<v-text-field label="Education/Degree/Course" outlined></v-text-field>
								</v-col>
								<v-col cols="12" md="3">
									<v-select label="From" outlined></v-select>
								</v-col>
								<v-col cols="12" md="3">
									<v-select label="To" outlined></v-select>
								</v-col>
								<v-col cols="12" md="9">
									<v-text-field label="Highest Level/Unit Earned" outlined></v-text-field>
								</v-col>
								<v-col cols="12" md="3">
									<v-select label="Year Graduated" outlined></v-select>
								</v-col>
								<v-col cols="12" md="12">
									<v-text-field label="Scholarship/Academic Honors" outlined></v-text-field>
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
            text: "Level",
            align: "left"
        },
        {
            text: "School Name"
        },
        {
            text: "Education"
        },
        {
            text: "Span"
        },
        {
            text: "Unit Earned"
        },
        {
            text: "Year Graduated"
        },
        {
            text: "Honors"
        },
        {
            text: "Actions",
            align: "right"
        }
    ];

    export default {
        name: "generic-educational-background-table",
        data() {
            return {
                tableHeaders,
                dialog: false
            };
        }
    };
</script>