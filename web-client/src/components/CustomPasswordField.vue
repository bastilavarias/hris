<template>
  <v-text-field
    :label="label"
    :type="type"
    :outlined="outlined"
    :append-icon="icon"
    @click:append="shouldReveal = !shouldReveal"
    :error="error"
    :error-messages="errorMessages"
    v-model="passwordLocal"
  ></v-text-field>
</template>

<script>
export default {
  name: "custom-password-field",

  props: {
    error: {
      type: Boolean,
      required: false,
    },

    outlined: {
      type: Boolean,
      required: false,
    },

    errorMessages: {
      type: String,
      required: false,
    },

    label: {
      type: String,
      required: false,
    },

    password: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      shouldReveal: false,
      passwordLocal: "",
    };
  },

  computed: {
    icon() {
      return this.shouldReveal ? "mdi-eye-off" : "mdi-eye";
    },

    type() {
      return this.shouldReveal ? "text" : "password";
    },
  },

  watch: {
    password(val) {
      this.passwordLocal = val;
    },

    passwordLocal(val) {
      this.$emit("update:password", val);
    },
  },

  created() {
    this.passwordLocal = this.password;
  },
};
</script>
