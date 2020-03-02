<template>
	<v-menu
			ref="menu"
			v-model="menu2"
			:close-on-content-click="false"
			:nudge-right="40"
			:return-value.sync="time"
			transition="scale-transition"
			offset-y
			max-width="290px"
			min-width="290px"
	>
		<template v-slot:activator="{ on }">
			<v-text-field
					v-model="time"
					readonly
					v-on="on"
			></v-text-field>
		</template>
		<v-time-picker
				v-if="menu2"
				v-model="time"
				full-width
				@click:minute="$refs.menu.save(time)"
		></v-time-picker>
	</v-menu>
</template>

<script>
    export default {
        name: "generic-time-picker",

        data() {
            return {
                time: null,
                menu2: false,
                modal2: false,
            };
        }
    };
</script>