<template>
	<v-card>
		<v-card-title>
			<div class="font-weight-bold">Schedule</div>
			<div class="flex-grow-1">
			</div>
			<v-btn icon>
				<v-icon>
					mdi-printer
				</v-icon>
			</v-btn>
		</v-card-title>
		<v-card-text>
			<v-toolbar flat color="transparent">
				<v-btn icon @click="$refs.calendar.prev()">
					<v-icon>mdi-chevron-left</v-icon>
				</v-btn>
				<v-btn icon @click="$refs.calendar.next()">
					<v-icon>mdi-chevron-right</v-icon>
				</v-btn>
				<v-toolbar-title>{{calendarTitle}}</v-toolbar-title>
			</v-toolbar>
			<v-calendar
					ref="calendar"
					v-model="calendarDate"
					:weekdays="weekday"
					type="month"
					:events="[]"
			></v-calendar>
		</v-card-text>
	</v-card>
</template>

<script>
	import moment from "moment";

    export default {
        data() {
            return {
                weekday: [0, 1, 2, 3, 4, 5, 6],
                calendarDate: null
            };
        },

        computed: {
            calendarTitle() {
                return moment(this.calendarDate).format("MMMM YYYY");
            }
        },

		created() {
            this.calendarDate = new Date();
        }

    };
</script>