<template>
	<div>
		<p class="black--text body-2 d-block">{{sampleQuestion}}</p>
		<v-radio-group row>
			<v-radio label="Yes" value="yes"></v-radio>
			<v-radio label="No" value="no"></v-radio>
		</v-radio-group>
		<v-text-field label="Details"></v-text-field>
	</div>
</template>

<script>
    export default {
        name: "generic-question-item",

        data() {
            return {
                sampleQuestion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est iusto nobis quis quos unde voluptatibus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est iusto nobis quis quos unde voluptatibus!"
            };
        }
    };
</script>