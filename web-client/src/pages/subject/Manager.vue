<template>
	<v-card>
		<v-card-title>
			<span class="font-weight-bold">Subject Manager</span>
			<div class="flex-grow-1"></div>
			<v-tooltip bottom>
				<template v-slot:activator="{ on }">
					<v-btn icon color="primary" v-on="on" :to="{name: 'subject-form', params: {operation: 'create'}}">
						<v-icon>mdi-plus</v-icon>
					</v-btn>
				</template>
				<span>Create New Subject</span>
			</v-tooltip>
		</v-card-title>
		<v-data-table hide-default-footer :headers="tableHeaders" :items="[]">
			<template v-slot:top>
				<v-card-text>
					<generic-search-toolbar :search-options="searchOptions"></generic-search-toolbar>
				</v-card-text>
			</template>
			<template v-slot:item.position="{item}">
				<span class="text-capitalize">{{item.position}}</span>
			</template>
			<template v-slot:item.college="{item}">
				<span class="text-uppercase font-weight-bold">{{item.college}}</span>
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
    const tableHeaders = [
		{
		    text: "Code",
			value: "code"
		},
		{
		    text: "Title",
			value: "title"
		},
		{
		    text: "Description",
			value: "description"
		},
		{
		    text: "Units",
			value: "units"
		},
		{
		    text: "Category",
			value: "category"
		},
		{
		    text: "Prerequisites",
			value: "Prerequisites"
		},
        {
            text: "Actions",
            value: "actions"
        }
    ];
    const searchOptions = [
        {
            id: 0,
            name: "All"
        },
        {
            id: 1,
            name: "Code"
        },
        {
            id: 2,
            name: "Title"
        }
    ];

    export default {
	    name: "subject-manager",
        components: {GenericSearchToolbar},

		data() {
	        return {
	            searchOptions,
	            tableHeaders,
            }
		}
    }
</script>