<template>
	<v-data-table hide-default-footer :headers="tableHeaders" :items="educationLocal">
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
							<span>Education Details</span>
						</v-card-title>
						<v-card-text>
							<v-row dense>
								<v-col cols="12" md="4">
									<v-select label="Level" outlined :items="educationLevels" v-model="form.level">
										<template v-slot:item="{item}">
											<span class="text-capitalize">{{item}}</span>
										</template>
										<template v-slot:selection="{item}">
											<span class="text-capitalize">{{item}}</span>
										</template>
									</v-select>
								</v-col>
								<v-col cols="12" md="8">
									<v-text-field label="School Name" outlined v-model="form.schoolName"></v-text-field>
								</v-col>
								<v-col cols="12" md="6">
									<v-text-field label="Degree" outlined v-model="form.degree"></v-text-field>
								</v-col>
								<v-col cols="12" md="2">
									<generic-year-selection outlined label="From" :year.sync="form.yearFrom"></generic-year-selection>
								</v-col>
								<v-col cols="12" md="2">
									<generic-year-selection outlined label="To" :year.sync="form.yearTo"></generic-year-selection>
								</v-col>
								<v-col cols="12" md="2">
									<generic-year-selection outlined label="Year Graduated" :year.sync="form.yearGraduated"></generic-year-selection>
								</v-col>
								<v-col cols="12" md="6">
									<v-text-field label="Recognition" outlined v-model="form.recognition"></v-text-field>
								</v-col>
								<v-col cols="12" md="6">
									<v-text-field label="Scholarship" outlined v-model="form.scholarship"></v-text-field>
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
		<template v-slot:item.level="{item}">
			<span class="text-capitalize">{{item.level}}</span>
		</template>
		<template v-slot:item.schoolName="{item}">
			<span class="text-capitalize">{{item.schoolName}}</span>
		</template>
		<template v-slot:item.degree="{item}">
			<span class="text-uppercase font-weight-bold">{{item.degree}}</span>
		</template>
		<template v-slot:item.date="{item}">
			{{item.yearFrom}} - {{item.yearTo}}
		</template>
		<template v-slot:item.recognition="{item}">
			<span class="text-capitalize">{{item.recognition ? item.recognition : "N/A"}}</span>
		</template>
		<template v-slot:item.scholarship="{item}">
			<span class="text-capitalize">{{item.scholarship ? item.scholarship : "N/A"}}</span>
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
    import GenericYearSelection from "../selection/Year";
    const tableHeaders = [
        {
            text: "Level",
			value: "level",
            align: "left"
        },
        {
            text: "School Name",
            value: "schoolName"
        },
        {
            text: "Degree",
            value: "degree"
        },
        {
            text: "Date",
            value: "date"
        },
        {
            text: "Recognition",
            value: "recognition"
        },
        {
            text: "Scholarship",
            value: "scholarship"
        },
        {
            text: "Action",
			value: "action"
        }
    ];

    const defaultForm = {
        level: "",
		schoolName: "",
		degree: "",
		yearFrom: null,
		yearTo: null,
        recognition: "",
        yearGraduated: null,
		scholarship: ""
    };

    const educationLevels = [
        "bachelor degree",
		"master degree",
		"doctorate degree"
	];

    export default {
        name: "generic-educational-background-table",
        components: {GenericYearSelection, GenericDateInput},
        props: {
            education: {
                type: Array,
				required: true
			}
		},

        data() {
            return {
                tableHeaders,
                dialog: false,
				educationLocal: [],
				form: Object.assign({}, defaultForm),
				defaultForm,
				educationLevels
            };
        },

		computed: {
            isFormValid() {
                return this.form.level && this.form.schoolName && this.form.degree && this.form.yearFrom && this.form.yearTo;
			}
		},

		watch: {
            education(val) {
                this.$emit("update:education", val);
			},

			educationLocal(val) {
                this.$emit("update:education", val);
            }
		},

        methods: {
            add() {
                if (this.form.level && this.form.schoolName && this.form.degree && this.form.yearFrom && this.form.yearTo) {
                    this.educationLocal = [...this.educationLocal, this.form];
                    this.clearForm();
                }
            },

            remove(row) {
                const position = this.educationLocal.indexOf(row);
                this.educationLocal = this.educationLocal.filter((_, index) => position !== index);
            },

            clearForm() {
                this.form = Object.assign({}, this.defaultForm);
            }
        },

        created() {
            this.educationLocal = this.education;
        }
    };
</script>