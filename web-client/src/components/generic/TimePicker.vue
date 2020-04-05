<template>
	<v-menu
			ref="menu"
			v-model="menu"
			:close-on-content-click="false"
			:nudge-right="40"
			:return-value.sync="timeLocal"
			transition="scale-transition"
			offset-y
			max-width="290px"
			min-width="290px"
	>
		<template v-slot:activator="{ on }">
			<v-text-field
					:label="label"
					readonly
					:value="convertMilitaryTime(timeLocal)"
					:solo="solo"
					v-on="on"
					:outlined="outlined"
			></v-text-field>
		</template>
		<v-time-picker
				v-if="menu"
				v-model="timeLocal"
				full-width
				@click:minute="$refs.menu.save(timeLocal)"
		></v-time-picker>
	</v-menu>
</template>

<script>
	import customUtilities from "../../services/customUtilities";

    export default {
	    name: "generic-time-picker",

		mixins: [customUtilities],

		props: {
	        time: {
	            required: true
			},

			label: {
	            type: String,
				required: false
			},

			solo: {
	            type: Boolean,
				required: false
			},

			outlined: {
	            type: Boolean,
				required: false
			}
		},

        data () {
            return {
                timeLocal: null,
                menu: false
            }
        },

        watch: {
            time(value) {
                this.timeLocal = value;
            },

            timeLocal(value) {
                this.$emit("update:time", value);
            }
        },

		created() {
	        this.timeLocal = this.time;
        }
    }
</script>