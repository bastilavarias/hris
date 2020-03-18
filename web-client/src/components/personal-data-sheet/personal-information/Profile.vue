<template>
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
		<v-col cols="12" md="4">
			<generic-date-input label="Date Of Birth"></generic-date-input>
		</v-col>
		<v-col cols="12" md="8">
			<v-autocomplete label="Birth Place"></v-autocomplete>
		</v-col>
		<v-col cols="12" md="2">
			<v-select label="Sex" :items="sexes"></v-select>
		</v-col>
		<v-col cols="12" md="5">
			<v-select label="Civil Status" :items="civilStatuses"></v-select>
		</v-col>
		<v-col cols="12" md="5">
			<v-autocomplete label="Citizenship"></v-autocomplete>
		</v-col>
		<v-col cols="12" md="6">
			<v-select label="Blood Type" items="bloodTypes"></v-select>
		</v-col>
		<v-col cols="12" md="3">
			<v-text-field type="number" label="Height" suffix="m"></v-text-field>
		</v-col>
		<v-col cols="12" md="3">
			<v-text-field type="number" label="Weight" suffix="kg"></v-text-field>
		</v-col>

	</v-row>
</template>

<script>
    import GenericImageInput from "../../generic/ImageInput";
    import GenericDateInput from "../../generic/DateInput";

    const sexes = [
        "Male",
        "Female"
    ];

    const civilStatuses = [
        "Single",
        "Maried",
        "Divorced",
        "Separated",
        "Widowed"
    ];

    const bloodTypes = [
        "O+",
        "O-",
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
    ];

    export default {
        name: "personal-data-sheet-profile",
        components: {GenericDateInput, GenericImageInput},

        data() {
            return {
                sexes,
                civilStatuses,
				bloodTypes
            };
        }
    };
</script>