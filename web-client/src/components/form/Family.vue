<template>
  <v-row dense>
    <v-col cols="12">
      <v-text-field
        label="Fist Name"
        outlined
        v-model="firstNameLocal"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-text-field
        label="Middle Name"
        outlined
        v-model="middleNameLocal"
      ></v-text-field>
    </v-col>
    <v-col cols="10">
      <v-text-field
        label="Surname"
        outlined
        v-model="lastNameLocal"
      ></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-text-field
        label="Extension"
        outlined
        v-model="extensionLocal"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
import GenericCitySelection from "../generic/selection/City";
export default {
  name: "generic-family-form",
  components: { GenericCitySelection },

  props: {
    firstName: {
      type: String,
      required: true
    },

    middleName: {
      type: String,
      required: true
    },

    lastName: {
      type: String,
      required: true
    },

    extension: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      firstNameLocal: "",
      middleNameLocal: "",
      lastNameLocal: "",
      extensionLocal: ""
    };
  },

  watch: {
    firstName(val) {
      this.$emit("update:firstName", val);
    },

    firstNameLocal(val) {
      this.$emit("update:firstName", val);
    },

    middleName(val) {
      this.$emit("update:middleName", val);
    },

    middleNameLocal(val) {
      this.$emit("update:middleName", val);
    },

    lastName(val) {
      this.$emit("update:lastName", val);
    },

    lastNameLocal(val) {
      this.$emit("update:lastName", val);
    },

    extension(val) {
      this.$emit("update:extension", val);
    },

    extensionLocal(val) {
      this.$emit("update:extension", val);
    }
  },

  created() {
    this.firstNameLocal = this.firstName;
    this.middleNameLocal = this.middleName;
    this.lastNameLocal = this.lastName;
    this.extensionLocal = this.extension;
  }
};
</script>
