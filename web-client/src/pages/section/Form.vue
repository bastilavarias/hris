<template>
	<v-card>
		<v-card-title>
			<generic-back-button class-name="mb-5" title="Section Details"></generic-back-button>
		</v-card-title>
		<v-card-text>
			<v-row dense>
				<v-col cols="12">
					<v-text-field label="Code" v-model="form.code" :readonly="operation === 'update'"
								  outlined :error="hasError(error.code)" :error-messages="error.code"></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-text-field label="Name" v-model="form.name" outlined></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-text-field label="Description" v-model="form.description" outlined></v-text-field>
				</v-col>
				<v-col cols="12">
					<generic-college-selection label="College" outlined
											   :college-id.sync="form.collegeId"></generic-college-selection>
				</v-col>
				<v-col cols="12">
					<generic-course-selection label="Course" outlined
											  :course-id.sync="form.courseId"></generic-course-selection>
				</v-col>
				<v-col cols="12">
					<v-select label="Year Level" outlined v-model="form.yearLevel" :items="yearLevels"></v-select>
				</v-col>
			</v-row>
		</v-card-text>
<v-card-actions>
	<generic-form-action-button :operation="operation" :create="create" :update="update"
								:disabled="!isFormValid"
								:is-loading="isLoading"></generic-form-action-button>
</v-card-actions>
	</v-card>
</template>

<script>
    import GenericCardBackButton from "../../components/generic/CardBackButton";
    import {
        createSection,
        getSingleSection,
        setSectionError,
        setSections,
        updateSection
    } from "../../store/types/section";
    import {setActionName} from "../../store/types/action";
    import GenericFormActionButton from "../../components/generic/FormActionButton";
    import GenericBackButton from "../../components/generic/BackButton";
    import customUtilities from "../../services/customUtilities";
    import GenericCollegeSelection from "../../components/selection/College";
    import {getAllColleges} from "../../store/types/college";
    import {getAllCourses} from "../../store/types/course";
    import GenericCourseSelection from "../../components/selection/Course";

    const defaultForm = {
        code: "",
        name: "",
        description: "",
        collegeId: null,
        courseId: null,
		yearLevel: null
    };

    const yearLevels = [1, 2, 3, 4, 5];

    export default {
        components: {
            GenericCourseSelection,
            GenericCollegeSelection,
            GenericBackButton, GenericFormActionButton, GenericCardBackButton
        },

        data() {
            return {
                form: Object.assign({}, defaultForm),
                defaultForm,
                operation: "create",
                isLoading: false,
				yearLevels
            };
        },

        mixins: [customUtilities],

        computed: {
            isFormValid() {
                return this.form.code && this.form.name && this.form.collegeId && this.form.courseId && this.form.yearLevel;
            },

            error() {
                return this.$store.state.section.error;
            },
        },

        watch: {
            "$store.state.action.name"(name) {
                if (name === `${createSection}-error`) {
                    this.$store.commit(setActionName, "");
                    this.isLoading = false;
                    return;
                }

                if (name === createSection) {
                    this.form = Object.assign({}, this.defaultForm);
                    this.$store.commit(setSectionError, []);
                    this.$store.commit(setActionName, "");
                    this.isLoading = false;
                    return;
                }

                if (name === updateSection) {
                    this.form = Object.assign({}, this.defaultForm);
                    this.$store.commit(setSectionError, []);
                    this.$store.commit(setActionName, "");
                    this.$router.push({name: "section-list"});
                }
            },

            "$store.state.section.current"(section) {
                if (Object.keys(section).length <= 0) return this.$router.push({name: "section-list"});
                this.form.code = section.code;
                this.form.name = section.name;
                this.form.description = section.description;
                this.form.collegeId = section.college.id;
                this.form.courseId = section.course.id;
                this.form.yearLevel = section.yearLevel;
                this.isLoading = false;
            }
        },

        methods: {
            create() {
                this.$store.dispatch(createSection, this.form);
                this.isLoading = true;
            },

            update() {
                const sectionId = this.$route.params.sectionId;
                this.$store.dispatch(updateSection, {
                    sectionId,
                    details: this.form
                });
                this.isLoading = true;
            }
        },

        created() {
            this.$store.dispatch(getAllColleges);
            this.$store.dispatch(getAllCourses);
            const operation = this.$route.params.operation;
            if (operation === "update") {
                const sectionId = this.$route.params.sectionId;
                this.operation = operation;
                this.$store.dispatch(getSingleSection, sectionId);
                this.isLoading = true;
            }
        },

        destroyed() {
            this.$store.commit(setSections, []);
            this.$store.commit(setSectionError, []);
            this.$store.commit(setActionName, "");
        }
    };
</script>