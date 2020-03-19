<template>
	<v-row dense>
		<v-col cols="12" md="6">
			<v-text-field label="Telephone No." outlined></v-text-field>
		</v-col>
		<v-col cols="12" md="6">
			<v-text-field label="Mobile No." outlined></v-text-field>
		</v-col>
		<v-col cols="12">
			<v-text-field label="E-main Address" outlined></v-text-field>
		</v-col>
	</v-row>
</template>

<script>
    export default {
        name: "generic-contact-form"
    };
</script>