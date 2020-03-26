<template>
	<v-card>
		<v-card-title>
			<span class="font-weight-bold">Course Management</span>
			<div class="flex-grow-1"></div>
			<generic-tooltip-button icon="plus" color="primary" title="Create New Course"
									:to="{name: 'course-form', params: {operation: 'create'}}"></generic-tooltip-button>
		</v-card-title>
		<v-data-table :headers="tableHeaders" :items="courses" :loading="isLoading">
			<template v-slot:top>
				<v-card-text>
					<generic-search-toolbar :search-options="searchOptions" :search-option.sync="searchOption"
											:search-value.sync="searchValue"
											:action="search"></generic-search-toolbar>
				</v-card-text>
			</template>
			<template v-slot:item.customId="{item}">
				<span class="font-weight-bold text-uppercase">{{item.customId}}</span>
			</template>
			<template v-slot:item.name="{item}">
				<span class="text-capitalize">{{item.name}}</span>
			</template>
			<template v-slot:item.description="{item}">
				<span class="text-capitalize">{{item.description ? item.description : "N/A"}}</span>
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
								message="Are you sure you want to delete this course?"
								color="secondary"
								:is-loading="isLoading"
								:action="deleteItem"></generic-confirm-dialog>
	</v-card>
</template>

<script>
    import GenericSearchToolbar from "../../components/generic/SearchToolbar";
    import GenericTooltipButton from "../../components/generic/TooltipButton";
    import {
        deleteCourse,
        getAllCourses,
        searchCourses,
        setCourseError,
        setCourses
    } from "../../store/types/course";
    import {setActionName} from "../../store/types/action";
    import GenericConfirmDialog from "../../components/generic/CustomDialog";
    const tableHeaders = [
        {
            text: "Code",
            value: "code"
        },
        {
            text: "Name",
            value: "name"
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
        "code",
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
            courses() {
                return this.$store.state.course.list;
            }
        },

        watch: {
            "$store.state.action.name"(name) {
                if (name === getAllCourses || searchCourses) {
                    this.isLoading = false;
                    this.$store.commit(setActionName, "");
                }

                if (name === `${deleteCourse}-error`) {
                    this.isLoading = false;
                    this.isConfirmDialogShow = false;
                    this.$store.commit(setActionName, "");
                }

                if (name === deleteCourse) {
                    this.isLoading = false;
                    this.isConfirmDialogShow = false;
                    this.$store.commit(setActionName, "");
                    this.$store.commit(setCourseError, []);
                    this.search();
                }
            },

            searchOption(opt) {
                if (opt === "all") return this.$store.dispatch(getAllCourses);
            }
        },

        methods: {
            search() {
                this.isLoading = true;
                if (this.searchOption === "all") return this.$store.dispatch(getAllCourses);
                if (this.searchValue.trim() && ["code", "name"].includes(this.searchOption)) {
                    const searchConfig = {
                        option: this.searchOption,
                        value: this.searchValue
                    };
                    return this.$store.dispatch(searchCourses, searchConfig);
                }
                this.isLoading = false;
                return this.$store.commit(setCourses, []);
            },

            update({id}) {
                this.$router.push(
                    {
                        name: "course-form",
                        params: {
                            operation: "update",
                            courseId: id
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
                this.$store.dispatch(deleteCourse, id);
            },

            destroyed() {
                this.$store.commit(setCourses, []);
                this.$store.commit(setCourseError, []);
                this.$store.commit(setActionName, "");
            }
        },
    }
</script>