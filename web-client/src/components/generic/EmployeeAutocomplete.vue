<template>
	<v-row no-gutters>
		<v-col cols="12" :md="searchOptionsColumn">
			<v-select :outlined="outlined" :solo="solo" label="Search By" :items="searchOptions"
					  v-model="searchOptionLocal" class="mr-2">
				<template v-slot:item="{item}">
					<span class="text-capitalize">{{item}}</span>
				</template>
				<template v-slot:selection="{item}">
					<span class="text-capitalize">{{item}}</span>
				</template>
			</v-select>
		</v-col>
		<v-col cols="12" :md="searchBarColumn">
			<v-autocomplete v-model="employeeLocal" :label="label" :outlined="outlined" :solo="solo"
							:search-input.sync="searchValueLocal" :items="employees"
							:loading="isLoading" :item-text="customItemText" return-object :filter="() => true"
							:disabled="!searchOptionLocal" cache-items>
				<template v-slot:item="{item}">
					<v-list-item-content>
						<v-list-item-subtitle class="text-uppercase font-weight-bold">
							{{item.employeeNumber}}
						</v-list-item-subtitle>
						<v-list-item-title class="text-capitalize">
							{{item.profile.firstName}}
							{{getTextFirstLetter(item.profile.middleName)}}.
							{{item.profile.lastName}}
						</v-list-item-title>
						<v-list-item-subtitle class="text-capitalize">
							{{item.department.name}}
						</v-list-item-subtitle>
					</v-list-item-content>
				</template>
				<template v-slot:selection="{item}">
							<span class="text-capitalize">
								{{item.profile.firstName}}
								{{getTextFirstLetter(item.profile.middleName)}}.
								{{item.profile.lastName}}
							</span>
				</template>
			</v-autocomplete>
		</v-col>
	</v-row>
</template>

<script>
    import customUtilities from "../../services/customUtilities";

    export default {
        name: "generic-employee-autocomplete",

        props: {
            solo: {
                type: Boolean,
                required: false
            },

            outlined: {
                type: Boolean,
                required: false
            },

            isLoading: {
                type: Boolean,
                required: true
            },

            employee: {
                type: Object,
                required: true
            },

            searchOptions: {
                type: Array,
                required: true
            },

            searchOption: {
                type: String,
                required: true
            },

            searchValue: {
                type: String,
                required: true
            },

            label: {
                type: String,
                required: false
            },

			employees: {
                type: Array,
				required: true
			},

			searchOptionsColumn: {
                type: Number,
				required: true
			},

            searchBarColumn: {
                type: Number,
                required: true
            }
        },

        data() {
            return {
                searchOptionLocal: "",
                searchValueLocal: "",
                employeesLocal: [],
                employeeLocal: {}
            };
        },

        mixins: [customUtilities],

        computed: {
            customItemText() {
                return this.searchOptionLocal === "employeeNumber" ? "employeeNumber" : "profile.lastName";
            }
        },

        watch: {
            searchOption(value) {
                this.searchOptionLocal = value;
            },
            searchValue(value) {
                this.searchValueLocal = value;
            },
            searchOptionLocal(value) {
                this.$emit("update:searchOption", value);
            },
            searchValueLocal(value) {
                this.$emit("update:searchValue", value);
            },
            employee(value) {
                this.employeeLocal = value;
            },
            employeeLocal(value) {
                this.$emit("update:employee", value);
            }
        },

        created() {
            this.searchOptionLocal = this.searchOption;
            this.searchValueLocal = this.searchValue;
            this.employee = this.employeeLocal;
        }

    };
</script>