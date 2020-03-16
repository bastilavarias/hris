<template>
	<v-autocomplete :items="colleges" item-value="id" item-text="name" :label="label" v-model="collegeIdLocal" >
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
        name: "generic-college-selection",

        props: {
            label: {
                type: String,
                required: false
            },

            colleges: {
                type: Array,
                required: true
            },

            collegeId: {
                type: null,
                required: true
            }
        },

        data() {
            return {
                collegeIdLocal: null
            };
        },

        watch: {
            collegeId(val) {
                this.collegeIdLocal = val;
            },

            collegeIdLocal(val) {
                this.$emit("update:collegeId", val);
            }
        },

        created() {
            this.collegeIdLocal = this.collegeId;
        }
    };
</script>