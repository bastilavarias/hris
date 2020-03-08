<template>
	<v-card-text>
		<v-row dense>
			<v-col cols="12">
				<v-text-field label="Employee Number"></v-text-field>
			</v-col>
			<v-col cols="12">
				<v-select label="Status"></v-select>
			</v-col>
			<v-col cols="12">
				<v-select label="Position"></v-select>
			</v-col>
			<v-col cols="6">
				<v-select label="Salary Grade"></v-select>
			</v-col>
			<v-col cols="3">
				<v-select label="Step Increment"></v-select>
			</v-col>
			<v-col cols="3">
				<v-text-field label="Salary" readonly></v-text-field>
			</v-col>
		</v-row>
	</v-card-text>
</template>

<script>
    export default {
        name: "personal-data-sheet-work-information"
    };
</script>