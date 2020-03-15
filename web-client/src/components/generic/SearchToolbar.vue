<template>
	<v-row dense>
		<v-col cols="12" :md="isInDefaultSearchOption ? '1' : '3'">
			<v-select solo label="Search By" :items="searchOptions"
					  v-model="searchOptionLocal">
				<template v-slot:item="{item}">
					<span class="text-capitalize">{{item}}</span>
				</template>
				<template v-slot:selection="{item}">
					<span class="text-capitalize">{{item}}</span>
				</template>
			</v-select>
		</v-col>
		<v-col cols="12" :md="isInDefaultSearchOption ? '9' : '7'">
			<v-text-field solo label="Search" :disabled="isInDefaultSearchOption" v-model="searchValueLocal"
						  @keyup="action"></v-text-field>
		</v-col>
		<v-col cols="12" md="2">
			<v-btn color="primary" large block @click="action">
				<span class="mr-1">Search</span>
				<v-icon>mdi-database-search</v-icon>
			</v-btn>
		</v-col>
	</v-row>
</template>

<script>
    export default {
        name: "generic-search-toolbar",

        props: {
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
            action: {
                type: Function,
                required: true
            }
        },

        data() {
            return {
                searchOptionLocal: "",
                searchValueLocal: ""
            };
        },

        computed: {
            isInDefaultSearchOption() {
                return this.searchOptionLocal === "all";
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
            }
        },

        created() {
            this.searchOptionLocal = this.searchOption;
            this.searchValueLocal = this.searchValue;
        }
    };
</script>