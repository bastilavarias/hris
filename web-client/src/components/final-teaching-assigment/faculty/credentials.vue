<template>
	<v-card>
		<v-card-title>Personal Details</v-card-title>
		<v-card-text>
			<v-row dense>
				<v-col cols="12">
					<v-text-field label="Name"></v-text-field>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field label="College"></v-text-field>
				</v-col>
				<v-col cols="12" md="3">
					<v-text-field label="Rank"></v-text-field>
				</v-col>
				<v-col cols="12" md="3">
					<v-text-field label="PRC License"></v-text-field>
				</v-col>
				<v-col cols="12">
					<generic-list-input label="Academic Qualification"></generic-list-input>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script>
    import GenericListInput from "../../generic/ListInput";

    export default {
        name: "final-teaching-assignment-faculty-credentials",
        components: {GenericListInput}
    };
</script>