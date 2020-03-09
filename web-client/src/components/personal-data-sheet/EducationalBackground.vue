<template>
	<v-card>
		<v-card-title>
			Educational Background
			<div class="flex-grow-1"></div>
			<educational-background-add-information-dialog
					:dialog.sync="dialog"></educational-background-add-information-dialog>
		</v-card-title>
		<v-card-text>
			<v-data-table hide-default-footer :headers="tableHeaders"></v-data-table>
		</v-card-text>
	</v-card>
</template>


<script>

    import EducationalBackgroundAddInformationDialog from "./EducationalBackgroundAddInformationDialog";

    const tableHeaders = [
        {
            text: "Level"
        },
        {
            text: "School Name"
        },
        {
            text: "Education/Degree/Course"
        },
        {
            text: "From"
        },
        {
            text: "To"
        },
        {
            text: "Highest Level/Unit Earned"
        },
        {
            text: "Year Graduated"
        },
        {
            text: "Scholarship/Academic Honors"
        },
        {
            text: "Actions",
            align: "right"
        }
    ];

    export default {
        name: "personal-data-sheet-educational-background",
        components: {EducationalBackgroundAddInformationDialog},
        data() {
            return {
                tableHeaders,
                dialog: false
            };
        }
    };
</script>