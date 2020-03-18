<template>
</template>

<script>
    import GenericDepartmentSelection from "../selection/Department";
    import GenericDesignationSelection from "../selection/Designation";
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