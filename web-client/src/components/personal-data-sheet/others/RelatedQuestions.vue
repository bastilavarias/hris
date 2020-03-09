<template>
	<v-card>
		<v-card-title>Related Questions</v-card-title>
		<v-card-text>
			<related-question-item></related-question-item>
			<related-question-item></related-question-item>
		</v-card-text>
	</v-card>
</template>

<script>
	import RelatedQuestionItem from "./RelatedQuestionItem";
    export default {
	    name: "personal-data-sheet-related-questions",
        components: {RelatedQuestionItem}
    }
</script>