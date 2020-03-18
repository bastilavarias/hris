<template>
	<v-autocomplete :items="cities" item-value="id" item-text="name" :label="label" :outlined="outlined" v-model="cityIdLocal" >
		<template v-slot:item="{item}">
			<v-list-item-content>
				<v-list-item-subtitle class="text-uppercase">{{item.province}}</v-list-item-subtitle>
				<v-list-item-title class="text-capitalize">{{item.name}}</v-list-item-title>
			</v-list-item-content>
		</template>
		<template v-slot:selection="{item}">
			<span class="black--text text-capitalize">{{item.name}}</span>
		</template>
	</v-autocomplete>
</template>

<script>
	import philCities from "philippines/cities";

    export default {
        name: "generic-city-selection",

        props: {
            label: {
                type: String,
                required: false
            },

            cityId: {
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
                cityIdLocal: null,
				cities: []
            };
        },

        watch: {
            cityId(val) {
                this.cityIdLocal = val;
            },

            cityIdLocal(val) {
                this.$emit("update:cityId", val);
            }
        },

        created() {
            this.cityIdLocal = this.cityId;

            this.cities = philCities;
        }
    };
</script>