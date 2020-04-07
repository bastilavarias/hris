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
			<v-skeleton-loader
					loading
					type="date-picker"
					tile
					class="mx-auto" v-if="isLoading"></v-skeleton-loader>
			<v-calendar
					ref="calendar"
					v-model="calendarDate"
					:weekdays="weekday"
					type="month"
					:events="calendarEvents"
					v-else
			></v-calendar>
		</v-card-text>
	</v-card>
</template>

<script>
    import moment from "moment";
    import {getPersonalPersonnelSchedule} from "../../../store/types/schedule";
    import customUtilities from "../../../services/customUtilities";
    import schedule from "../../../store/modules/schedule";
    import {setActionName} from "../../../store/types/action";

    export default {
        data() {
            return {
                weekday: [0, 1, 2, 3, 4, 5, 6],
                calendarDate: null,
                isLoading: false
            };
        },

        mixins: [customUtilities],

        computed: {
            calendarTitle() {
                return moment(this.calendarDate).format("MMMM YYYY");
            },

            schedule() {
                return this.$store.state.schedule.personalPersonnelSchedule;
            },

            calendarEvents() {
                return this.schedule.map(({date, startTime, endTime}) => ({
                    name: `${this.convertMilitaryTime(startTime)} - ${this.convertMilitaryTime(endTime)}`,
                    start: moment(date).format("YYYY-MM-DD"),
                    end: moment(date).format("YYYY-MM-DD"),
                    color: "primary"
                }));
            }
        },

        watch: {
            "$store.state.action.name"(name) {
                if (name === getPersonalPersonnelSchedule) {
                    this.isLoading = false;
                    this.$store.commit(setActionName, "");
                }
            },

            calendarDate(date) {
                this.$store.dispatch(getPersonalPersonnelSchedule, date);
                this.isLoading = true;
			}
        },

        created() {
            this.calendarDate = new Date();
            this.$store.dispatch(getPersonalPersonnelSchedule, this.calendarDate);
            this.isLoading = true;
        }

    };
</script>