<template>
	<v-autocomplete :items="citizens" item-value="value" item-text="value" :label="label" :outlined="outlined" multiple
					v-model="citizensIdLocal">
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
        name: "generic-citizen-selection",

        props: {
            label: {
                type: String,
                required: false
            },

            citizensId: {
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
                citizensIdLocal: [],
                citizens: []
            };
        },

        watch: {
            citizenId(val) {
                this.citizensIdLocal = val;
            },

            citizensIdLocal(val) {
                this.$emit("update:citizenId", val);
            }
        },

        created() {
            this.citizensIdLocal = this.citizensId;
            this.citizens = nationalities.all;
        }
    };
</script>