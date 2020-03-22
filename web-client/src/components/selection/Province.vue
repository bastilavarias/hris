<template>
	<v-autocomplete :items="provinces" item-value="name" item-text="name" :label="label" :outlined="outlined"
					v-model="provinceLocal" autocomplete="none">
		<template v-slot:item="{item}">
			<v-list-item-content>
				<v-list-item-subtitle class="text-uppercase">{{item.region}}</v-list-item-subtitle>
				<v-list-item-title class="text-capitalize">{{item.name}}</v-list-item-title>
			</v-list-item-content>
		</template>
		<template v-slot:selection="{item}">
			<span class="black--text text-capitalize">{{item.name}}</span>
		</template>
	</v-autocomplete>
</template>

<script>
    import philCities from "philippines/provinces";

    export default {
        name: "generic-province-selection",

        props: {
            label: {
                type: String,
                required: false
            },

            province: {
                type: String,
                required: true
            },

            outlined: {
                type: Boolean,
                required: false
            }
        },

        data() {
            return {
                provinceLocal: "",
                provinces: []
            };
        },

        watch: {
            province(val) {
                this.$emit("update:province", val);
            },

            provinceLocal(val) {
                this.$emit("update:province", val);
            }
        },

        created() {
            this.provinceLocal = this.province;
            this.provinces = philCities;
        }
    };
</script>