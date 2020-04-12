<template>
  <v-card>
    <v-card-title>
      <generic-back-button
        class-name="mb-5"
        title="Building Details"
      ></generic-back-button>
    </v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col cols="12">
          <v-text-field
            label="Name"
            v-model="form.name"
            outlined
            :error="hasError(error.name)"
            :error-messages="error.name"
            autofocus
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <generic-form-action-button
        :operation="operation"
        :create="create"
        :update="update"
        :disabled="!isFormValid"
        :is-loading="isLoading"
      ></generic-form-action-button>
    </v-card-actions>
  </v-card>
</template>

<script>
import GenericCardBackButton from "../../components/generic/CardBackButton";
import {
  createBuilding,
  getSingleBuilding,
  setBuildingError,
  setBuildings,
  updateBuilding
} from "../../store/types/building";
import { setActionName } from "../../store/types/action";
import GenericFormActionButton from "../../components/generic/FormActionButton";
import GenericBackButton from "../../components/generic/BackButton";
import customUtilities from "../../services/customUtilities";

const defaultForm = {
  name: ""
};

export default {
  components: {
    GenericBackButton,
    GenericFormActionButton,
    GenericCardBackButton
  },

  data() {
    return {
      form: Object.assign({}, defaultForm),
      defaultForm,
      operation: "create",
      isLoading: false
    };
  },

  mixins: [customUtilities],

  computed: {
    isFormValid() {
      return this.form.name;
    },

    error() {
      return this.$store.state.building.error;
    }
  },

  watch: {
    "$store.state.action.name"(name) {
      if (name === `${createBuilding}-error`) {
        this.$store.commit(setActionName, "");
        this.isLoading = false;
        return;
      }

      if (name === `${updateBuilding}-error`) {
        this.$store.commit(setActionName, "");
        this.isLoading = false;
        return;
      }

      if (name === createBuilding) {
        this.form = Object.assign({}, this.defaultForm);
        this.$store.commit(setBuildingError, []);
        this.$store.commit(setActionName, "");
        this.isLoading = false;
        return;
      }

      if (name === updateBuilding) {
        this.form = Object.assign({}, this.defaultForm);
        this.$store.commit(setBuildingError, []);
        this.$store.commit(setActionName, "");
        this.$router.push({ name: "building-list" });
      }
    },

    "$store.state.building.current"(building) {
      if (Object.keys(building).length <= 0)
        return this.$router.push({ name: "building-list" });
      this.form.name = building.name;
      this.isLoading = false;
    }
  },

  methods: {
    create() {
      this.$store.dispatch(createBuilding, this.form);
      this.isLoading = true;
    },

    update() {
      const buildingId = this.$route.params.buildingId;
      this.$store.dispatch(updateBuilding, {
        buildingId,
        details: {
          name: this.form.name
        }
      });
      this.isLoading = true;
    }
  },

  created() {
    const operation = this.$route.params.operation;
    if (operation === "update") {
      const buildingId = this.$route.params.buildingId;
      this.operation = operation;
      this.$store.dispatch(getSingleBuilding, buildingId);
      this.isLoading = true;
    }
  },

  destroyed() {
    this.$store.commit(setBuildings, []);
    this.$store.commit(setBuildingError, []);
    this.$store.commit(setActionName, "");
  }
};
</script>
