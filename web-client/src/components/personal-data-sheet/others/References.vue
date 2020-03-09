<template>
	<v-card>
		<v-card-title>
			References
			<div class="flex-grow-1"></div>
			<references-add-information-dialog :dialog.sync="dialog"></references-add-information-dialog>
		</v-card-title>
		<v-card-subtitle class="red--text">Person not related by consanguinity or affinity to applicant/appointee</v-card-subtitle>
		<v-data-table hide-default-footer :headers="tableHeaders"></v-data-table>
	</v-card>
</template>

<script>
	import ReferencesAddInformationDialog from "./ReferencesAddInformationDialog";
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
	    name: "personal-data-sheet-references",
        components: {ReferencesAddInformationDialog},
        data() {
	        return {
	            tableHeaders,
				dialog: false
			}
		}
	}
</script>