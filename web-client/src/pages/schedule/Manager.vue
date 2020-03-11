<template>
	<v-card>
		<v-card-title>
			<span class="font-weight-bold">Schedule Manager</span>
			<div class="flex-grow-1"></div>
			<generic-tooltip-button icon="plus" color="primary" title="Create New Schedule"
									:to="{name: 'schedule-form', params: {operation: 'create'}}"></generic-tooltip-button>
		</v-card-title>
		<v-data-table hide-default-footer :headers="tableHeaders" :items="[]">
			<template v-slot:top>
				<v-card-text>
					<v-chip color="primary" label class="mr-1">Semester: Second Semester</v-chip>
					<v-chip color="primary" label>Academic Year: 2020</v-chip>
					<div class="mb-2"></div>
					<v-row dense>
						<v-col cols="12" md="4">
							<v-autocomplete label="Section" solo></v-autocomplete>
						</v-col>
						<v-col cols="12" md="6">
							<v-autocomplete label="Subject" solo></v-autocomplete>
						</v-col>
						<v-col cols="12" md="2">
							<v-btn color="primary" large block>
								<span class="mr-1">Process</span>
								<v-icon>mdi-database-search</v-icon>
							</v-btn>
						</v-col>
					</v-row>
				</v-card-text>
			</template>
			<template v-slot:item.actions="{item}">
				<v-btn icon color="secondary">
					<v-icon>mdi-pencil</v-icon>
				</v-btn>
			</template>
		</v-data-table>
	</v-card>
</template>

<script>
    import GenericTooltipButton from "../../components/generic/TooltipButton";

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
            text: "Faculty",
            value: "faculty"
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
            value: "actions"
        }
    ];

    export default {
        name: "schedule-manager",
        components: {GenericTooltipButton},

        data() {
            return {
                tableHeaders
            };
        }
    };
</script>