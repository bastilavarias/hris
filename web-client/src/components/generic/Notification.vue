<template>
	<v-menu offset-y>
		<template v-slot:activator="{ on }">
			<v-badge
					color="green"
					overlap
					dot
					v-on="on"
			>
				<v-icon>mdi-bell</v-icon>
			</v-badge>
		</template>
		<!--		<v-list>-->
		<!--			<v-list-item-->
		<!--					v-for="(item, index) in items"-->
		<!--					:key="index"-->
		<!--					@click=""-->
		<!--			>-->
		<!--				<v-list-item-title>{{ item.title }}</v-list-item-title>-->
		<!--			</v-list-item>-->
		<!--		</v-list>-->
	</v-menu>
</template>

<script>
    export default {
        name: "generic-notification"
    };
</script>