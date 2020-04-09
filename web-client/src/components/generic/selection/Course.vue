<template>
	<v-autocomplete :items="courses" item-value="id" item-text="name" :label="label" v-model="courseIdLocal" :outlined="outlined">
		<template v-slot:item="{item}">
			<span class="black--text text-uppercase">{{item.name}}</span>
		</template>
		<template v-slot:selection="{item}">
			<span class="black--text text-uppercase">{{item.name}}</span>
		</template>
	</v-autocomplete>
</template>

<script>
    export default {
        name: "generic-course-selection",

        props: {
            label: {
                type: String,
                required: false
            },

            courseId: {
                type: null,
                required: true
            },

            outlined: {
                type: Boolean,
                required: true
            }
        },

        data() {
            return {
                courseIdLocal: null
            };
        },

		computed: {
            courses() {
                return this.$store.state.course.list;
			}
		},

        watch: {
            courseId(val) {
                this.courseIdLocal = val;
            },

            courseIdLocal(val) {
                this.$emit("update:courseId", val);
            }
        },

        created() {
            this.courseIdLocal = this.courseId;
        }
    };
</script>