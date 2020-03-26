<template>
	<v-card>
		<v-card-title>
			<generic-back-button title="Designation Details" class-name="mb-5"></generic-back-button>
		</v-card-title>
			<v-card-text>
				<v-row>
					<v-col cols="12">
						<v-text-field label="Name" v-model="form.name" :error="hasError(error.name)"
									  :error-messages="error.name" outlined></v-text-field>
					</v-col>
					<v-col cols="12">
						<v-text-field label="Description" v-model="form.description" outlined></v-text-field>
					</v-col>
				</v-row>
				<generic-form-action-button :operation="operation" :create="create" :update="update"
				<generic-form-action-button :operation="operation" :create="create" :update="update"
											:disabled="!isFormValid"
											:is-loading="isLoading"></generic-form-action-button>
			</v-card-text>
	</v-card>
</template>


<script>
    import GenericCardBackButton from "../../components/generic/CardBackButton";
    import {
        createDesignation,
        getSingleDesignation,
        setDesignationError,
        setDesignations,
        updateDesignation
    } from "../../store/types/designation";
    import {setActionName} from "../../store/types/action";
    import GenericFormActionButton from "../../components/generic/FormActionButton";
    import GenericCollegeSelection from "../../components/selection/College";
    import customUtilities from "../../services/customUtilities";
    import GenericBackButton from "../../components/generic/BackButton";

    const defaultForm = {
        name: "",
        description: ""
    };

    export default {
        components: {
            GenericBackButton,
            GenericCollegeSelection, GenericFormActionButton, GenericCardBackButton},

        data() {
            return {
                form: Object.assign({}, defaultForm),
                defaultForm,
                operation: "create",
                isLoading: false
            };
        },

        mixins: [customUtilities],

        computed: {
            isFormValid() {
                return this.form.name;
            },

            error() {
                return this.$store.state.designation.error;
            },

            colleges() {
                return this.$store.state.college.list;
            },
        },

        watch: {
            "$store.state.action.name"(name) {
                if (name === `${createDesignation}-error`) {
                    this.$store.commit(setActionName, "");
                    this.isLoading = false;
                    return;
                }

                if (name === createDesignation) {
                    this.form = Object.assign({}, this.defaultForm);
                    this.$store.commit(setDesignationError, []);
                    this.$store.commit(setActionName, "");
                    this.isLoading = false;
                    return;
                }

                if (name === `${updateDesignation}-error`) {
                    this.$store.commit(setActionName, "");
                    this.isLoading = false;
                    return;
                }

                if (name === updateDesignation) {
                    this.form = Object.assign({}, this.defaultForm);
                    this.$store.commit(setDesignationError, {});
                    this.$store.commit(setActionName, "");
                    this.$router.push({name: "designation-list"});
                }
            },

            "$store.state.designation.current"(designation) {
                if (Object.keys(designation).length <= 0) return this.$router.push({name: "designation-list"});
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
            this.$store.commit(setDesignationError, []);
            this.$store.commit(setActionName, "");
        }
    };
</script>