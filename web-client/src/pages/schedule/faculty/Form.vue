<template>
	<v-card>
		<v-card-title>
			<generic-back-button title="Faculty Schedule Form"></generic-back-button>
		</v-card-title>
		<v-card-text>
			<v-row>
				<v-col cols="12">
					<v-autocomplete label="Section" outlined></v-autocomplete>
				</v-col>
				<v-col cols="12">
					<v-autocomplete label="Subject" outlined></v-autocomplete>
				</v-col>
				<v-col cols="12">
					<v-autocomplete label="Faculty" outlined></v-autocomplete>
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
					</v-row>
				</v-col>
				<v-col cols="12">
					<v-checkbox color="primary"
					>
						<template v-slot:label>Is day, time, and room is to be announce?</template>
					</v-checkbox>
				</v-col>
			</v-row>
		</v-card-text>
		<v-card-actions>
			<v-btn color="primary" block>Submit</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
    import GenericCardBackButton from "../../../components/generic/CardBackButton";
    import GenericTimePicker from "../../../components/generic/TimePicker";
    import GenericBackButton from "../../../components/generic/BackButton";

    export default {
        name: "schedule-schedule-form",
        components: {GenericBackButton, GenericTimePicker, GenericCardBackButton},

        data() {
            return {
                time: null
            };
        }
    };
</script>