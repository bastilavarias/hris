<template>
	<v-card>
		<v-card-title>Benefits</v-card-title>
		<v-card-text>
			<v-row dense>
				<v-col cols="12" md="4">
					<v-text-field label="GSIS ID No." placeholder="XXXX-XXX-XXX"></v-text-field>
				</v-col>
				<v-col cols="12" md="4">
					<v-text-field label="PAGIBIG ID No." placeholder="XXXX-XXX-XXX"></v-text-field>
				</v-col>
				<v-col cols="12" md="4">
					<v-text-field label="PHILHEALTH TIN ID No." placeholder="XXXX-XXX-XXX"></v-text-field>
				</v-col>
				<v-col cols="12" md="4">
					<v-text-field label="SSS No." placeholder="XXXX-XXX-XXX"></v-text-field>
				</v-col>
				<v-col cols="12" md="4">
					<v-text-field label="TIN No." placeholder="XXXX-XXX-XXX"></v-text-field>
				</v-col>
				<v-col cols="12" md="4">
					<v-text-field label="Agency Employee No." placeholder="XXXX-XXX-XXX"></v-text-field>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script>
	export default {
	    name: "personal-data-sheet-benefits-information"
	}
</script>