<template>
	<v-row dense>
		<v-col cols="12" md="6">
			<v-text-field label="House/Block/Lot No." outlined></v-text-field>
		</v-col>
		<v-col cols="12" md="6">
			<v-text-field label="Street" outlined></v-text-field>
		</v-col>
		<v-col cols="12" md="6">
			<v-text-field label="Subdivision/Village" outlined></v-text-field>
		</v-col>
		<v-col cols="12" md="6">
			<v-text-field label="Barangay" outlined></v-text-field>
		</v-col>
		<v-col cols="12" md="6">
			<generic-city-selection :city="null" label="City/Municipality" outlined></generic-city-selection>
		</v-col>
		<v-col cols="12" md="6">
			<v-autocomplete label="Province" outlined></v-autocomplete>
		</v-col>
		<v-col cols="12" md="12">
			<v-text-field label="Zip Code" outlined></v-text-field>
		</v-col>
	</v-row>
</template>

<script>
    import GenericCitySelection from "../selection/City";
    export default {
        name: "generic-address-form",
        components: {GenericCitySelection}
    };
</script>