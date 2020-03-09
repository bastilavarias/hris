<template>
	<v-card>
		<v-card-title>
			Training Programs
			<div class="flex-grow-1"></div>
			<training-programs-details-add-child-information-dialog :dialog="dialog"></training-programs-details-add-child-information-dialog>
		</v-card-title>
		<v-card-text>
			<v-data-table hide-default-footer :headers="tableHeaders"></v-data-table>
		</v-card-text>
	</v-card>
</template>

<script>
	import TrainingProgramsDetailsAddChildInformationDialog from "./TrainingProgramsDetailsAddInformationDialog";
    const tableHeaders = [
		{
		    text: "Program Title"
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
		    text: "Type Of LD"
		},
		{
		    text: "Sponsors"
		}
	];

	export default {
	    name: "personal-data-sheet-training-programs-details",
        components: {TrainingProgramsDetailsAddChildInformationDialog},
        data() {
	        return {
	            tableHeaders,
				dialog: false
			}
		}
	}
</script>