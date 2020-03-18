<template>
	<v-card>
		<generic-card-back-button title="Course Information"></generic-card-back-button>
		<v-card-text>
			<generic-form-error-list :errors="errors"></generic-form-error-list>
			<v-row>
				<v-col cols="12">
					<v-text-field label="Code" v-model="form.code" :readonly="operation === 'update'"></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-text-field label="Name" v-model="form.name"></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-text-field label="Description" v-model="form.description"></v-text-field>
				</v-col>
				<v-col cols="12">
					<generic-college-selection label="College" :colleges="colleges"
											   :college-id.sync="form.collegeId"></generic-college-selection>
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
    import {createCourse, getSingleCourse, setCourseErrors, setCourses, updateCourse} from "../../store/types/course";
    import {setActionName} from "../../store/types/action";
    import GenericFormErrorList from "../../components/generic/FormErrorList";
    import GenericFormActionButton from "../../components/generic/FormActionButton";
    import GenericCollegeSelection from "../../components/generic/selection/College";
    import {getAllColleges} from "../../store/types/college";

    const defaultForm = {
        code: "",
        name: "",
        description: "",
        collegeId: ""
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
                return this.form.code && this.form.name && this.form.collegeId;
            },

            errors() {
                return this.$store.state.course.errors;
            },

            colleges() {
                return this.$store.state.college.list;
            },
        },

        watch: {
            "$store.state.action.name"(name) {
                if (name === `${createCourse}-errors`) {
                    this.$store.commit(setActionName, "");
                    this.isLoading = false;
                    return;
                }

                if (name === createCourse) {
                    this.form = Object.assign({}, this.defaultForm);
                    this.$store.commit(setCourseErrors, []);
                    this.$store.commit(setActionName, "");
                    this.isLoading = false;
                    return;
                }

                if (name === `${updateCourse}-errors`) {
                    this.$store.commit(setActionName, "");
                    this.isLoading = false;
                    return;
                }

                if (name === updateCourse) {
                    this.form = Object.assign({}, this.defaultForm);
                    this.$store.commit(setCourseErrors, []);
                    this.$store.commit(setActionName, "");
                    this.$router.push({name: "course-management"});
                }
            },

            "$store.state.course.current"(course) {
                if (Object.keys(course).length <= 0) return this.$router.push({name: "course-management"});
                this.form.code = course.code;
                this.form.name = course.name;
                this.form.description = course.description;
                this.form.collegeId = course.college.id;
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
            this.$store.commit(setCourseErrors, []);
            this.$store.commit(setActionName, "");
        }
    };
</script>