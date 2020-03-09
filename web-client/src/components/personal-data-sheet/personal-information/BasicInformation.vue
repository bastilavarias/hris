<template>
	<v-card>
		<v-card-title>Basic Information</v-card-title>
		<v-card-text>
			<v-row dense>
				<v-col cols="12" md="8" order="2" order-md="1">
					<v-row dense>
						<v-col cols="10">
							<v-text-field label="Surname"></v-text-field>
						</v-col>
						<v-col cols="2">
							<v-select label="Extension"></v-select>
						</v-col>
						<v-col cols="12">
							<v-text-field label="Middle Name"></v-text-field>
						</v-col>
						<v-col cols="12">
							<v-text-field label="First Name"></v-text-field>
						</v-col>
					</v-row>
				</v-col>
				<v-col cols="12" md="4" order="1" order-md="2">
					<div class="text-center">
						<generic-image-input></generic-image-input>
					</div>
				</v-col>
				<v-col cols="12" order="3">
					<v-row dense>
						<v-col cols="12" md="4">
							<generic-date-input label="Date Of Birth"></generic-date-input>
						</v-col>
						<v-col cols="12" md="8">
							<v-autocomplete label="Birth Place"></v-autocomplete>
						</v-col>
						<v-col cols="12" md="2">
							<v-select label="Sex"></v-select>
						</v-col>
						<v-col cols="12" md="5">
							<v-select label="Civil Status"></v-select>
						</v-col>
						<v-col cols="12" md="5">
							<v-autocomplete label="Citizenship"></v-autocomplete>
						</v-col>
						<v-col cols="12" md="6">
							<v-select label="Blood Type"></v-select>
						</v-col>
						<v-col cols="12" md="3">
							<v-text-field type="number" label="Height (m)"></v-text-field>
						</v-col>
						<v-col cols="12" md="3">
							<v-text-field type="number" label="Weight (kg)"></v-text-field>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script>
    import GenericImageInput from "../../generic/ImageInput";
    import GenericDateInput from "../../generic/DateInput";

    export default {
        name: "personal-data-sheet-basic-information",
        components: {GenericDateInput, GenericImageInput}
    };
</script>