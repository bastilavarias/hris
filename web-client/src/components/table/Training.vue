<template>
	<v-data-table hide-default-footer :headers="tableHeaders" :items="trainingsLocal">
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
								<v-col cols="12">
									<v-text-field label="Title" outlined v-model="form.title"></v-text-field>
								</v-col>
								<v-col cols="12" md="6">
									<generic-date-input label="From" outlined
														:date.sync="form.dateFrom">
									</generic-date-input>
								</v-col>
								<v-col cols="12" md="6">
									<generic-date-input label="To" outlined
														:date.sync="form.dateTo">
									</generic-date-input>
								</v-col>
								<v-col cols="12" md="12">
									<v-text-field type="number" label="Total Number Of Hours" outlined
												  v-model="form.hoursNumber"></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field label="Type" outlined v-model="form.type"></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field label="Sponsor" outlined v-model="form.sponsor"></v-text-field>
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
		<template v-slot:item.title="{item}">
			<span class="text-capitalize">{{item.title ? item.title : "N/A"}}</span>
		</template>
		<template v-slot:item.date="{item}">
			{{item.dateFrom ? formatDate(item.dateFrom) : "N/A"}} - {{item.dateTo ? formatDate(item.dateTo) :
			"N/A"}}
		</template>
		<template v-slot:item.type="{item}">
			<span class="text-capitalize">{{item.type ? item.type : "N/A"}}</span>
		</template>
		<template v-slot:item.sponsor="{item}">
			<span class="text-capitalize">{{item.sponsor ? item.sponsor : "N/A"}}</span>
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
            text: "Title",
            value: "title",
            align: "left"
        },
        {
            text: "Date",
            value: "date"

        },
        {
            text: "Type",
            value: "type"

        },
        {
            text: "Sponsor",
            value: "sponsor"

        },
        {text: "Action", value: "action", align: "right"}
    ];

    const defaultForm = {
        title: "",
        dateFrom: null,
        dateTo: null,
        hoursNumber: 0,
        type: "",
        sponsor: ""
    };

    export default {
        name: "generic-training-table",
        components: {GenericYearSelection, GenericDateInput},

        props: {
            trainings: {
                type: Array,
                required: true
            }
        },

        data() {
            return {
                dialog: false,
                tableHeaders,
                trainingsLocal: [],
                form: Object.assign({}, defaultForm),
                defaultForm
            };
        },

        mixins: [customUtilities],

        computed: {
            isFormValid() {
                return this.form.title;
            }
        },

        watch: {
            trainings(val) {
                this.$emit("update:trainings", val);
            },
            trainingsLocal(val) {
                this.$emit("update:trainings", val);
            }
        },

        methods: {
            add() {
                if (this.form.title) {
                    this.trainingsLocal = [
                        ...this.trainingsLocal,
                        this.form
                    ];
                    this.clearForm();
                }
            },

            remove(row) {
                const position = this.trainingsLocal.indexOf(row);
                this.trainingsLocal = this.trainingsLocal.filter((_, index) => position !== index);
            },

            clearForm() {
                this.form = Object.assign({}, this.defaultForm);
            }
        },

        created() {
            this.trainingsLocal = this.trainings;
        }
    };
</script>