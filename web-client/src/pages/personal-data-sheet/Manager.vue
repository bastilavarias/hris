<template>
	<v-card>
		<v-card-title>
			<span class="font-weight-bold">Personal Data Sheet Manager</span>
			<div class="flex-grow-1"></div>
			<generic-tooltip-button icon="plus" color="primary" title="Create New PDS"
									:to="{name: 'personal-data-sheet-form', params: {operation: 'create'}}"></generic-tooltip-button>
		</v-card-title>
		<v-data-table hide-default-footer :headers="tableHeaders" :items="dummyData">
			<template v-slot:top>
				<v-card-text>
					<generic-search-toolbar :search-options="searchOptions"></generic-search-toolbar>
				</v-card-text>
			</template>
			<template v-slot:item.employeeNumber="{item}">
				<span class="font-weight-bold text-uppercase">{{item.employeeNumber}}</span>
			</template>
			<template v-slot:item.name="{item}">
				<span class="text-capitalize">{{item.name}}</span>
			</template>
			<template v-slot:item.position="{item}">
				<span class="text-capitalize">{{item.position}}</span>
			</template>
			<template v-slot:item.college="{item}">
				<span class="text-uppercase font-weight-bold">{{item.college}}</span>
			</template>
			<template v-slot:item.action="{item}">
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
            text: "Employee Number",
            align: "left",
            value: "employeeNumber"
        },
        {
            text: "Name",
            value: "name"
        },
        {
            text: "Position",
            value: "position"
        },
        {
            text: "College",
            value: "college"
        },
        {
            text: "Action",
            value: "action", align: "right"
        },
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
        }
    ];

    export default {
        name: "personal-data-sheet-manager",
        components: {GenericTooltipButton, GenericSearchToolbar},
        data() {
            return {
                tableHeaders,
                searchOptions,
                dummyData: [
                    {
                        employeeNumber: "xxxx-xxx-xxxx",
                        name: "John D. Doe Jr.",
                        position: "Instructor 3",
                        college: "CET"
                    }
                ]
            };
        },

        computed: {
            isInDefaultSearchOption() {
                return this.selectedSearchOption === 0;
            }
        }
    };
</script>