<template>
	<v-card>
		<v-card-title>
			Contact Details
		</v-card-title>
		<v-card-text>
			<v-row dense>
				<v-col cols="12" md="6">
					<v-text-field label="Telephone No."></v-text-field>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field label="Mobile No."></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-text-field label="E-mail Address"></v-text-field>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script>
	export default {
	    name: "personal-data-sheet-contact-information"
	}
</script>