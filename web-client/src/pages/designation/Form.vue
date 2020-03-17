<template>
	<v-card>
		<generic-card-back-button title="Designation Information"></generic-card-back-button>
		<v-card-text>
			<generic-form-error-list :errors="errors"></generic-form-error-list>
			<v-row>
				<v-col cols="12">
					<v-text-field label="Name" v-model="form.name"></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-text-field label="Description" v-model="form.description"></v-text-field>
				</v-col>
			</v-row>
		</v-card-text>
		<generic-form-action-button :operation="operation" :create="create" :update="update"
		<generic-form-action-button :operation="operation" :create="create" :update="update"
									:disabled="!isFormValid"
									:is-loading="isLoading"></generic-form-action-button>
	</v-card>
</template>

<script>
    import GenericCardBackButton from "../../components/generic/CardBackButton";
    import {
        createDesignation,
        getSingleDesignation,
        setDesignationErrors,
        setDesignations,
        updateDesignation
    } from "../../store/types/designation";
    import {setActionName} from "../../store/types/action";
    import GenericFormErrorList from "../../components/generic/FormErrorList";
    import GenericFormActionButton from "../../components/generic/FormActionButton";
    import GenericCollegeSelection from "../../components/generic/CollegeSelection";

    const defaultForm = {
        name: "",
        description: ""
    };

    export default {
        components: {GenericCollegeSelection, GenericFormActionButton, GenericFormErrorList, GenericCardBackButton},

        data() {
            return {
                form: Object.assign({}, defaultForm),
                defaultForm,
                operation: "create",
                isLoading: false
            };
        },

        computed: {
            isFormValid() {
                return this.form.name;
            },

            errors() {
                return this.$store.state.designation.errors;
            },

            colleges() {
                return this.$store.state.college.list;
            },
        },

        watch: {
            "$store.state.action.name"(name) {
                if (name === `${createDesignation}-errors`) {
                    this.$store.commit(setActionName, "");
                    this.isLoading = false;
                    return;
                }

                if (name === createDesignation) {
                    this.form = Object.assign({}, this.defaultForm);
                    this.$store.commit(setDesignationErrors, []);
                    this.$store.commit(setActionName, "");
                    this.isLoading = false;
                    return;
                }

                if (name === `${updateDesignation}-errors`) {
                    this.$store.commit(setActionName, "");
                    return;
                }

                if (name === updateDesignation) {
                    this.form = Object.assign({}, this.defaultForm);
                    this.$store.commit(setDesignationErrors, []);
                    this.$store.commit(setActionName, "");
                    this.$router.push({name: "designation-management"});
                }
            },

            "$store.state.designation.current"(designation) {
                if (Object.keys(designation).length <= 0) return this.$router.push({name: "designation-management"});
                this.form.name = designation.name;
                this.form.description = designation.description;
                this.isLoading = false;
            }
        },

        methods: {
            create() {
                this.$store.dispatch(createDesignation, this.form);
                this.isLoading = true;
            },

            update() {
                const designationId = this.$route.params.designationId;
                this.$store.dispatch(updateDesignation, {
                    designationId,
                    details: this.form
                });
                this.isLoading = true;
            }
        },

        created() {
            const operation = this.$route.params.operation;
            if (operation === "update") {
                const designationId = this.$route.params.designationId;
                this.operation = operation;
                this.$store.dispatch(getSingleDesignation, designationId);
                this.isLoading = true;
            }
        },

        destroyed() {
            this.$store.commit(setDesignations, []);
            this.$store.commit(setDesignationErrors, []);
            this.$store.commit(setActionName, "");
        }
    };
</script>