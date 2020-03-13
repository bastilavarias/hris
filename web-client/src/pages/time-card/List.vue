<template>
	<v-card>
		<v-card-title>
			<span class="font-weight-bold">Time Card Management</span>
			<div class="flex-grow-1"></div>
			<generic-tooltip-button icon="plus" color="primary" title="Create Employee Time Card"
									:to="{name: 'time-card-management-form-daily'}"></generic-tooltip-button>
		</v-card-title>
		<v-data-table hide-default-footer :headers="tableHeaders"></v-data-table>
	</v-card>
</template>
<script>
    import GenericTooltipButton from "../../components/generic/TooltipButton";

    const tableHeaders = [
		{
		    text: "Date",
			align: "left"
		},
		{
		    text: "Name"
		},
		{
		    text: "Position"
		},
		{
		    text: "Approved By",
			align: "right"
		}
	];

    export default {
        components: {GenericTooltipButton},
		data() {
            return {
                tableHeaders
			}
		}
    };
</script>