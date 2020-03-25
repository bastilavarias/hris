<template>
	<v-row dense>
		<v-col cols="12" md="6">
			<v-text-field label="Telephone No." outlined v-model="telephoneNumberLocal"></v-text-field>
		</v-col>
		<v-col cols="12" md="6">
			<v-text-field label="Mobile No." outlined v-model="mobileNumberLocal"></v-text-field>
		</v-col>
		<v-col cols="12">
			<v-text-field label="E-mail Address" outlined v-model="emailAddressLocal"></v-text-field>
		</v-col>
	</v-row>
</template>

<script>
    export default {
        name: "generic-contact-form",

        props: {
            telephoneNumber: {
                type: String,
                required: true
            },
            mobileNumber: {
                type: String,
                required: true
            },
            emailAddress: {
                type: String,
                required: true
            }
        },

        data() {
            return {
                telephoneNumberLocal: "",
                mobileNumberLocal: "",
                emailAddressLocal: ""
            };
        },

        watch: {
            telephoneNumber(val) {
                this.telephoneNumberLocal = val;
            },
            telephoneNumberLocal(val) {
                this.$emit("update:telephoneNumber", val);
            },
            mobileNumber(val) {
                this.mobileNumberLocal = val;
            },
            mobileNumberLocal(val) {
                this.$emit("update:mobileNumber", val);
            },
            emailAddress(val) {
                this.emailAddressLocal = val;
            },
            emailAddressLocal(val) {
                this.$emit("update:emailAddress", val);
            },
        },

        created() {
            this.telephoneNumberLocal = this.telephoneNumber;
            this.mobileNumberLocal = this.mobileNumber;
            this.emailAddressLocal = this.emailAddress;
        }
    };
</script>