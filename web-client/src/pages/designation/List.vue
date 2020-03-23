<template>
	<v-card>
		<v-card-title>
			<span class="font-weight-bold">Designation Management</span>
			<div class="flex-grow-1"></div>
			<generic-tooltip-button icon="plus" color="primary" title="Create New Designation"
									:to="{name: 'designation-management-form', params: {operation: 'create'}}"></generic-tooltip-button>
		</v-card-title>
		<v-data-table :headers="tableHeaders" :items="designations" :loading="isLoading">
			<template v-slot:top>
				<v-card-text>
					<generic-search-toolbar :search-options="searchOptions" :search-option.sync="searchOption"
											:search-value.sync="searchValue"
											:action="search"></generic-search-toolbar>
				</v-card-text>
			</template>
			<template v-slot:item.code="{item}">
				<span class="font-weight-bold text-uppercase">{{item.code}}</span>
			</template>
			<template v-slot:item.name="{item}">
				<span class="text-capitalize">{{item.name}}</span>
			</template>
			<template v-slot:item.description="{item}">
				<span class="text-capitalize">{{item.description ? item.description : "N/A"}}</span>
			</template>
			<template v-slot:item.college="{item}">
				<span class="text-uppercase">{{item.college ? item.college.name : "N/A"}}</span>
			</template>
			<template v-slot:item.actions="{item}">
				<v-btn icon @click="update(item)">
					<v-icon>mdi-pencil</v-icon>
				</v-btn>
				<v-btn icon @click="selectItem(item)">
					<v-icon>mdi-trash-can</v-icon>
				</v-btn>
			</template>
		</v-data-table>
		<generic-confirm-dialog :is-show.sync="isConfirmDialogShow"
								message="Are you sure you want to delete this designation?"
								color="secondary"
								:is-loading="isLoading"
								:action="deleteItem"></generic-confirm-dialog>
	</v-card>
</template>

<script>
    import GenericSearchToolbar from "../../components/generic/SearchToolbar";
    import GenericTooltipButton from "../../components/generic/TooltipButton";
    import {
        deleteDesignation,
        getAllDesignations,
        searchDesignations,
        setDesignationError,
        setDesignations
    } from "../../store/types/designation";
    import {setActionName} from "../../store/types/action";
    import GenericConfirmDialog from "../../components/generic/CustomDialog";

    const tableHeaders = [
        {
            text: "Name",
            value: "name",
            align: "left"
        },
        {
            text: "Description",
            value: "description"
        },
        {
            text: "Actions",
            value: "actions", align: "right"
        }
    ];
    const searchOptions = [
        "all",
        "name"
    ];

    export default {
        components: {GenericConfirmDialog, GenericTooltipButton, GenericSearchToolbar},

        data() {
            return {
                searchOptions,
                tableHeaders,
                isLoading: false,
                searchOption: "all",
                searchValue: "",
                isConfirmDialogShow: false,
                selectedItem: {}
            };
        },

        computed: {
            designations() {
                return this.$store.state.designation.list;
            },

            errors() {
                return this.$store.state.designation.errors;
            }
        },

        watch: {
            "$store.state.action.name"(name) {
                if (name === getAllDesignations || searchDesignations) {
                    this.isLoading = false;
                    this.$store.commit(setActionName, "");
                }

                if (name === `${deleteDesignation}-errors`) {
                    this.isLoading = false;
                    this.isConfirmDialogShow = false;
                    this.$store.commit(setActionName, "");
                }

                if (name === deleteDesignation) {
                    this.isLoading = false;
                    this.isConfirmDialogShow = false;
                    this.$store.commit(setActionName, "");
                    this.$store.commit(setDesignationError, []);
                    this.search();
                }
            },

            searchOption(opt) {
                if (opt === "all") return this.$store.dispatch(getAllDesignations);
            }
        },

        methods: {
            search() {
                this.isLoading = true;
                if (this.searchOption === "all") return this.$store.dispatch(getAllDesignations);
                if (this.searchValue.trim() && ["name"].includes(this.searchOption)) {
                    const searchConfig = {
                        option: this.searchOption,
                        value: this.searchValue
                    };
                    return this.$store.dispatch(searchDesignations, searchConfig);
                }
                this.isLoading = false;
                return this.$store.commit(setDesignations, []);
            },

            update({id}) {
                this.$router.push(
                    {
                        name: "designation-management-form",
                        params: {
                            operation: "update",
                            designationId: id
                        }
                    }
                );
            },

            selectItem(item) {
                this.selectedItem = item;
                this.isConfirmDialogShow = true;
            },

            deleteItem() {
                const {id} = this.selectedItem;
                this.isLoading = true;
                this.$store.dispatch(deleteDesignation, id);
            },

            destroyed() {
                this.$store.commit(setDesignations, []);
                this.$store.commit(setDesignationError, []);
                this.$store.commit(setActionName, "");
            }
        },
    };
</script>