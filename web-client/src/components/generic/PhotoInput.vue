<template>
	<div>
		<label for="file-input" v-model="photoLocal">
			<v-avatar :size="150" class="mb-5" @mouseover="isHover = true" @mouseleave="isHover = false">
				<div class="blue" v-if="isHover"></div>
				<v-img :src="displayPhoto" v-else></v-img>
			</v-avatar>
		</label>
		<input type="file" id="file-input" accept="image/png, image/jpeg, image/bmp" style="display: none;"
			   @change="processFile($event)"/>
	</div>
</template>

<script>
    const imageSelectorValidation = [
        value => !value || value.size < 5000000 || "Image size should be less than 5 MB!"
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
                isHover: false
            };
        },

        computed: {
            displayPhoto() {
                const defaultPhoto = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";
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
                this.$emit("update:photo", val);
            },

            previewLocal(val) {
                this.$emit("update:preview", val);
            },

            preview(val) {
                this.$emit("update:preview", val);
            }
        },

        methods: {
            processFile(event) {
                this.photoLocal = event.target.files[0];
            }
        },

        created() {
            this.previewLocal = this.preview;
            this.photoLocal = this.photo;
        }
    };
</script>