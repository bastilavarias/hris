<template>
	<v-autocomplete :items="departments" item-value="id" item-text="name" :label="label" :outlined="outlined"
					v-model="departmentIdLocal" :readonly="readonly">
		<template v-slot:item="{item}">
			<span class="black--text text-capitalize">{{item.name}}</span>
		</template>
		<template v-slot:selection="{item}">
			<span class="black--text text-capitalize">{{item.name}}</span>
		</template>
	</v-autocomplete>
</template>

<script>
    export default {
        name: "generic-department-selection",

        props: {
            label: {
                type: String,
                required: false
            },

            departmentId: {
                type: null,
                required: true
            },

            outlined: {
                type: Boolean,
                required: false
            },

            readonly: {
                type: Boolean,
                required: false
            }
        },

        data() {
            return {
                departmentIdLocal: null
            };
        },

        computed: {
            departments() {
                return this.$store.state.department.list;
            }
        },

        watch: {
            departmentId(val) {
                this.departmentIdLocal = val;
            },

            departmentIdLocal(val) {
                this.$emit("update:departmentId", val);
            }
        },

        created() {
            this.departmentIdLocal = this.departmentId;
        }
    };
</script>