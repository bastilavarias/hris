<template>
	<v-card>
		<v-card-title>
			Voluntary Work Experience
			<div class="flex-grow-1"></div>
			<voluntary-work-experience-add-information-dialog :dialog.sync="dialog"></voluntary-work-experience-add-information-dialog>
		</v-card-title>
		<v-data-table hide-default-footer :headers="tableHeaders"></v-data-table>
	</v-card>
</template>

<script>
	import VoluntaryWorkExperienceAddInformationDialog from "./VoluntaryWorkExperienceAddInformationDialog";
    const tableHeaders = [
		{
		    text: "Organization"
		},
		{
		    text: "Address"
		},
		{
		    text: "From"
		},
		{
		    text: "To"
		},
		{
		    text: "Number Of Hours"
		},
		{
		    text: "Position/Work Nature"
		},
		{text: "Actions", align: "right"}
	];

	export default {
        name: "personal-data-sheet-voluntary-work-experience",
        components: {VoluntaryWorkExperienceAddInformationDialog},
        data() {
            return {
                dialog: false,
				tableHeaders
			}
		}
    }
</script>