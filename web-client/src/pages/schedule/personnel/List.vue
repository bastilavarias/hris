<template>
	<v-card>
		<v-card-title>
			<span class="font-weight-bold">Personnel Schedule List</span>
			<div class="flex-grow-1"></div>
			<generic-tooltip-button icon="plus" color="primary" title="Create New Schedule"
									:to="{name: 'schedule-personnel-form', params: {operation: 'create'}}"></generic-tooltip-button>
		</v-card-title>
		<v-data-table hide-default-footer :headers="tableHeaders" :items="[]">
			<template v-slot:item.actions="{item}">
				<v-btn icon color="secondary">
					<v-icon>mdi-pencil</v-icon>
				</v-btn>
			</template>
		</v-data-table>
	</v-card>
</template>

<script>
    import GenericTooltipButton from "../../../components/generic/TooltipButton";

    const tableHeaders = [
        {
            text: "Section",
            value: "section"
        },
        {
            text: "Subject",
            value: "subject"
        },
        {
            text: "Units",
            value: "units"
        },
        {
            text: "Personnel",
            value: "personnel"
        },
        {
            text: "Day & Time",
            value: "dayTime"
        },
        {
            text: "Room",
            value: "room"
        },
        {
            text: "Actions",
            value: "actions", align: "right"
        }
    ];

    export default {
        name: "personnel-schedule-manager",
        components: {GenericTooltipButton},

        data() {
            return {
                tableHeaders
            };
        }
    };
</script>