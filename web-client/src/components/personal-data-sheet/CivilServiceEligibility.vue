<template>
	<v-card>
		<v-card-title>
			Civil Service Eligibility
			<div class="flex-grow-1"></div>
			<civil-service-eligibility-add-information-dialog
					:dialog.sync="dialog"></civil-service-eligibility-add-information-dialog>
		</v-card-title>
		<v-card-text>
			<v-data-table hide-default-footer :headers="tableHeaders"></v-data-table>
		</v-card-text>
	</v-card>
</template>

<script>
    import CivilServiceEligibilityAddInformationDialog from "./CivilServiceEligibilityAddInformationDialog";

    const tableHeaders = [
        {
            text: "License Title"
        },
        {
            text: "Rating"
        },
        {
            text: "Examination Date"
        },
        {
            text: "Examination Place"
        },
        {
            text: "License Number"
        },
        {
            text: "Validity Date"
        },
        {
            text: "Actions",
            align: "right"
        }
    ];

    export default {
        name: "personal-data-sheet-civil-service-eligibility",
        components: {CivilServiceEligibilityAddInformationDialog},

        data() {
            return {
                dialog: false,
                tableHeaders
            };
        }
    };
</script>