<template>
	<v-select :items="civilStatuses" :label="label" :outlined="outlined"
			  v-model="civilStatusIdLocal">
	</v-select>
</template>

<script>
    const civilStatuses = [
        "Single",
        "Maried",
        "Divorced",
        "Separated",
        "Widowed"
    ];

    export default {
        name: "generic-civil-status-selection",

        props: {
            label: {
                type: String,
                required: false
            },

            civilStatusId: {
                type: null,
                required: true
            },

            outlined: {
                type: Boolean,
                required: false
            }
        },

        data() {
            return {
                civilStatusIdLocal: null,
                civilStatuses
            };
        },

        watch: {
            civilStatusId(val) {
                this.civilStatusIdLocal = val;
            },

            civilStatusIdLocal(val) {
                this.$emit("update:civilStatusId", val);
            }
        },

        created() {
            this.civilStatusIdLocal = this.civilStatusId;
        }
    };
</script>