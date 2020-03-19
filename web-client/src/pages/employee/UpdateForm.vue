<template>
	<div>
		<generic-back-button title="Employee Form" class-name="mb-5">
			<template v-slot:right>
				<v-btn icon>
					<v-icon>mdi-printer</v-icon>
				</v-btn>
				<v-btn icon>
					<v-icon>mdi-content-save</v-icon>
				</v-btn>
			</template>
		</generic-back-button>
		<v-row>
			<v-col cols="12" md="3">
				<v-row dense>
					<v-col cols="12">
						<div class="text-center">
							<generic-image-input :photo="null"></generic-image-input>
						</div>
					</v-col>
					<v-col cols="12">
						<v-text-field label="Employee Number" outlined readonly></v-text-field>
					</v-col>
					<v-col cols="12">
						<v-text-field label="Department" outlined></v-text-field>
					</v-col>
					<v-col cols="12">
						<v-text-field label="Designation" outlined></v-text-field>
					</v-col>
				</v-row>
			</v-col>
			<v-col cols="12" md="9">
				<v-tabs v-model="tab" fixed-tabs show-arrows class="mb-5">
					<v-tab>Profile</v-tab>
					<v-tab>Address Details</v-tab>
					<v-tab>Family Details</v-tab>
					<v-tab>Educational Background</v-tab>
					<v-tab>Experience</v-tab>
					<v-tab>Others</v-tab>
				</v-tabs>
				<v-tabs-items v-model="tab">
					<v-tab-item>
						<generic-profile></generic-profile>
					</v-tab-item>
				</v-tabs-items>
			</v-col>
		</v-row>
		<generic-up-button></generic-up-button>
	</div>
</template>
<script>
    import GenericBackButton from "../../components/generic/BackButton";
    import GenericImageInput from "../../components/generic/PhotoInput";
    import GenericProfile from "../../components/form/Profile";
    import GenericUpButton from "../../components/generic/UpButton";
    export default {
        components: {GenericUpButton, GenericProfile, GenericImageInput, GenericBackButton},

		data() {
            return {
                tab: 0
			}
		}
    };
</script>