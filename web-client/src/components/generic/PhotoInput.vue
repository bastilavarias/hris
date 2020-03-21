<template>
	<div>
		<v-avatar :size="150" class="mb-5">
			<v-img :src="displayPhoto"></v-img>
		</v-avatar>
		<v-file-input
				:rules="imageSelectorValidation"
				accept="image/png, image/jpeg, image/bmp"
				placeholder="Change the photo"
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
            },

            preview: {
                type: String,
                required: false
            }
        },

        data() {
            return {
                imageSelectorValidation,
                photoLocal: null,
                previewLocal: "",
            };
        },

        computed: {
            displayPhoto() {
                const defaultPhoto = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";
                if (this.photoLocal) {
                    return URL.createObjectURL(this.photoLocal);
                }
                if (this.previewLocal) {
                    return require(`../../../../src/file/photos/${this.previewLocal}`);
                }
                return defaultPhoto;
            }
        },

        watch: {
            photoLocal(val) {
                this.$emit("update:photo", val);
            },

            photo(val) {
                this.$emit("update:photo", val);
            },

            previewLocal(val) {
                this.$emit("update:preview", val);
            },

            preview(val) {
                this.$emit("update:preview", val);
            }
        },

        created() {
            this.photoLocal = this.photo;
            this.previewLocal = this.preview;
        }
    };
</script>