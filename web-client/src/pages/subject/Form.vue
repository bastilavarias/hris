<template>
	<v-card :loading="isLoading">
		<generic-card-back-button title="Subject Information"></generic-card-back-button>
		<v-card-text>
			<generic-form-error-list :errors="errors"></generic-form-error-list>
			<v-row>
				<v-col cols="12" md="6">
					<v-text-field label="Code" v-model="form.code" autofocus
								  :readonly="operation === 'update'"></v-text-field>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field label="Title" v-model="form.title"></v-text-field>
				</v-col>
				<v-col cols="12" md="8">
					<v-text-field label="Description" v-model="form.description"></v-text-field>
				</v-col>
				<v-col cols="12" md="4">
					<v-select type="number" label="Units" :items="subjectUnitsOptions"
							  v-model="form.units"></v-select>
				</v-col>
				<v-col cols="12">
					<v-select label="Category" :items="subjectCategories" item-text="name" item-value="id"
							  v-model="form.categoryId"></v-select>
				</v-col>
				<v-col cols="12">
					<generic-subject-selection label="Prerequisite" :subjects="subjects"
											   :subject-id.sync="form.prerequisiteSubjectId"></generic-subject-selection>
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
        createSubject,
        getAllSubjects,
        getSingleSubject,
        getSubjectCategories,
        setSubjectErrors,
        setSubjects,
        updateSubject
    } from "../../store/types/subject";
    import GenericFormErrorList from "../../components/generic/FormErrorList";
    import {setActionName} from "../../store/types/action";
    import GenericSubjectSelection from "../../components/generic/SubjectSelection";
    import GenericFormActionButton from "../../components/generic/FormActionButton";
    import GenericConfirmDialog from "../../components/generic/CustomDialog";

    const defaultForm = {
        code: "",
        title: "",
        description: "",
        units: 0,
        categoryId: null,
        prerequisiteSubjectId: null
    };

    const subjectUnitsOptions = [
        2,
        3,
        5
    ];

    export default {
        components: {
            GenericConfirmDialog,
            GenericFormActionButton, GenericSubjectSelection, GenericFormErrorList, GenericCardBackButton
        },

        data() {
            return {
                form: Object.assign({}, defaultForm),
                defaultForm,
                subjectUnitsOptions,
                operation: "create",
                isLoading: false
            };
        },

        computed: {
            subjectCategories() {
                return this.$store.state.subject.categories;
            },

            isFormValid() {
                return this.form.code && this.form.title && this.form.units && this.form.categoryId;
            },

            errors() {
                return this.$store.state.subject.errors;
            },

            isActionStart() {
                return this.$store.state.subject.isActionStart;
            },

            subjects() {
                return this.$store.state.subject.list;
            }
        },

        watch: {
            "$store.state.action.name"(name) {
                if (name === createSubject) {
                    this.form = Object.assign({}, this.defaultForm);
                    this.$store.commit(setSubjectErrors, []);
                    this.$store.commit(setActionName, "");
                    this.$store.commit(setSubjects, []);
                    this.isLoading = false;
                }

                if (name === updateSubject) {
                    this.form = Object.assign({}, this.defaultForm);
                    this.$store.commit(setSubjectErrors, []);
                    this.$store.commit(setActionName, "");
                    this.$store.commit(setSubjects, []);
                    this.$router.push({name: "subject-management"});
                }
            },

            "$store.state.subject.current"(subject) {
                this.form.code = subject.code;
                this.form.title = subject.title;
                this.form.units = subject.units;
                this.form.description = subject.description;
                this.form.categoryId = subject.category.id;
                this.form.prerequisiteSubjectId = subject.prerequisite ? subject.prerequisite.id : null;
                this.isLoading = false;
            }
        },

        methods: {
            create() {
                this.$store.dispatch(createSubject, this.form);
                this.isLoading = true;
            },

            update() {
                const subjectId = this.$route.params.subjectId;
                this.$store.dispatch(updateSubject, {
                    subjectId,
                    details: this.form
                });
                this.isLoading = true;
            }
        },

        created() {
            this.$store.dispatch(getSubjectCategories);
            this.$store.dispatch(getAllSubjects);

            const operation = this.$route.params.operation;
            if (operation === "update") {
                const subjectId = this.$route.params.subjectId;
                this.operation = operation;
                this.$store.dispatch(getSingleSubject, subjectId);
                this.isLoading = true;
            }
        },

        destroyed() {
            this.$store.commit(setSubjectErrors, []);
        }
    };
</script>