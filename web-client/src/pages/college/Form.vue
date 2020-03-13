<template>
	<v-card>
		<generic-card-back-button title="College Information"></generic-card-back-button>
		<v-card-text>
			<v-row>
				<v-col cols="12">
					<v-text-field label="Name"></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-text-field label="Description"></v-text-field>
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