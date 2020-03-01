<template>
	<v-data-table :headers="headers" show-select single-select hide-default-footer></v-data-table>
</template>

<script>
	const headers = [
		{
		    text: "Date"
		},
		{
		    text: "Day"
		}
	];

	export default {
	    name: "daily-time-record-form",

		data() {
	        return {
	            headers
			}
		}
	}
</script>