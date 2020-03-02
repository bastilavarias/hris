<template>
	<v-data-table :headers="headers" :items="record" hide-default-footer no disable-sort :items-per-page="31">
		<template v-slot:top>
			<v-container>
				<v-toolbar dense>
					<v-btn color="white" depressed light class="text-capitalize font-weight-bold">
						March 1 - 31, 2020
						<v-icon>mdi-menu-down</v-icon>
					</v-btn>
					<v-spacer></v-spacer>
					<v-tooltip top>
						<template v-slot:activator="{ on }">
							<v-btn light v-on="on" icon @click="addNewRowToRecord">
								<v-icon>mdi-plus</v-icon>
							</v-btn>
						</template>
						<span>Add new row record</span>
					</v-tooltip>
					<v-tooltip top>
						<template v-slot:activator="{ on }">
							<v-btn light v-on="on" icon>
								<v-icon>mdi-content-copy</v-icon>
							</v-btn>
						</template>
						<span>Copy month record</span>
					</v-tooltip>
				</v-toolbar>
			</v-container>
		</template>
		<template v-slot:item.date="{item}">
			<span class="text-capitalize font-weight-bold">{{item.date}}</span>
		</template>
		<template v-slot:item.arrival="{item}">
			Please Select
		</template>
		<template v-slot:item.departure="{item}">
			Please Select
		</template>
		<template v-slot:item.underTime="{item}">
			Please Select
		</template>
		<template v-slot:item.summary="{item}">
			Please Select
		</template>
		<template v-slot:item.actions="{item}">
			<v-menu offset-y>
				<template v-slot:activator="{ on }">
					<v-btn icon v-on="on">
						<v-icon>mdi-dots-horizontal</v-icon>
					</v-btn>
				</template>
				<v-list>
					<v-list-item v-for="(action, index) in recordRowActions">
						<v-list-item-title :key="index">{{action.title}}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</template>
	</v-data-table>
</template>

<script>
	import moment from "moment";

    const headers = [
        {
            text: "Date",
            value: "date",
            align: "left"
        },
        {
            text: "Arrival",
            value: "arrival"
        },
        {
            text: "Departure",
            value: "departure"
        },
        {
            text: "Under Time",
            value: "underTime"
        },
        {
            text: "Summary",
            value: "summary"
        },
        {
            text: "",
            value: "actions",
            align: "right"
        },
    ];

    const recordRowActions = [
        {
            title: "Duplicate"
        },
        {
            title: "Edit"
        }
    ];

    export default {
        name: "daily-time-record-form",
        data() {
            return {
                headers,
                record: [],
                recordRowActions
            };
        },

        methods: {
            addNewRowToRecord() {
                const recordItemsNumber = this.record.length;
                const dateObj = new Date();
                const currentYear = dateObj.getFullYear();
                const currentMonthInNumber = dateObj.getMonth();
                const newRow = {
                    date: moment(new Date(currentYear, currentMonthInNumber, recordItemsNumber + 1)).format("MMMM Do, dddd"),
                    arrival: "none",
                    departure: null,
                };
                this.record = [...this.record, newRow];
            }
        }
    };
</script>