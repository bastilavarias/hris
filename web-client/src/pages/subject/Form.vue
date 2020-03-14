<template>
	<v-card>
		<generic-card-back-button title="Subject Information"></generic-card-back-button>
		<v-card-text>
			<generic-form-error-list :errors="errors"></generic-form-error-list>
			<v-row>
				<v-col cols="12" md="6">
					<v-text-field label="Code" v-model="form.code"></v-text-field>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field label="Title" v-model="form.title"></v-text-field>
				</v-col>
				<v-col cols="12" md="8">
					<v-text-field label="Description" v-model="form.description"></v-text-field>
				</v-col>
				<v-col cols="12" md="4">
					<v-select type="number" label="Units" :items="subjectUnitsOptions" v-model="form.units"></v-select>
				</v-col>
				<v-col cols="12">
					<v-select label="Category" :items="subjectCategories" item-text="name" item-value="id"
							  v-model="form.categoryId"></v-select>
				</v-col>
				<v-col cols="12">
					<v-autocomplete label="Prerequisite" v-model="form.prerequisiteSubjectId"></v-autocomplete>
				</v-col>
			</v-row>
		</v-card-text>
		<v-card-actions>
			<v-btn block color="primary" :disabled="!isFormValid" :loading="isActionStart" @click="create">Submit
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
    import GenericCardBackButton from "../../components/generic/CardBackButton";
    import {createSubject, getSubjectCategories, setSubjectFormErrors} from "../../store/types/subject";
    import GenericFormErrorList from "../../components/generic/FormErrorList";

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
        components: {GenericFormErrorList, GenericCardBackButton},

        data() {
            return {
                form: Object.assign({}, defaultForm),
                defaultForm,
                subjectUnitsOptions
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
            }
        },

        methods: {
            create() {
                this.$store.dispatch(createSubject, this.form);
            }
        },

        created() {
            this.$store.dispatch(getSubjectCategories);
        },

        destroyed() {
            this.$store.commit(setSubjectFormErrors, []);
        }
    };
</script>