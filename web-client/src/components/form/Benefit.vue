<template>
	<v-row dense>
		<v-col cols="12" md="4">
			<v-text-field label="GSID ID No." outlined></v-text-field>
		</v-col>
		<v-col cols="12" md="4">
			<v-text-field label="PAGIBIG ID No." outlined></v-text-field>
		</v-col>
		<v-col cols="12" md="4">
			<v-text-field label="PHILHEALTH TIN ID No." outlined></v-text-field>
		</v-col>
		<v-col cols="12" md="4">
			<v-text-field label="SSS No." outlined></v-text-field>
		</v-col>
		<v-col cols="12" md="4">
			<v-text-field label="TIN No." outlined></v-text-field>
		</v-col>
		<v-col cols="12" md="4">
			<v-text-field label="Agency Employee No." outlined></v-text-field>
		</v-col>
	</v-row>
</template>

<script>
    export default {
        name: "generic-benefit-form"
    };
</script>