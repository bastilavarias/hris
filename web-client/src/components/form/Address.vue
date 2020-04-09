<template>
  <v-row dense>
    <v-col cols="12" md="6">
      <v-text-field
        label="House/Block/Lot No."
        outlined
        v-model="houseNumberLocal"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6">
      <v-text-field
        label="Street"
        outlined
        v-model="streetLocal"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6">
      <v-text-field
        label="Subdivision/Village"
        outlined
        v-model="subdivisionLocal"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6">
      <v-text-field
        label="Barangay"
        outlined
        v-model="barangayLocal"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6">
      <generic-city-selection
        :city.sync="cityLocal"
        label="City/Municipality"
        outlined
      ></generic-city-selection>
    </v-col>
    <v-col cols="12" md="6">
      <generic-province-selection
        outlined
        label="Province"
        :province.sync="provinceLocal"
      ></generic-province-selection>
    </v-col>
    <v-col cols="12" md="12">
      <v-text-field
        label="Zip Code"
        outlined
        v-model="zipCodeLocal"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
import GenericCitySelection from "../generic/selection/City";
import GenericProvinceSelection from "../generic/selection/Province";

export default {
  name: "generic-address-form",
  components: { GenericProvinceSelection, GenericCitySelection },

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
    city: {
      type: String,
      required: true
    },
    province: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      houseNumberLocal: "",
      streetLocal: "",
      subdivisionLocal: "",
      barangayLocal: "",
      cityLocal: "",
      provinceLocal: null,
      zipCodeLocal: ""
    };
  },

  watch: {
    houseNumber(val) {
      this.houseNumberLocal = val;
    },
    houseNumberLocal(val) {
      this.$emit("update:houseNumber", val);
    },
    street(val) {
      this.streetLocal = val;
    },
    streetLocal(val) {
      this.$emit("update:street", val);
    },
    subdivision(val) {
      this.subdivisionLocal = val;
    },
    subdivisionLocal(val) {
      this.$emit("update:subdivision", val);
    },
    barangay(val) {
      this.barangayLocal = val;
    },
    barangayLocal(val) {
      this.$emit("update:barangay", val);
    },
    city(val) {
      this.cityLocal = val;
    },
    cityLocal(val) {
      this.$emit("update:city", val);
    },
    province(val) {
      this.provinceLocal = val;
    },
    provinceLocal(val) {
      this.$emit("update:province", val);
    },
    zipCode(val) {
      this.zipCodeLocal = val;
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
    this.cityLocal = this.city;
    this.provinceLocal = this.province;
    this.zipCodeLocal = this.zipCode;
  }
};
</script>
