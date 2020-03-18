<template>
	<v-select :items="civilStatuses" :label="label" :outlined="outlined"
			  v-model="civilStatusLocal">
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

            civilStatus: {
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
                civilStatusLocal: null,
                civilStatuses
            };
        },

        watch: {
            civilStatus(val) {
                this.civilStatusLocal = val;
            },

            civilStatusLocal(val) {
                this.$emit("update:civilStatus", val);
            }
        },

        created() {
            this.civilStatusLocal = this.civilStatus;
        }
    };
</script>