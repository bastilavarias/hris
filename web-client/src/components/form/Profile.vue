<template>
	<v-row dense>
		<v-col cols="12">
			<v-text-field label="Fist Name" outlined></v-text-field>
		</v-col>
		<v-col cols="12">
			<v-text-field label="Middle Name" outlined></v-text-field>
		</v-col>
		<v-col cols="10">
			<v-text-field label="Surname" outlined></v-text-field>
		</v-col>
		<v-col cols="2">
			<v-text-field label="Extension" outlined></v-text-field>
		</v-col>
		<v-col cols="4">
			<generic-date-input outlined label="Date Of Birth"></generic-date-input>
		</v-col>
		<v-col cols="8">
			<generic-city-selection :city="null" label="Birth Place" outlined></generic-city-selection>
		</v-col>
		<v-col cols="2">
			<generic-sex-selection :sex="null" label="Sex" outlined></generic-sex-selection>
		</v-col>
		<v-col cols="5">
			<generic-civil-status-selection :civil-status="null" label="Civil Status" outlined></generic-civil-status-selection>
		</v-col>
		<v-col cols="5">
			<generic-citizenship-selection :citizenship="[]" label="Citizenship(s)" outlined></generic-citizenship-selection>
		</v-col>
		<v-col cols="6">
			<generic-blood-type-selection :blood-type="null" label="Blood Type" outlined></generic-blood-type-selection>
		</v-col>
		<v-col cols="12" md="3">
			<v-text-field type="number" label="Height" suffix="m" outlined></v-text-field>
		</v-col>
		<v-col cols="12" md="3">
			<v-text-field type="number" label="Weight" suffix="kg" outlined></v-text-field>
		</v-col>
	</v-row>
</template>

<script>
	import GenericDateInput from "../generic/DateInput";
    import GenericCitySelection from "../selection/City";
    import GenericSexSelection from "../selection/Sex";
    import GenericCivilStatusSelection from "../selection/CivilStatus";
    import GenericCitizenshipSelection from "../selection/Citizenship";
    import GenericBloodTypeSelection from "../selection/BloodType";
    export default {
	    name: "generic-profile",
        components: {
            GenericBloodTypeSelection,
            GenericCitizenshipSelection,
            GenericCivilStatusSelection, GenericSexSelection, GenericCitySelection, GenericDateInput}
    }
</script>