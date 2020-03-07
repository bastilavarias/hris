<template>
	<div>
		<v-avatar :size="150" color="grey"></v-avatar>
		<v-file-input
				:rules="imageSelectorValidation"
				accept="image/png, image/jpeg, image/bmp"
				placeholder="Pick an image"
				prepend-icon="mdi-image"
				label="Image"
		></v-file-input>
	</div>
</template>

<script>
    const imageSelectorValidation = [
        value => !value || value.size < 5000000 || "Image size should be less than 5 MB!"
    ];

    export default {
        name: "generic-image-input",

        data() {
            return {
                imageSelectorValidation
            };
        }
    };
</script>