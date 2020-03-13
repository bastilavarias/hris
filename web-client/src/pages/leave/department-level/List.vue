<template>
	<v-card>
		<v-card-title>
			<div class="font-weight-bold">Leave Management</div>
		</v-card-title>
		<v-data-table hide-default-footer :headers="tableHeaders"></v-data-table>
	</v-card>
</template>

<script>
    const tableHeaders = [
        {
            text: "Date",
            align: "left"
        },
        {
            text: "Name"
        },
        {
            text: "Position"
        },
        {
            text: "Department"
        },
        {
            text: "Actions",
            align: "right"
        }
    ];

    export default {
		data() {
		    return {
		        tableHeaders
			}
		}
	}
</script>