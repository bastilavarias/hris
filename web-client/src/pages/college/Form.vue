<template>
	<v-card>
		<generic-card-back-button title="College Information"></generic-card-back-button>
		<v-card-text>
			<generic-form-error-list :errors="errors"></generic-form-error-list>
			<v-row>
				<v-col cols="12">
					<v-text-field label="Custom ID" v-model="form.customId" :readonly="operation === 'update'"></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-text-field label="Name" v-model="form.name"></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-text-field label="Description" v-model="form.description"></v-text-field>
				</v-col>
			</v-row>
		</v-card-text>
		<generic-form-action-button :operation="operation" :create="create" :update="update"
									:disabled="!isFormValid"
									:is-loading="isLoading"></generic-form-action-button>
	</v-card>
</template>

<script>
    import GenericCardBackButton from "../../components/generic/CardBackButton";
    import {
        createCollege,
        getSingleCollege,
        setCollegeErrors,
        setColleges,
        updateCollege
    } from "../../store/types/college";
    import {setActionName} from "../../store/types/action";
    import GenericFormErrorList from "../../components/generic/FormErrorList";
    import GenericFormActionButton from "../../components/generic/FormActionButton";

    const defaultForm = {
        customId: "",
		name: "",
		description: ""
    };

    export default {
        components: {GenericFormActionButton, GenericFormErrorList, GenericCardBackButton},

		data() {
            return {
                form: Object.assign({}, defaultForm),
                defaultForm,
                operation: "create",
                isLoading: false
			}
		},

		computed: {
            isFormValid() {
                return this.form.customId && this.form.name;
            },

            errors() {
                return this.$store.state.college.errors;
            },
        },

		watch: {
            "$store.state.action.name"(name) {
                if (name === `${createCollege}-errors`) {
                    this.$store.commit(setActionName, "");
                    this.isLoading = false;
                    return;
                }

                if (name === createCollege) {
                    this.form = Object.assign({}, this.defaultForm);
                    this.$store.commit(setCollegeErrors, []);
                    this.$store.commit(setActionName, "");
                    this.isLoading = false;
                    return;
                }

                if (name === `${updateCollege}-errors`) {
                    this.$store.commit(setActionName, "");
                    this.isLoading = false;
                    return;
                }

                if (name === updateCollege) {
                    this.form = Object.assign({}, this.defaultForm);
                    this.$store.commit(setCollegeErrors, []);
                    this.$store.commit(setActionName, "");
                    this.$router.push({name: "college-management"});
                }
            },

            "$store.state.college.current"(college) {
                if (Object.keys(college).length <= 0) return this.$router.push({name: "college-management"});
                this.form.customId = college.customId;
                this.form.name = college.name;
                this.form.description = college.description;
                this.isLoading = false;
            }
        },

        methods: {
            create() {
                this.$store.dispatch(createCollege, this.form);
                this.isLoading = true;
            },

            update() {
                const collegeId = this.$route.params.collegeId;
                this.$store.dispatch(updateCollege, {
                    collegeId,
                    details: this.form
                });
                this.isLoading = true;
            }
        },

        created() {
            const operation = this.$route.params.operation;
            if (operation === "update") {
                const collegeId = this.$route.params.collegeId;
                this.operation = operation;
                this.$store.dispatch(getSingleCollege, collegeId);
                this.isLoading = true;
            }
        },

        destroyed() {
            this.$store.commit(setColleges, []);
            this.$store.commit(setCollegeErrors, []);
            this.$store.commit(setActionName, "");
        }
    }
</script>