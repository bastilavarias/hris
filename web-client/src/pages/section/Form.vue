<template>
	<v-card>
		<generic-card-back-button title="Section Information"></generic-card-back-button>
		<v-card-text>
			<v-row>
				<v-col cols="12">
					<v-text-field label="Name"></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-text-field label="Description"></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-autocomplete label="College"></v-autocomplete>
				</v-col>
				<v-col cols="12">
					<v-autocomplete label="Department"></v-autocomplete>
				</v-col>
				<v-col cols="12" md="8">
					<v-autocomplete label="Course"></v-autocomplete>
				</v-col>
				<v-col cols="12" md="4">
					<v-select label="Year"></v-select>
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
        name: "section-form",
        components: {GenericCardBackButton}
    }
</script>