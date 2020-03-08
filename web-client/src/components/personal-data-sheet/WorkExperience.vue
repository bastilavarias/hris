<template>
	<div>
		<v-card-title>
			Work Experience
			<div class="flex-grow-1"></div>
			<work-experience-add-information-dialog :dialog.sync="dialog"></work-experience-add-information-dialog>
		</v-card-title>
		<v-card-text>
			<v-data-table hide-default-footer :headers="tableHeaders"></v-data-table>
		</v-card-text>
	</div>
</template>

<script>
	import WorkExperienceAddInformationDialog from "./WorkExperienceAddInformationDialog";

	const tableHeaders = [
		{
		    text: "Position Title"
		},
		{
		    text: "Company"
		},
		{
		    text: "From"
		},
		{
		    text: "To"
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
		    text: "Appointment Status"
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