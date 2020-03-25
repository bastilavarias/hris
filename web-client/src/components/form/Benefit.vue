<template>
	<v-row dense>
		<v-col cols="12" md="4">
			<v-text-field label="GSID ID No." outlined v-model="gsisIdLocal"></v-text-field>
		</v-col>
		<v-col cols="12" md="4">
			<v-text-field label="PAGIBIG ID No." outlined v-model="pagibigIdLocal"></v-text-field>
		</v-col>
		<v-col cols="12" md="4">
			<v-text-field label="PHILHEALTH TIN ID No." outlined v-model="philhealthIdLocal"></v-text-field>
		</v-col>
		<v-col cols="12" md="4">
			<v-text-field label="SSS No." outlined v-model="sssNumberLocal"></v-text-field>
		</v-col>
		<v-col cols="12" md="4">
			<v-text-field label="TIN No." outlined v-model="tinNumberLocal"></v-text-field>
		</v-col>
		<v-col cols="12" md="4">
			<v-text-field label="Agency Employee No." outlined v-model="agencyEmployeeNumberLocal"></v-text-field>
		</v-col>
	</v-row>
</template>

<script>
    export default {
        name: "generic-benefit-form",

        props: {
            gsisId: {
                type: String,
                required: true
            },
            pagibigId: {
                type: String,
                required: true
            },
            philhealthId: {
                type: String,
                required: true
            },
            sssNumber: {
                type: String,
                required: true
            },
            tinNumber: {
                type: String,
                required: true
            },
            agencyEmployeeNumber: {
                type: String,
                required: true
            },
        },

        data() {
            return {
                gsisIdLocal: "",
                pagibigIdLocal: "",
                philhealthIdLocal: "",
                sssNumberLocal: "",
                tinNumberLocal: "",
                agencyEmployeeNumberLocal: ""
            };
        },

        watch: {
            gsisId(val) {
                this.gsisIdLocal = val;
            },
            gsisIdLocal(val) {
                this.$emit("update:gsisId", val);
            },
            pagibigId(val) {
                this.pagibigIdLocal = val;
            },
            pagibigIdLocal(val) {
                this.$emit("update:pagibigId", val);
            },
            philhealthId(val) {
                this.philhealthIdLocal = val;
            },
            philhealthIdLocal(val) {
                this.$emit("update:philhealthId", val);
            },
            sssNumber(val) {
                this.sssNumberLocal = val;
            },
            sssNumberLocal(val) {
                this.$emit("update:sssNumber", val);
            },
            tinNumber(val) {
                this.tinNumberLocal = val;
            },
            tinNumberLocal(val) {
                this.$emit("update:tinNumber", val);
            },
            agencyEmployeeNumber(val) {
                this.agencyEmployeeNumberLocal = val;
            },
            agencyEmployeeNumberLocal(val) {
                this.$emit("update:agencyEmployeeNumber", val);
            },
        },

        created() {
            this.gsisIdLocal = this.gsisId;
            this.pagibigIdLocal = this.pagibigId;
            this.philhealthIdLocal = this.philhealthId;
            this.sssNumberLocal = this.sssNumber;
            this.tinNumberLocal = this.tinNumber;
            this.agencyEmployeeNumberLocal = this.agencyEmployeeNumber;

        }
    };
</script>