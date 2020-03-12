<template>
	<v-card>
		<v-card-title>
			<span class="font-weight-bold">Your Final Teaching Assignment List</span>
			<div class="flex-grow-1"></div>
			<generic-tooltip-button icon="plus" color="primary" title="Create New FTA"
									:to="{name: 'final-teaching-assignment-faculty-form', params: {operation: 'create'}}"></generic-tooltip-button>
		</v-card-title>
		<v-data-table hide-default-footer :headers="tableHeaders" :items="[]">
			<template v-slot:top>
				<v-card-text>
					<v-row dense>
						<v-col cols="12" md="5">
							<v-autocomplete label="Academic Year" solo></v-autocomplete>
						</v-col>
						<v-col cols="12" md="4">
							<v-select label="Semester" solo></v-select>
						</v-col>
						<v-col cols="12" md="1">
							<v-text-field label="All" solo disabled></v-text-field>
						</v-col>
						<v-col cols="12" md="2">
							<v-btn color="primary" large block>
								<span class="mr-1">Search</span>
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

    import GenericSearchToolbar from "../../../components/generic/SearchToolbar";
    import GenericTooltipButton from "../../../components/generic/TooltipButton";
    const tableHeaders = [
        {
            text: "Date Issued",
            align: "left"
        },
        {
            text: "AY & Semester"
        },
        {
            text: "Version"
        },
        {
            text: "Actions",
            value: "actions",
            align: "right"
        }
    ];

    export default {
        name: "final-teaching-assignment-faculty-list",
        components: {GenericTooltipButton, GenericSearchToolbar},

        data() {
            return {
                tableHeaders
            };
        }
    };
</script>