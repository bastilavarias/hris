<template>
	<v-select :items="bloodTypes" :label="label" :outlined="outlined" v-model="bloodTypeLocal"></v-select>
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

            bloodType: {
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
                bloodTypeLocal: null,
                bloodTypes
            };
        },

        watch: {
            bloodType(val) {
                this.bloodTypeLocal = val;
            },

            bloodTypeLocal(val) {
                this.$emit("update:bloodType", val);
            }
        },

        created() {
            this.bloodTypeLocal = this.bloodType;
        }
    };
</script>