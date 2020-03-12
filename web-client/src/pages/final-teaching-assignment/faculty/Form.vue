<template>
	<v-card>
		<generic-card-back-button title="Final Teaching Assignment Information"></generic-card-back-button>
		<v-card-text>
			<v-row dense></v-row>
		</v-card-text>
		<v-card-actions>
			<v-btn block color="primary">Submit</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
    import GenericCardBackButton from "../../../components/generic/CardBackButton";
    export default {
        name: "final-teaching-assignment-faculty-form",
        components: {GenericCardBackButton}
    };
</script>