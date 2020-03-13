<template>
	<v-card>
		<generic-card-back-button title="Subject Information"></generic-card-back-button>
		<v-card-text>
			<v-row>
				<v-col cols="12" md="6">
					<v-text-field label="Code"></v-text-field>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field label="Title"></v-text-field>
				</v-col>
				<v-col cols="12" md="8">
					<v-text-field label="Description"></v-text-field>
				</v-col>
				<v-col cols="12" md="4">
					<v-text-field type="number" label="Units"></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-select label="Units"></v-select>
				</v-col>
				<v-col cols="12">
					<v-autocomplete label="Prerequisites"></v-autocomplete>
				</v-col>
			</v-row>
		</v-card-text>
		<v-card-actions>
			<v-btn block color="primary">Submit</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
	import GenericCardBackButton from "../../components/generic/CardBackButton";
    export default {
        components: {GenericCardBackButton}
    }
</script>