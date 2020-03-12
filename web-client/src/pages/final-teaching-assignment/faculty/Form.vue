<template>
	<div>
		<generic-card-back-button title="Final Teaching Assignment Information"></generic-card-back-button>
		<final-teaching-assignment-faculty-credentials></final-teaching-assignment-faculty-credentials>
	</div>
</template>

<script>
    import GenericCardBackButton from "../../../components/generic/CardBackButton";
    import FinalTeachingAssignmentFacultyCredentials
        from "../../../components/final-teaching-assigment/faculty/credentials";
    export default {
        name: "final-teaching-assignment-faculty-form",
        components: {FinalTeachingAssignmentFacultyCredentials, GenericCardBackButton}
    };
</script>