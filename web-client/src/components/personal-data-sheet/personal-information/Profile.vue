<template>

</template>

<script>
    import GenericImageInput from "../../generic/PhotoInput";
    import GenericDateInput from "../../generic/DateInput";

    const sexes = [
        "Male",
        "Female"
    ];

    const civilStatuses = [
        "Single",
        "Maried",
        "Divorced",
        "Separated",
        "Widowed"
    ];

    const bloodTypes = [
        "O+",
        "O-",
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
    ];

    export default {
        name: "personal-data-sheet-profile",
        components: {GenericDateInput, GenericImageInput},

        data() {
            return {
                sexes,
                civilStatuses,
				bloodTypes
            };
        }
    };
</script>