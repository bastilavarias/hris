<template>
	<v-dialog v-model="dialogLocal" max-width="800">
		<template v-slot:activator="{ on }">
			<v-btn color="primary" v-on="on">
				Add Information
			</v-btn>
		</template>
		<v-card>
			<v-card-title>
				<span>Education Details</span>
			</v-card-title>
			<v-card-text>
				<v-row dense>
					<v-col cols="12" md="4">
						<v-select label="Level"></v-select>
					</v-col>
					<v-col cols="12" md="8">
						<v-text-field label="School Name"></v-text-field>
					</v-col>
					<v-col cols="12" md="6">
						<v-text-field label="Education/Degree/Course"></v-text-field>
					</v-col>
					<v-col cols="12" md="3">
						<v-select label="From"></v-select>
					</v-col>
					<v-col cols="12" md="3">
						<v-select label="To"></v-select>
					</v-col>
					<v-col cols="12" md="9">
						<v-text-field label="Highest Level/Unit Earned"></v-text-field>
					</v-col>
					<v-col cols="12" md="3">
						<v-select label="Year Graduated"></v-select>
					</v-col>
					<v-col cols="12" md="12">
						<v-text-field label="Scholarship/Academic Honors"></v-text-field>
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

    export default {
        name: "educational-background-add-information-dialog",

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