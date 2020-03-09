<template>
	<v-card>
		<v-card-title>Family Background</v-card-title>
		<v-card-text>
			<v-row dense>
				<v-col cols="12">
					<v-card-subtitle style="padding-left: 0 !important;">Spouse Information</v-card-subtitle>
					<v-row dense>
						<v-col cols="10">
							<v-text-field label="Surname"></v-text-field>
						</v-col>
						<v-col cols="2">
							<v-select label="Extension"></v-select>
						</v-col>
						<v-col cols="12">
							<v-text-field label="Middle Name"></v-text-field>
						</v-col>
						<v-col cols="12">
							<v-text-field label="First Name"></v-text-field>
						</v-col>
					</v-row>
				</v-col>
				<v-col cols="12" md="6">
					<v-card-subtitle style="padding-left: 0 !important;">Father Information</v-card-subtitle>
					<v-row dense>
						<v-col cols="10">
							<v-text-field label="Surname"></v-text-field>
						</v-col>
						<v-col cols="2">
							<v-select label="Ext."></v-select>
						</v-col>
						<v-col cols="12">
							<v-text-field label="Middle Name"></v-text-field>
						</v-col>
						<v-col cols="12">
							<v-text-field label="First Name"></v-text-field>
						</v-col>
					</v-row>
				</v-col>
				<v-col cols="12" md="6">
					<v-card-subtitle style="padding-left: 0 !important;">Mother Information</v-card-subtitle>
					<v-row dense>
						<v-col cols="10">
							<v-text-field label="Surname"></v-text-field>
						</v-col>
						<v-col cols="2">
							<v-select label="Ext."></v-select>
						</v-col>
						<v-col cols="12">
							<v-text-field label="Middle Name"></v-text-field>
						</v-col>
						<v-col cols="12">
							<v-text-field label="First Name"></v-text-field>
						</v-col>
					</v-row>
				</v-col>
				<v-col cols="12">
					<v-card-title style="padding-left: 0 !important;">
						<span class="v-card__subtitle" style="padding-left: 0 !important;">Children Information</span>
						<div class="flex-grow-1"></div>
						<family-background-add-child-information-dialog
								:dialog.sync="dialog"></family-background-add-child-information-dialog>
					</v-card-title>
					<v-data-table hide-default-footer :headers="tableHeaders"></v-data-table>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script>


    import FamilyBackgroundAddChildInformationDialog from "./FamilyBackgroundAddChildInformationDialog";

    const tableHeaders = [
        {
            text: "Name"
        },
        {
            text: "Birth Date"
        },
        {
            text: "Actions",
            align: "right"
        }
    ];

    export default {
        name: "personal-data-sheet-family-background",
        components: {FamilyBackgroundAddChildInformationDialog},
        data() {
            return {
                tableHeaders,
                dialog: false
            };
        }
    };
</script>