<template>
	<v-dialog v-model="dialogLocal" max-width="800">
		<template v-slot:activator="{ on }">
			<v-btn color="primary" v-on="on">
				Add Information
			</v-btn>
		</template>
		<v-card>
			<v-card-title>
				<span>Training Information</span>
			</v-card-title>
			<v-card-text>
				<v-row dense>
					<v-col cols="12" md="12">
						<v-text-field label="Program Title"></v-text-field>
					</v-col>
					<v-col cols="12" md="4">
						<generic-date-input label="From"></generic-date-input>
					</v-col>
					<v-col cols="12" md="4">
						<generic-date-input label="To"></generic-date-input>
					</v-col>
					<v-col cols="12" md="4">
						<v-text-field label="Number Of Hours"></v-text-field>
					</v-col>
					<v-col cols="12" md="4">
						<v-select label="Type Of LD"></v-select>
					</v-col>
					<v-col cols="12" md="8">
						<v-text-field label="Sponsor"></v-text-field>
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

    import GenericDateInput from "../../generic/DateInput";
    export default {
        name: "training-programs-details-add-child-information-dialog",
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