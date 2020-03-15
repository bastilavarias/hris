<template>
	<v-card>
		<v-card-title>
			<span class="font-weight-bold">Subject Management</span>
			<div class="flex-grow-1"></div>
			<generic-tooltip-button icon="plus" color="primary" title="Create New Subject"
									:to="{name: 'subject-management-form', params: {operation: 'create'}}"></generic-tooltip-button>
		</v-card-title>
		<v-data-table hide-default-footer :headers="tableHeaders" :items="subjects" :loading="isLoading">
			<template v-slot:top>
				<v-card-text>
					<generic-search-toolbar :search-options="searchOptions" :search-option.sync="searchOption"
											:search-value.sync="searchValue" :action="search"></generic-search-toolbar>
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
    import {getAllSubjects, searchSubjects, setSubjects} from "../../store/types/subject";

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
            text: "Prerequisite",
            value: "Prerequisite"
        },
        {
            text: "Actions",
            value: "actions", align: "right"
        }
    ];
    const searchOptions = [
        "all",
        "code",
        "title"
    ];

    export default {
        components: {GenericTooltipButton, GenericSearchToolbar},

        data() {
            return {
                searchOptions,
                tableHeaders,
                isLoading: false,
                searchOption: "all",
                searchValue: ""
            };
        },

        computed: {
            subjects() {
                return this.$store.state.subject.list;
            }
        },

        watch: {
            "$store.state.action.name"(name) {
                if (name === "") return this.isLoading = false;
                if (name === getAllSubjects || searchSubjects) return this.isLoading = true;
            }
        },

        methods: {
            search() {
                if (this.searchOption === "all") return this.$store.dispatch(getAllSubjects);
                if (this.searchValue.trim() && ["code", "title"].includes(this.searchOption)) {
                    const searchConfig = {
                        option: this.searchOption,
                        value: this.searchValue
                    };
                    return this.$store.dispatch(searchSubjects, searchConfig);
                }
                return this.$store.commit(setSubjects, []);
            }
        }
    };
</script>