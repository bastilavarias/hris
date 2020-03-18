<template>
	<v-autocomplete :items="citizens" item-value="value" item-text="value" :label="label" :outlined="outlined" multiple
					v-model="citizenshipLocal">
		<template v-slot:item="{item}">
			<span class="black--text text-capitalize">{{item.value}}</span>
		</template>
		<template v-slot:selection="{item}">
			<v-chip><span class="black--text text-capitalize">{{item.value}}</span></v-chip>
		</template>
	</v-autocomplete>
</template>

<script>
    import nationalities from "nationalities/src";

    export default {
        name: "generic-citizenship-selection",

        props: {
            label: {
                type: String,
                required: false
            },

            citizenship: {
                type: Array,
                required: true
            },

            outlined: {
                type: Boolean,
                required: false
            }
        },

        data() {
            return {
                citizenshipLocal: [],
                citizens: []
            };
        },

        watch: {
            citizenship(val) {
                this.citizenshipLocal = val;
            },

            citizenshipLocal(val) {
                this.$emit("update:citizenship", val);
            }
        },

        created() {
            this.citizenshipLocal = this.citizens;
            this.citizens = nationalities.all;
        }
    };
</script>