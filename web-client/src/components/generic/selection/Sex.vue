<template>
	<v-select :items="sexes"  :label="label" :outlined="outlined" v-model="sexIdLocal"></v-select>
</template>

<script>
    const sexes = [
        "Male",
        "Female"
    ];


    export default {
        name: "generic-sex-selection",

        props: {
            label: {
                type: String,
                required: false
            },

            sexId: {
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
                sexIdLocal: null,
				sexes
            };
        },

        watch: {
            sexId(val) {
                this.sexIdLocal = val;
            },

            sexIdLocal(val) {
                this.$emit("update:sexId", val);
            }
        },

        created() {
            this.sexIdLocal = this.sexId;
        }
    };
</script>