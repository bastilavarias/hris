<template>
	<v-card>
		<v-card-title>
			<generic-back-button class-name="mb-5" title="Course Details"></generic-back-button>
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
			</v-row>
			<generic-form-action-button :operation="operation" :create="create" :update="update"
										:disabled="!isFormValid"
										:is-loading="isLoading"></generic-form-action-button>
		</v-card-text>

	</v-card>
</template>

<script>
    import GenericCardBackButton from "../../components/generic/CardBackButton";
    import {createCourse, getSingleCourse, setCourseError, setCourses, updateCourse} from "../../store/types/course";
    import {setActionName} from "../../store/types/action";
    import GenericFormErrorList from "../../components/generic/FormErrorList";
    import GenericFormActionButton from "../../components/generic/FormActionButton";
    import GenericBackButton from "../../components/generic/BackButton";
    import customUtilities from "../../services/customUtilities";
    import GenericCollegeSelection from "../../components/selection/College";
    import {getAllColleges} from "../../store/types/college";

    const defaultForm = {
        code: "",
        name: "",
        description: "",
        collegeId: null
    };

    export default {
        components: {
            GenericCollegeSelection,
            GenericBackButton, GenericFormActionButton, GenericFormErrorList, GenericCardBackButton
        },

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
                return this.form.code && this.form.name && this.form.collegeId;
            },

            error() {
                return this.$store.state.course.error;
            },
        },

        watch: {
            "$store.state.action.name"(name) {
                if (name === `${createCourse}-error`) {
                    this.$store.commit(setActionName, "");
                    this.isLoading = false;
                    return;
                }

                if (name === createCourse) {
                    this.form = Object.assign({}, this.defaultForm);
                    this.$store.commit(setCourseError, []);
                    this.$store.commit(setActionName, "");
                    this.isLoading = false;
                    return;
                }

                if (name === updateCourse) {
                    this.form = Object.assign({}, this.defaultForm);
                    this.$store.commit(setCourseError, []);
                    this.$store.commit(setActionName, "");
                    this.$router.push({name: "course-management"});
                }
            },

            "$store.state.course.current"(course) {
                if (Object.keys(course).length <= 0) return this.$router.push({name: "course-management"});
                this.form.code = course.code;
                this.form.name = course.name;
                this.form.description = course.description;
                this.isLoading = false;
            }
        },

        methods: {
            create() {
                this.$store.dispatch(createCourse, this.form);
                this.isLoading = true;
            },

            update() {
                const courseId = this.$route.params.courseId;
                this.$store.dispatch(updateCourse, {
                    courseId,
                    details: this.form
                });
                this.isLoading = true;
            }
        },

        created() {
            this.$store.dispatch(getAllColleges);
            const operation = this.$route.params.operation;
            if (operation === "update") {
                const courseId = this.$route.params.courseId;
                this.operation = operation;
                this.$store.dispatch(getSingleCourse, courseId);
                this.isLoading = true;
            }
        },

        destroyed() {
            this.$store.commit(setCourses, []);
            this.$store.commit(setCourseError, []);
            this.$store.commit(setActionName, "");
        }
    };
</script>