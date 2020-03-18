<template>
	<v-select :items="sexes"  :label="label" :outlined="outlined" v-model="sexLocal"></v-select>
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

            sex: {
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
                sexLocal: null,
				sexes
            };
        },

        watch: {
            sex(val) {
                this.sexLocal = val;
            },

            sexLocal(val) {
                this.$emit("update:sex", val);
            }
        },

        created() {
            this.sexLocal = this.sex;
        }
    };
</script>