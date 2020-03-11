<template>
	<v-card>
		<generic-card-back-button title="Room Information"></generic-card-back-button>
		<v-card-text>
			<v-row>
				<v-col cols="12">
					<v-text-field label="Name"></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-autocomplete label="Room"></v-autocomplete>
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
        name: "room-form",
        components: {GenericCardBackButton}
    }
</script>