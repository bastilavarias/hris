<template>
</template>

<script>
    import GenericDepartmentSelection from "../generic/selection/Department";
    import GenericDesignationSelection from "../generic/selection/Designation";
    export default {
        name: "personal-data-sheet-work-information",
        components: {GenericDesignationSelection, GenericDepartmentSelection},
        computed: {
            designations() {
                return this.$store.state.designation.list;
            },
        }
	};
</script>