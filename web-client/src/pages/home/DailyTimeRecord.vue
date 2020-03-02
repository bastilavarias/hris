<template>
	<v-card>
		<v-card-title>
			<span>Record Table</span>
			<div class="flex-grow-1"></div>
			<v-btn icon>
				<v-icon>mdi-dots-vertical</v-icon>
			</v-btn>
		</v-card-title>
		<v-tabs v-model="tab">
			<v-tab>Regular Load</v-tab>
			<v-tab>Extra Load</v-tab>
		</v-tabs>
		<v-tabs-items v-model="tab">
			<v-tab-item>
				<daily-time-record-form></daily-time-record-form>
			</v-tab-item>
			<v-tab-item>
				<daily-time-record-form></daily-time-record-form>
			</v-tab-item>
		</v-tabs-items>
	</v-card>
</template>
<script>
    import DailyTimeRecordForm from "../../components/dailyTimeRecord/form";
    export default {
        components: {DailyTimeRecordForm},

		data() {
            return {
                tab: 0
			}
		}
    };
</script>