<template>
	<v-data-table hide-default-footer :headers="tableHeaders" :items="referencesLocal">
		<template v-slot:top>
			<v-row no-gutters>
				<div class="flex-grow-1"></div>
				<v-dialog v-model="dialog" max-width="800">
					<template v-slot:activator="{ on }">
						<v-btn color="primary" v-on="on">
							Add Information
						</v-btn>
					</template>
					<v-card>
						<v-card-title>
							<span>License Information</span>
						</v-card-title>
						<v-card-text>
							<v-row dense>
								<v-col cols="12" md="12">
									<v-text-field label="Name" outlined v-model="form.name"></v-text-field>
								</v-col>
								<v-col cols="12" md="12">
									<v-text-field label="Address" outlined v-model="form.address"></v-text-field>
								</v-col>
								<v-col cols="12" md="12">
									<v-text-field label="Contact No." outlined v-model="form.contactNumber"></v-text-field>
								</v-col>
							</v-row>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn text @click="dialog = false">Cancel</v-btn>
							<v-btn color="primary" :disabled="!isFormValid" @click="add">Save</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-row>
		</template>
		<template v-slot:item.name="{item}">
			<span class="text-capitalize">{{item.name ? item.name : "N/A"}}</span>
		</template>
		<template v-slot:item.address="{item}">
			<span class="text-capitalize">{{item.address ? item.address : "N/A"}}</span>
		</template>
		<template v-slot:item.contactNumber="{item}">
			<span class="text-capitalize">{{item.contactNumber ? item.contactNumber : "N/A"}}</span>
		</template>
		<template v-slot:item.action="{item}">
			<v-btn icon @click="remove(item)">
				<v-icon>mdi-trash-can</v-icon>
			</v-btn>
		</template>
	</v-data-table>
</template>

<script>
    import GenericDateInput from "../generic/DateInput";
    import customUtilities from "../../services/customUtilities";
    import GenericYearSelection from "../selection/Year";

    const tableHeaders = [
        {
            text: "Name",
            value: "name"

        },
        {
            text: "Address",
            value: "address"

        },
        {
            text: "Contact No.",
            value: "contactNumber"

        },
        {text: "Action", value: "action", align: "right"}
    ];

    const defaultForm = {
        name: "",
		address: "",
		contactNumber: ""
    };

    export default {
        name: "generic-voluntary-work-experience",
        components: {GenericYearSelection, GenericDateInput},

        props: {
            references: {
                type: Array,
                required: true
            }
        },

        data() {
            return {
                dialog: false,
                tableHeaders,
                referencesLocal: [],
                form: Object.assign({}, defaultForm),
                defaultForm
            };
        },

        mixins: [customUtilities],

        computed: {
            isFormValid() {
                return this.form.name && this.form.address && this.form.contactNumber;
            }
        },

        watch: {
            references(val) {
                this.$emit("update:references", val);
            },
            referencesLocal(val) {
                this.$emit("update:references", val);
            }
        },

        methods: {
            add() {
                if (this.form.name && this.form.address && this.form.contactNumber) {
                    this.referencesLocal = [
                        ...this.referencesLocal,
                        this.form
                    ];
                    this.clearForm();
                }
            },

            remove(row) {
                const position = this.referencesLocal.indexOf(row);
                this.referencesLocal = this.referencesLocal.filter((_, index) => position !== index);
            },

            clearForm() {
                this.form = Object.assign({}, this.defaultForm);
            }
        },

        created() {
            this.referencesLocal = this.references;
        }
    };
</script>