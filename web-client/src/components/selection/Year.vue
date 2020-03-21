<template>
	<v-autocomplete :items="years" :label="label" :outlined="outlined"
					v-model="yearLocal" autocomplete="none"></v-autocomplete>
</template>

<script>
    export default {
        name: "generic-year-selection",

        props: {
            label: {
                type: String,
                required: false
            },

            year: {
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
                yearLocal: null,
                years: []
            };
        },

        computed: {
            yearList() {
                const date = new Date();
                let currentYear = date.getFullYear();
                let list = [];
                let shouldContinue = true;
                while (shouldContinue) {
                    list = [...list, currentYear];
                    currentYear--;
                    if (currentYear === 1919) shouldContinue = false;
                }
                return list;
            }
        },

        watch: {
            year(val) {
                this.yearLocal = val;
            },

            yearLocal(val) {
                this.$emit("update:year", val);
            }
        },

        created() {
            this.years = this.yearList;
            this.yearLocal = this.year;
        }
    };
</script>