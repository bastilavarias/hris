<template>
	<v-card>
		<v-card-title>
			<span class="font-weight-bold">Employee Management</span>
		</v-card-title>
		<v-data-table hide-default-footer :headers="tableHeaders" :items="[]">
			<template v-slot:top>
				<v-card-text>
<!--					<generic-search-toolbar :search-options="searchOptions"></generic-search-toolbar>-->
				</v-card-text>
			</template>
			<template v-slot:item.actions="{item}">
				<v-btn icon>
					<v-icon>mdi-pencil</v-icon>
				</v-btn>
				<v-btn icon>
					<v-icon>mdi-trashcan</v-icon>
				</v-btn>
				<v-btn icon>
					<v-icon>mdi-printer</v-icon>
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
            text: "Employee Number",
            value: "name",
			align: "left"
        },
        {
            text: "Name",
            value: "name"
        },
        {
            text: "Department",
            value: "departments"
        },
        {
            text: "Actions",
            value: "actions",
			align: "right"
        }
    ];
    const searchOptions = [
        {
            id: 0,
            name: "All"
        },
        {
            id: 1,
            name: "Employee Number"
        },
        {
            id: 2,
            name: "Last Name"
        },
        {
            id: 3,
            name: "Department"
        }
    ];

    export default {
        name: "employee-manager",
        components: {GenericTooltipButton, GenericSearchToolbar},

        data() {
            return {
                searchOptions,
                tableHeaders,
            };
        }
    };
</script>