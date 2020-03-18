<template>
	<div>
		<v-avatar :size="150" :color="preview ? 'transparent' : 'grey'" class="mb-5">
			<v-img :src="preview"></v-img>
		</v-avatar>
		<v-file-input
				:rules="imageSelectorValidation"
				accept="image/png, image/jpeg, image/bmp"
				placeholder="Pick a photo"
				prepend-icon="mdi-image"
				label="Photo"
				outlined
				v-model="photoLocal"
		></v-file-input>
	</div>
</template>

<script>
    const imageSelectorValidation = [
        value => !value || value.size < 3000000 || "Image size should be less than 5 MB!"
    ];

    export default {
        name: "generic-image-input",

		props: {
            photo: {
                required: true
			}
		},

        data() {
            return {
                imageSelectorValidation,
                photoLocal: null
            };
        },

        computed: {
            preview() {
                return this.photoLocal ? URL.createObjectURL(this.photoLocal) : "";
            }
        },

		watch: {
            photoLocal(val) {
                this.$emit("update:photo", val);
			},

			photo(val) {
                this.photoLocal = val;
			}
		},

		created() {
            this.photoLocal = this.photo;
        }
    };
</script>