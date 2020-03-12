<template>
	<v-row dense>
		<v-col cols="12" :md="isInDefaultSearchOption ? '1' : '3'">
			<v-select solo label="Search By" :items="searchOptions" item-text="name" item-value="id"
					  v-model="selectedSearchOption"></v-select>
		</v-col>
		<v-col cols="12" :md="isInDefaultSearchOption ? '9' : '7'">
			<v-text-field solo label="Search" :disabled="isInDefaultSearchOption"></v-text-field>
		</v-col>
		<v-col cols="12" md="2">
			<v-btn color="primary" large block>
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
			}
		},

        data() {
            return {
                selectedSearchOption: 0
            };
        },

        computed: {
            isInDefaultSearchOption() {
                return this.selectedSearchOption === 0;
            }
        }
	}
</script>