<template>
  <v-list color="white">
    <v-list-item three-line>
      <v-list-item-avatar>
        <v-img
          src="../../assets/logo.png"
          lazy-src="../../assets/logo.png"
        ></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="font-weight-bold text-capitalize">{{
          formatFullName(currentAccountProfile)
        }}</v-list-item-title>
        <v-list-item-subtitle class="font-weight-bold"
          >{{ currentAccountEmployeeNumber }}
        </v-list-item-subtitle>
        <v-list-item-subtitle class="text-capitalize"
          >{{ currentAccountDesignation.title }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-subheader>Available Actions</v-subheader>
    <v-container class="py-0">
      <v-text-field
        outlined
        single-line
        placeholder="Search actions"
        dense
        v-model="actionTextQuery"
        autofocus
      ></v-text-field>
    </v-container>
    <template v-for="(action, index) in filteredAccountActions">
      <v-list-item
        :key="index"
        :to="action.to"
        active-class="primary--text active-action-item"
      >
        <v-list-item-icon>
          <v-icon>{{ action.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle class="font-weight-bold black--text">{{
          action.text
        }}</v-list-item-subtitle>
      </v-list-item>
    </template>
    <div class="text-center" v-if="filteredAccountActions.length === 0">
      <span class="overline grey--text">No Actions</span>
    </div>
  </v-list>
</template>
<script>
import customUtilities from "../../common/customUtilities";
import CustomFormSubtitle from "../../components/custom/CustomFormSubtitle";

export default {
  name: "navigation-drawer-content",
  components: { CustomFormSubtitle },
  data() {
    return {
      actionTextQuery: "",
    };
  },

  mixins: [customUtilities],

  computed: {
    currentAccountEmployeeNumber() {
      return this.$store.state.account.current.employeeNumber;
    },

    currentAccountDesignation() {
      return this.$store.state.account.current.designation;
    },

    currentAccountActions() {
      return this.$store.state.account.current.actions;
    },

    currentAccountProfile() {
      return this.$store.state.account.current.profile;
    },

    filteredAccountActions() {
      if (this.actionTextQuery === "") return this.currentAccountActions;
      return this.currentAccountActions.filter((action) => {
        const actionText = action.text.toLowerCase().replace(/ /g, "");
        const actionTextQuery = this.actionTextQuery
          .toLowerCase()
          .replace(/ /g, "");
        return actionText.includes(actionTextQuery);
      });
    },
  },
};
</script>

<style scoped>
.active-action-item {
  border-right: 0.2rem solid #327726;
}
</style>
