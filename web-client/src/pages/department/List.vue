<template>
	<v-card>
		<v-card-title>
			<span class="font-weight-bold">Department List</span>
			<div class="flex-grow-1"></div>
			<generic-tooltip-button icon="plus" color="primary" title="Create New Department"
									:to="{name: 'department-form', params: {operation: 'create'}}"></generic-tooltip-button>
		</v-card-title>
		<v-data-table hide-default-footer :headers="tableHeaders" :items="[]">
			<template v-slot:top>
				<v-card-text>
					<generic-search-toolbar :search-options="searchOptions"></generic-search-toolbar>
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
    import GenericSearchToolbar from "../../components/generic/SearchToolbar";
    import GenericTooltipButton from "../../components/generic/TooltipButton";
    const tableHeaders = [
        {
            text: "Name",
            value: "name"
        },
        {
            text: "Description",
            value: "description"
        },
        {
            text: "College",
            value: "college"
        },
        {
            text: "Actions",
            value: "actions", align: "right"
        }
    ];
    const searchOptions = [
        {
            id: 0,
            name: "All"
        },
        {
            id: 1,
            name: "Name"
        }
    ];

    export default {
        name: "department-manager",
        components: {GenericTooltipButton, GenericSearchToolbar},

        data() {
            return {
                searchOptions,
                tableHeaders,
            }
        }
    }
</script>