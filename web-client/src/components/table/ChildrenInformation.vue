<template>
	<v-data-table hide-default-footer :headers="tableHeaders" :items="childrenLocal">
		<template v-slot:top>
			<v-row no-gutters>
				<div class="flex-grow-1"></div>
				<v-dialog v-model="dialog" max-width="500">
					<template v-slot:activator="{ on }">
						<v-btn color="primary" v-on="on">
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
									<v-text-field label="Name" outlined v-model="form.name"></v-text-field>
								</v-col>
								<v-col cols="12">
									<generic-date-input label="Birth Date" outlined
														:date.sync="form.birthDate"></generic-date-input>
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
			<div class="text-capitalize">{{item.name}}</div>
		</template>
		<template v-slot:item.birthDate="{item}">
			<div class="text-capitalize">{{formatDate(item.birthDate)}}</div>
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

    const tableHeaders = [
        {
            text: "Name",
            value: "name"
        },
        {
            text: "Birth Date",
            value: "birthDate"
        },
        {
            text: "Action",
			value: "action"
        }
    ];

    const defaultForm = {
        name: "",
        birthDate: ""
    };

    export default {
        name: "generic-children-information-table",
        components: {GenericDateInput},

        props: {
            children: {
                type: Array,
                required: true
            }
        },

        data() {
            return {
                tableHeaders,
                dialog: false,
                childrenLocal: [],
                form: Object.assign({}, defaultForm),
                defaultForm
            };
        },

        mixins: [customUtilities],

        computed: {
            isFormValid() {
                return this.form.name && this.form.birthDate;
            }
        },

        watch: {
            children(val) {
                this.$emit("update:children", val);
            }
        },

        methods: {
            add() {
                if (this.form.name && this.form.birthDate) {
                    this.childrenLocal = [...this.childrenLocal, {
                        name: this.form.name,
                        birthDate: this.form.birthDate
                    }];
                    this.$emit("update:children", this.childrenLocal);
                    this.clearForm();
                }
            },

			remove(row) {
                const position = this.childrenLocal.indexOf(row);
                this.childrenLocal = this.childrenLocal.filter((_, index) => position !== index);
                this.$emit("update:children", this.childrenLocal);
            },

			clearForm() {
                this.form = Object.assign({}, this.defaultForm);
			}
        },

        created() {
            this.childrenLocal = this.children;
        }
    };
</script>