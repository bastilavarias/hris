<template>
	<v-autocomplete :items="subjects" item-value="id" item-text="title" :label="label" v-model="subjectIdLocal" >
		<template v-slot:item="{item}">
			<span class="black--text text-capitalize">{{item.licenseTitle}}</span>
		</template>
		<template v-slot:selection="{item}">
			<span class="black--text text-capitalize">{{item.licenseTitle}}</span>
		</template>
	</v-autocomplete>
</template>

<script>
    export default {
        name: "generic-subject-selection",

        props: {
            label: {
                type: String,
                required: false
            },

            subjects: {
                type: Array,
                required: true
            },

            subjectId: {
                type: null,
                required: true
            }
        },

        data() {
            return {
                subjectIdLocal: null
            };
        },

        watch: {
            subjectId(val) {
                this.subjectIdLocal = val;
            },

            subjectIdLocal(val) {
                this.$emit("update:subjectId", val);
            }
        },

        created() {
            this.subjectIdLocal = this.subjectId;
        }
    };
</script>