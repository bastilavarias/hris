<template>
	<v-dialog v-model="dialogLocal" max-width="500">
		<template v-slot:activator="{ on }">
			<v-btn small color="primary" v-on="on">
				Add Child Information
			</v-btn>
		</template>
		<v-card>
			<v-card-title>
				<span>Child Information</span>
			</v-card-title>
			<v-card-text>
				<v-row dense>
					<v-col cols="12">
						<v-text-field label="Name"></v-text-field>
					</v-col>
					<v-col cols="12">
						<generic-date-input label="Birth Date"></generic-date-input>
					</v-col>
				</v-row>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn text @click="dialogLocal = false">Cancel</v-btn>
				<v-btn color="primary">Save</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
    import GenericDateInput from "../generic/DateInput";

    export default {
        name: "family-background-add-child-information-dialog",
        components: {GenericDateInput},
        props: {
            dialog: {
                type: Boolean,
                required: true
            }
        },

        data() {
            return {
                dialogLocal: false
            };
        },

        watch: {
            dialog(value) {
                this.dialogLocal = value;
            },

            dialogLocal(value) {
                this.$emit("update:dialog", value);
            }
        },

        created() {
            this.dialogLocal = this.dialog;
        }
    };
</script>