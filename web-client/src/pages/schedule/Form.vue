<template>
	<v-card>
		<generic-card-back-button title="Schedule Information"></generic-card-back-button>
		<v-card-subtitle>The information will automatically inserted in <span
				class="font-weight-bold">Second Semester</span>, Academic Year: <span
				class="font-weight-bold">2020-2020</span></v-card-subtitle>
		<v-card-text>
			<v-row>
				<v-col cols="12">
					<v-autocomplete label="Section"></v-autocomplete>
				</v-col>
				<v-col cols="12">
					<v-autocomplete label="Subject"></v-autocomplete>
				</v-col>
				<v-col cols="12">
					<v-autocomplete label="Faculty"></v-autocomplete>
				</v-col>
				<v-col cols="12">
					<span class="v-label theme--light">Day / Time / Room</span>
					<v-row dense>
						<v-col cols="12" md="3">
							<v-select label="Day"></v-select>
						</v-col>
						<v-col cols="12" md="2">
							<generic-time-picker :time.sync="time" label="Start Time"></generic-time-picker>
						</v-col>
						<v-col cols="12" md="2">
							<generic-time-picker :time.sync="time" label="End Time"></generic-time-picker>
						</v-col>
						<v-col cols="12" md="3">
							<v-autocomplete label="Room"></v-autocomplete>
						</v-col>
						<v-col cols="12" md="1" align-self="center">
							<v-btn color="primary" block>Add</v-btn>
						</v-col>
						<v-col cols="12" md="1" align-self="center">
							<v-btn color="error" block text>
								<v-icon>mdi-trash-can</v-icon>
							</v-btn>
						</v-col>
						<v-col cols="12">
							<v-checkbox color="primary"
							>
								<template v-slot:label>Is day, time, and room is to be announce?</template>
							</v-checkbox>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-card-text>
		<v-card-actions>
			<v-btn class="primary" block>Submit</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
    import GenericCardBackButton from "../../components/generic/CardBackButton";
    import GenericTimePicker from "../../components/generic/TimePicker";

    export default {
        name: "schedule-form",
        components: {GenericTimePicker, GenericCardBackButton},

        data() {
            return {
                time: null
            };
        }
    };
</script>