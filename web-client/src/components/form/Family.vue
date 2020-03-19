<template>
	<v-row dense>
		<v-col cols="12">
			<v-text-field label="Fist NAme" outlined></v-text-field>
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
	</v-row>
</template>

<script>
    import GenericCitySelection from "../selection/City";
    export default {
        name: "generic-family-form",
        components: {GenericCitySelection}
    };
</script>