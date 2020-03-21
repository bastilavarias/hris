<template>
	<v-data-table hide-default-footer :headers="tableHeaders" :items="workExperiencesLocal">
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
								<v-col cols="12" md="8">
									<v-text-field label="Company" outlined v-model="form.company"></v-text-field>
								</v-col>
								<v-col cols="12" md="4">
									<v-text-field label="Position" outlined v-model="form.position"></v-text-field>
								</v-col>
								<v-col cols="12" md="6">
									<v-select label="Salary Grade" outlined v-model="form.salaryGrade"></v-select>
								</v-col>
								<v-col cols="12" md="3">
									<v-select label="Step Increment" outlined v-model="form.stepIncement"></v-select>
								</v-col>
								<v-col cols="12" md="3">
									<v-text-field label="Monthly Salary" outlined v-model="form.salary"></v-text-field>
								</v-col>
								<v-col cols="12" md="6">
									<generic-year-selection outlined label="From"
															:year.sync="form.yearFrom"></generic-year-selection>
								</v-col>
								<v-col cols="12" md="6">
									<generic-year-selection outlined label="To"
															:year.sync="form.yearTo"></generic-year-selection>
								</v-col>
								<v-col cols="12" md="6">
									<v-radio-group row label="Full time" v-model="form.isFullTime">
										<v-radio label="Yes" :value="true"></v-radio>
										<v-radio label="No" :value="false"></v-radio>
									</v-radio-group>
								</v-col>
								<v-col cols="12" md="6">
									<v-radio-group row label="Government Service" v-model="form.isGovernmentService">
										<v-radio label="Yes" :value="true"></v-radio>
										<v-radio label="No" :value="false"></v-radio>
									</v-radio-group>
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
		<template v-slot:item.company="{item}">
			<span class="text-capitalize">{{item.company ? item.company : "N/A"}}</span>
		</template>
		<template v-slot:item.position="{item}">
			<span class="text-capitalize">{{item.position ? item.position : "N/A"}}</span>
		</template>
		<template v-slot:item.date="{item}">
			{{item.yearFrom ? item.yearFrom : "N/A"}} - {{item.yearTo ? item.yearTo :
			"N/A"}}
		</template>
		<template v-slot:item.isFullTime="{item}">
			{{item.isFullTime ? "Yes" : "No"}}
		</template>
		<template v-slot:item.isGovernmentService="{item}">
			{{item.isGovernmentService ? "Yes" : "No"}}
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
            text: "Company",
            value: "company",
            align: "left"
        },
        {
            text: "Position",
            value: "position"

        },
        {
            text: "Date",
            value: "date"

        },
        {
            text: "Monthly Salary",
            value: "salary"
        },
        {
            text: "Appointment Status",
            value: "isFullTime"
        },
        {
            text: "Government Service",
            value: "isGovernmentService"
        },
        {text: "Action", value: "action", align: "right"}
    ];
    const defaultForm = {
        company: "",
        position: "",
        yearFrom: null,
        yearTo: null,
        salaryGrade: null,
        stepIncement: null,
        salary: "",
        isFullTime: null,
        isGovernmentService: null
    };

    export default {
        name: "generic-work-experience",
        components: {GenericYearSelection, GenericDateInput},

        props: {
            workExperiences: {
                type: Array,
                required: true
            }
        },

        data() {
            return {
                dialog: false,
                tableHeaders,
                workExperiencesLocal: [],
                form: Object.assign({}, defaultForm),
                defaultForm
            };
        },

        mixins: [customUtilities],

        computed: {
            isFormValid() {
                return this.form.company && this.form.position && this.form.yearFrom && this.form.yearTo && this.form.salary;
            }
        },

        watch: {
            workExperiences(val) {
                this.$emit("update:workExperiences", val);
            },
            workExperiencesLocal(val) {
                this.$emit("update:workExperiences", val);
            }
        },

        methods: {
            add() {
                if (this.form.company && this.form.position && this.form.yearFrom && this.form.yearTo && this.form.salary) {
                    this.workExperiencesLocal = [
                        ...this.workExperiencesLocal,
                        this.form
                    ];
                    this.clearForm();
                }
            },

            remove(row) {
                const position = this.workExperiencesLocal.indexOf(row);
                this.workExperiencesLocal = this.workExperiencesLocal.filter((_, index) => position !== index);
            },

            clearForm() {
                this.form = Object.assign({}, this.defaultForm);
            }
        },

        created() {
            this.workExperiencesLocal = this.workExperiences;
        }
    };
</script>