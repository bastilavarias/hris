<template>
	<v-menu
			v-model="menu"
			:close-on-content-click="false"
			max-width="290"
	>
		<template v-slot:activator="{ on }">
			<v-text-field
					:value="formatDate"
					clearable
					:label="label"
					readonly
					v-on="on"
					@click:clear="date = null"
			></v-text-field>
		</template>
		<v-date-picker
				v-model="date"
				@change="menu = false"
		></v-date-picker>
	</v-menu>
</template>

<script>
    import moment from "moment";

    export default {
        name: "generic-date-input",

		props: {
            label: {
                type: String,
				required: false
			}
		},

        data() {
            return {
                date: null,
                menu: false
            };
        },

        computed: {
            formatDate() {
                return this.date ? moment(this.date).format("MMMM, Do YYYY") : "";
            }
        }
    };
</script>