<template>
	<v-row dense>
		<v-col cols="12">
			<v-text-field label="Government Issued ID" outlined></v-text-field>
		</v-col>
		<v-col cols="12">
			<v-text-field label="ID/License/Passport No." outlined></v-text-field>
		</v-col>
		<v-col cols="12">
			<v-text-field label="Date/Place of Issuance" outlined></v-text-field>
		</v-col>
	</v-row>
</template>

<script>

    export default {
        name: "generic-government-id-form"
    };
</script>