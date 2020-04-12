<template>
  <v-card>
    <v-card-title>
      <generic-back-button
        class-name="mb-5"
        title="Room Details"
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
        <v-col cols="12">
          <v-select
            :items="buildings"
            outlined
            item-value="id"
            item-text="name"
            v-model="form.buildingId"
            label="Building"
          >
            <template v-slot:item="{ item }"
              ><span class="text-capitalize">{{ item.name }}</span></template
            >
            <template v-slot:selection="{ item }"
              ><span class="text-capitalize">{{ item.name }}</span></template
            >
          </v-select>
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
  createRoom,
  getSingleRoom,
  setRoomError,
  setRooms,
  updateRoom
} from "../../store/types/room";
import { setActionName } from "../../store/types/action";
import GenericFormActionButton from "../../components/generic/FormActionButton";
import GenericBackButton from "../../components/generic/BackButton";
import customUtilities from "../../services/customUtilities";
import { getAllBuildings } from "../../store/types/building";

const defaultForm = {
  name: "",
  buildingId: null
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
      return this.form.name && this.form.buildingId;
    },

    error() {
      return this.$store.state.room.error;
    },

    buildings() {
      return this.$store.state.building.list;
    }
  },

  watch: {
    "$store.state.action.name"(name) {
      if (name === `${createRoom}-error`) {
        this.$store.commit(setActionName, "");
        this.isLoading = false;
        return;
      }

      if (name === `${updateRoom}-error`) {
        this.$store.commit(setActionName, "");
        this.isLoading = false;
        return;
      }

      if (name === createRoom) {
        this.form = Object.assign({}, this.defaultForm);
        this.$store.commit(setRoomError, []);
        this.$store.commit(setActionName, "");
        this.isLoading = false;
        return;
      }

      if (name === updateRoom) {
        this.form = Object.assign({}, this.defaultForm);
        this.$store.commit(setRoomError, []);
        this.$store.commit(setActionName, "");
        this.$router.push({ name: "room-list" });
      }
    },

    "$store.state.room.current"(room) {
      if (Object.keys(room).length <= 0)
        return this.$router.push({ name: "room-list" });
      this.form.name = room.name;
      this.form.buildingId = room.building.id;
      this.isLoading = false;
    }
  },

  methods: {
    create() {
      const params = {
        name: this.form.name,
        buildingId: this.form.buildingId
      };
      this.$store.dispatch(createRoom, params);
      this.isLoading = true;
    },

    update() {
      const roomId = this.$route.params.roomId;
      const details = {
        name: this.form.name,
        buildingId: this.form.buildingId
      };
      this.$store.dispatch(updateRoom, {
        roomId,
        details
      });
      this.isLoading = true;
    }
  },

  created() {
    this.$store.dispatch(getAllBuildings);
    const operation = this.$route.params.operation;
    if (operation === "update") {
      const roomId = this.$route.params.roomId;
      this.operation = operation;
      this.$store.dispatch(getSingleRoom, roomId);
      this.isLoading = true;
    }
  },

  destroyed() {
    this.$store.commit(setRooms, []);
    this.$store.commit(setRoomError, []);
    this.$store.commit(setActionName, "");
  }
};
</script>
