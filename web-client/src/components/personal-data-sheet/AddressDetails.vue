<template>
	<v-card>
		<v-row dense>
			<v-col cols="12" md="6">
				<v-card-subtitle>
					Residential Address
				</v-card-subtitle>
				<v-card-text>
					<v-row dense>
						<v-col cols="12" md="6">
							<v-text-field label="House/Block/Lot No."></v-text-field>
						</v-col>
						<v-col cols="12" md="6">
							<v-text-field label="Street"></v-text-field>
						</v-col>
						<v-col cols="12" md="6">
							<v-text-field label="Subdivision/Village"></v-text-field>
						</v-col>
						<v-col cols="12" md="6">
							<v-text-field label="Barangay"></v-text-field>
						</v-col>
						<v-col cols="12" md="6">
							<v-select label="City/Municipality"></v-select>
						</v-col>
						<v-col cols="12" md="6">
							<v-select label="Province"></v-select>
						</v-col>
						<v-col cols="12">
							<v-text-field label="ZIP Code"></v-text-field>
						</v-col>
					</v-row>
				</v-card-text>
			</v-col>
			<v-col cols="12" md="6">
				<v-card-subtitle>
					Permanent Address
				</v-card-subtitle>
				<v-card-text>
					<v-row dense>
						<v-col cols="12" md="6">
							<v-text-field label="House/Block/Lot No."></v-text-field>
						</v-col>
						<v-col cols="12" md="6">
							<v-text-field label="Street"></v-text-field>
						</v-col>
						<v-col cols="12" md="6">
							<v-text-field label="Subdivision/Village"></v-text-field>
						</v-col>
						<v-col cols="12" md="6">
							<v-text-field label="Barangay"></v-text-field>
						</v-col>
						<v-col cols="12" md="6">
							<v-select label="City/Municipality"></v-select>
						</v-col>
						<v-col cols="12" md="6">
							<v-select label="Province"></v-select>
						</v-col>
						<v-col cols="12">
							<v-text-field label="ZIP Code"></v-text-field>
						</v-col>
					</v-row>
				</v-card-text>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
	export default {
	    name: "personal-data-sheet-address-details"
	}
</script>