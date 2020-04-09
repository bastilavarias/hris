<template>
	<v-autocomplete :items="designations" item-value="id" item-text="name" :label="label" :outlined="outlined"
					v-model="designationIdLocal" :readonly="readonly">
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
        name: "generic-designation-selection",

        props: {
            label: {
                type: String,
                required: false
            },

            designationId: {
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
                designationIdLocal: null
            };
        },

        computed: {
            designations() {
                return this.$store.state.designation.list;
            }
        },

        watch: {
            designationId(val) {
                this.designationIdLocal = val;
            },

            designationIdLocal(val) {
                this.$emit("update:designationId", val);
            }
        },

        created() {
            this.designationIdLocal = this.designationId;
        }
    };
</script>