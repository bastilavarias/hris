<template>
	<v-dialog v-model="dialogLocal" max-width="800">
		<template v-slot:activator="{ on }">
			<v-btn color="primary" v-on="on">
				Add Information
			</v-btn>
		</template>
		<v-card>
			<v-card-title>
				<span>Work Experience Information</span>
			</v-card-title>
			<v-card-text>
				<v-row dense>
					<v-col cols="12" md="12">
						<v-text-field label="Company"></v-text-field>
					</v-col>
					<v-col cols="12" md="6">
						<v-text-field label="Position"></v-text-field>
					</v-col>
					<v-col cols="12" md="3">
						<generic-date-input label="From"></generic-date-input>
					</v-col>
					<v-col cols="12" md="3">
						<generic-date-input label="To"></generic-date-input>
					</v-col>
					<v-col cols="12" md="6">
						<v-select label="Salary Grade"></v-select>
					</v-col>
					<v-col cols="12" md="3">
						<v-select label="Step Increment"></v-select>
					</v-col>
					<v-col cols="12" md="3">
						<v-select label="Monthly Salary"></v-select>
					</v-col>
					<v-col cols="12" md="7">
						<v-select label="Appointment Status"></v-select>
					</v-col>
					<v-col cols="12" md="5">
						<v-radio-group row label="Is in Govt Service?">
							<v-radio label="Yes" value="yes"></v-radio>
							<v-radio label="No" value="no"></v-radio>
						</v-radio-group>
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
        name: "work-experience-add-information-dialog",
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