<template>
	<v-row dense>
		<v-col cols="12">
			<v-text-field label="Government Issued ID" outlined v-model="governmentIdLocal"></v-text-field>
		</v-col>
		<v-col cols="12">
			<v-text-field label="ID/License/Passport No." outlined v-model="licenseNumberLocal"></v-text-field>
		</v-col>
		<v-col cols="12">
			<generic-date-input :date.sync="issuanceDateLocal" label="Date of Issuance" outlined></generic-date-input>
		</v-col>
		<v-col cols="12">
			<v-text-field label="Place of Issuance" outlined v-model="issuancePlaceLocal"></v-text-field>
		</v-col>
	</v-row>
</template>

<script>

    import GenericDateInput from "../generic/DateInput";
    const defaultForm = {

    };

    export default {
        name: "generic-government-id-form",
        components: {GenericDateInput},
        props: {
            governmentId: {
                type: String,
				required: true
			},
            licenseNumber: {
                type: String,
                required: true
            },
            issuanceDate: {
                required: true
            },
            issuancePlace: {
                type: String,
                required: true
            }
		},

        data() {
            return {
                governmentIdLocal: "",
                licenseNumberLocal: "",
                issuanceDateLocal: null,
                issuancePlaceLocal: ""
            };
        },

		watch: {
            governmentId(val) {
                this.$emit("update:governmentId", val);
			},
            governmentIdLocal(val) {
                this.$emit("update:governmentId", val);
			},
            licenseNumber(val) {
                this.$emit("update:licenseNumber", val);
            },
            licenseNumberLocal(val) {
                this.$emit("update:licenseNumber", val);
            },
            issuanceDate(val) {
                this.$emit("update:issuanceDate", val);
            },
            issuanceDateLocal(val) {
                this.$emit("update:issuanceDate", val);
            },
            issuancePlace(val) {
                this.$emit("update:issuancePlace", val);
            },
            issuancePlaceLocal(val) {
                this.$emit("update:issuancePlace", val);
            },
		}
    };
</script>