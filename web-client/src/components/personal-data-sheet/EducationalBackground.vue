<template>
	<v-card>
		<v-card-title>
			Educational Background
			<div class="flex-grow-1"></div>
			<personal-data-sheet-educational-background-add-education-dialog
					:dialog.sync="dialog"></personal-data-sheet-educational-background-add-education-dialog>
		</v-card-title>
		<v-data-table hide-default-footer :headers="tableHeaders"></v-data-table>
	</v-card>
</template>


<script>
    import PersonalDataSheetEducationalBackgroundAddEducationDialog from "./EducationalBackgroundAddEducationDialog";

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
            text: "Actions"
        }
    ];

    export default {
        name: "personal-data-sheet-educational-background",
        components: {PersonalDataSheetEducationalBackgroundAddEducationDialog},
        data() {
            return {
                tableHeaders,
                dialog: false
            };
        }
    };
</script>