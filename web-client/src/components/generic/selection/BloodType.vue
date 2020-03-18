<template>
	<v-select :items="bloodTypes" :label="label" :outlined="outlined" v-model="bloodTypeIdLocal"></v-select>
</template>

<script>
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
        name: "generic-blood-type-selection",

        props: {
            label: {
                type: String,
                required: false
            },

            bloodTypeId: {
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
                bloodTypeIdLocal: null,
                bloodTypes
            };
        },

        watch: {
            bloodTypeId(val) {
                this.bloodTypeIdLocal = val;
            },

            bloodTypeIdLocal(val) {
                this.$emit("update:bloodTypeId", val);
            }
        },

        created() {
            this.bloodTypeIdLocal = this.bloodTypeId;
        }
    };
</script>