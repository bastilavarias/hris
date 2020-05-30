<template>
  <v-calendar
    ref="calendar"
    v-model="start"
    :type="type"
    :start="start"
    :end="end"
    :min-weeks="minWeeks"
    :max-days="maxDays"
    :now="now"
    :dark="dark"
    :weekdays="weekdays"
    :first-interval="intervals.first"
    :interval-minutes="intervals.minutes"
    :interval-count="intervals.count"
    :interval-height="intervals.height"
    :interval-style="intervalStyle"
    :show-interval-label="showIntervalLabel"
    :short-intervals="shortIntervals"
    :short-months="shortMonths"
    :short-weekdays="shortWeekdays"
    :color="color"
    :events="events"
    :event-overlap-mode="mode"
    :event-overlap-threshold="45"
    :event-color="getEventColor"
    @change="getEvents"
  ></v-calendar>
</template>

<script>
const weekdaysDefault = [0, 1, 2, 3, 4, 5, 6];

const intervalsDefault = {
  first: 0,
  minutes: 60,
  count: 24,
  height: 48,
};

const stylings = {
  default(interval) {
    return undefined;
  },
  workday(interval) {
    const inactive =
      interval.weekday === 0 ||
      interval.weekday === 6 ||
      interval.hour < 9 ||
      interval.hour >= 17;
    const startOfHour = interval.minute === 0;
    const dark = this.dark;
    const mid = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";

    return {
      backgroundColor: inactive
        ? dark
          ? "rgba(0,0,0,0.4)"
          : "rgba(0,0,0,0.05)"
        : undefined,
      borderTop: startOfHour ? undefined : "1px dashed " + mid,
    };
  },
  past(interval) {
    return {
      backgroundColor: interval.past
        ? this.dark
          ? "rgba(0,0,0,0.4)"
          : "rgba(0,0,0,0.05)"
        : undefined,
    };
  },
};

export default {
  name: "custom-faculty-schedule-calendar",
  data: () => ({
    dark: false,
    startMenu: false,
    start: "2019-01-12",
    endMenu: false,
    end: "2019-01-27",
    nowMenu: false,
    minWeeks: 1,
    now: null,
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party",
    ],
    type: "week",
    typeOptions: [
      { text: "Day", value: "day" },
      { text: "4 Day", value: "4day" },
      { text: "Week", value: "week" },
      { text: "Month", value: "month" },
      { text: "Custom Daily", value: "custom-daily" },
      { text: "Custom Weekly", value: "custom-weekly" },
    ],
    mode: "stack",
    modeOptions: [
      { text: "Stack", value: "stack" },
      { text: "Column", value: "column" },
    ],
    weekdays: weekdaysDefault,
    weekdaysOptions: [
      { text: "Sunday - Saturday", value: weekdaysDefault },
      { text: "Mon, Wed, Fri", value: [1, 3, 5] },
      { text: "Mon - Fri", value: [1, 2, 3, 4, 5] },
      { text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] },
    ],
    intervals: intervalsDefault,
    intervalsOptions: [
      { text: "Default", value: intervalsDefault },
      {
        text: "Workday",
        value: { first: 16, minutes: 30, count: 20, height: 48 },
      },
    ],
    maxDays: 7,
    maxDaysOptions: [
      { text: "7 days", value: 7 },
      { text: "5 days", value: 5 },
      { text: "4 days", value: 4 },
      { text: "3 days", value: 3 },
    ],
    styleInterval: "default",
    styleIntervalOptions: [
      { text: "Default", value: "default" },
      { text: "Workday", value: "workday" },
      { text: "Past", value: "past" },
    ],
    color: "primary",
    colorOptions: [
      { text: "Primary", value: "primary" },
      { text: "Secondary", value: "secondary" },
      { text: "Accent", value: "accent" },
      { text: "Red", value: "red" },
      { text: "Pink", value: "pink" },
      { text: "Purple", value: "purple" },
      { text: "Deep Purple", value: "deep-purple" },
      { text: "Indigo", value: "indigo" },
      { text: "Blue", value: "blue" },
      { text: "Light Blue", value: "light-blue" },
      { text: "Cyan", value: "cyan" },
      { text: "Teal", value: "teal" },
      { text: "Green", value: "green" },
      { text: "Light Green", value: "light-green" },
      { text: "Lime", value: "lime" },
      { text: "Yellow", value: "yellow" },
      { text: "Amber", value: "amber" },
      { text: "Orange", value: "orange" },
      { text: "Deep Orange", value: "deep-orange" },
      { text: "Brown", value: "brown" },
      { text: "Blue Gray", value: "blue-gray" },
      { text: "Gray", value: "gray" },
      { text: "Black", value: "black" },
    ],
    shortIntervals: true,
    shortMonths: false,
    shortWeekdays: false,
  }),
  computed: {
    intervalStyle() {
      return stylings[this.styleInterval].bind(this);
    },
    hasIntervals() {
      return (
        this.type in
        {
          week: 1,
          day: 1,
          "4day": 1,
          "custom-daily": 1,
        }
      );
    },
    hasEnd() {
      return (
        this.type in
        {
          "custom-weekly": 1,
          "custom-daily": 1,
        }
      );
    },
  },
  methods: {
    viewDay({ date }) {
      this.start = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    showIntervalLabel(interval) {
      return interval.minute === 0;
    },
    getEvents({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: this.formatDate(first, !allDay),
          end: this.formatDate(second, !allDay),
          color: this.colors[this.rnd(0, this.colors.length - 1)],
        });
      }

      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    formatDate(a, withTime) {
      return withTime
        ? `${a.getFullYear()}-${
            a.getMonth() + 1
          }-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
        : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`;
    },
  },
};
</script>

<style scoped>
.controls {
  position: relative;
}
</style>
