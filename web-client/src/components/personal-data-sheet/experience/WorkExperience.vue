<template>
	<v-card>
		<v-card-title>
			Work Experience
			<div class="flex-grow-1"></div>
			<work-experience-add-information-dialog :dialog.sync="dialog"></work-experience-add-information-dialog>
		</v-card-title>
		<v-data-table hide-default-footer :headers="tableHeaders"></v-data-table>
	</v-card>
</template>

<script>
	import WorkExperienceAddInformationDialog from "./WorkExperienceAddInformationDialog";

	const tableHeaders = [
		{
		    text: "Designation",
			align: "left"
		},
		{
		    text: "Company"
		},
		{
		    text: "Span"
		},
		{
		    text: "Salary Grade"
		},
		{
		    text: "Step Increment"
		},
        {
            text: "Monthly Salary"
        },
        {
		    text: "Appointment"
		},
		{
		    text: "Government Service"
		},
        {text: "Actions", align: "right"}
    ];

    export default {
	    name: "personal-data-sheet-work-experience",
        components: {WorkExperienceAddInformationDialog},

		data() {
	        return {
	            dialog: false,
				tableHeaders
			}
		}
    }
</script>