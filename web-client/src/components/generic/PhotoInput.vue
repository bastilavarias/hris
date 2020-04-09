<template>
  <div>
    <v-avatar :size="150" class="mb-5">
      <v-img :src="displayPhoto" :lazy-src="displayPhoto"></v-img>
    </v-avatar>
    <v-file-input
      :rules="rules"
      accept="image/png, image/jpeg"
      :placeholder="`${previewLocal ? 'Change the photo' : 'Pick a photo'}`"
      prepend-icon="mdi-camera"
      label="Photo"
      outlined
      v-model="photoLocal"
    ></v-file-input>
  </div>
</template>

<script>
const rules = [
  value =>
    !value || value.size < 5000000 || "Image size should be less than 5 MB!"
];

export default {
  name: "generic-image-input",

  props: {
    photo: {
      required: true
    },

    preview: {
      type: String,
      required: false
    }
  },

  data() {
    return {
      rules,
      photoLocal: null,
      previewLocal: "",
      isHover: false
    };
  },

  computed: {
    displayPhoto() {
      const defaultPhoto =
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";

      if (this.photoLocal) {
        return URL.createObjectURL(this.photoLocal);
      }

      if (this.previewLocal) {
        return this.previewLocal;
      }

      return defaultPhoto;
    }
  },

  watch: {
    photoLocal(val) {
      this.$emit("update:photo", val);
    },

    photo(val) {
      this.photoLocal = val;
    },

    previewLocal(val) {
      this.$emit("update:preview", val);
    },

    preview(val) {
      this.previewLocal = val;
    }
  },

  created() {
    this.previewLocal = this.preview;
    this.photoLocal = this.photo;
  },

  destroyed() {
    this.$emit("update:photo", null);
    this.$emit("update:preview", "");
    this.previewLocal = "";
    this.photoLocal = null;
  }
};
</script>
