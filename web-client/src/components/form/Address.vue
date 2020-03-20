<template>
	<v-row dense>
		<v-col cols="12" md="6">
			<v-text-field label="House/Block/Lot No." outlined v-model="houseNumberLocal"></v-text-field>
		</v-col>
		<v-col cols="12" md="6">
			<v-text-field label="Street" outlined v-model="streetLocal"></v-text-field>
		</v-col>
		<v-col cols="12" md="6">
			<v-text-field label="Subdivision/Village" outlined v-model="subdivisionLocal"></v-text-field>
		</v-col>
		<v-col cols="12" md="6">
			<v-text-field label="Barangay" outlined v-model="barangayLocal"></v-text-field>
		</v-col>
		<v-col cols="12" md="6">
			<generic-city-selection :city.sync="cityIdLocal" label="City/Municipality" outlined></generic-city-selection>
		</v-col>
		<v-col cols="12" md="6">
			<generic-province-selection outlined label="Province" :province.sync="provinceIdLocal"></generic-province-selection>
		</v-col>
		<v-col cols="12" md="12">
			<v-text-field label="Zip Code" outlined v-model="zipCodeLocal"></v-text-field>
		</v-col>
	</v-row>
</template>

<script>
    import GenericCitySelection from "../selection/City";
    import GenericProvinceSelection from "../selection/Province";

    export default {
        name: "generic-address-form",
        components: {GenericProvinceSelection, GenericCitySelection},

        props: {
            houseNumber: {
                type: String,
                required: true
            },
            street: {
                type: String,
                required: true
            },
            subdivision: {
                type: String,
                required: true
            },
            barangay: {
                type: String,
                required: true
            },
            cityId: {
                required: true
            },
            provinceId: {
                required: true
            },
            zipCode: {
                type: String,
                required: true
            },
        },

        data() {
            return {
                houseNumberLocal: "",
                streetLocal: "",
                subdivisionLocal: "",
                barangayLocal: "",
                cityIdLocal: null,
                provinceIdLocal: null,
                zipCodeLocal: ""
            };
        },

		watch: {
            houseNumber(val) {
                this.$emit("update:houseNumber", val);
			},
            houseNumberLocal(val) {
                this.$emit("update:houseNumber", val);
			},
			street(val) {
                this.$emit("update:street", val);
			},
            streetLocal(val) {
                this.$emit("update:street", val);
			},
			subdivision(val) {
                this.$emit("update:subdivision", val);
			},
            subdivisionLocal(val) {
                this.$emit("update:subdivision", val);
			},
            barangay(val) {
                this.$emit("update:barangay", val);
            },
            barangayLocal(val) {
                this.$emit("update:barangay", val);
            },
            cityId(val) {
                this.$emit("update:cityId", val);
            },
            cityIdLocal(val) {
                this.$emit("update:cityId", val);
            },
            provinceId(val) {
                this.$emit("update:provinceId", val);
            },
            provinceIdLocal(val) {
                this.$emit("update:provinceId", val);
            },
            zipCode(val) {
                this.$emit("update:zipCode", val);
            },
            zipCodeLocal(val) {
                this.$emit("update:zipCode", val);
            }
		},

		created() {
            this.houseNumberLocal = this.houseNumber;
            this.streetLocal = this.street;
            this.subdivisionLocal = this.subdivision;
            this.barangayLocal = this.barangay;
            this.cityIdLocal = this.cityId;
            this.provinceIdLocal = this.provinceId;
            this.zipCodeLocal = this.zipCode;
        }
    };
</script>