<template>
	<v-row dense>
		<v-col cols="12" md="8">
			<v-row dense>
				<v-col cols="10">
					<v-text-field label="Surname" outlined v-model="lastNameLocal"></v-text-field>
				</v-col>
				<v-col cols="2">
					<v-text-field label="Extension" outlined v-model="extensionLocal"></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-text-field label="Middle Name" outlined v-model="middleNameLocal"></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-text-field label="First Name" outlined v-model="firstNameLocal"></v-text-field>
				</v-col>
			</v-row>
		</v-col>
		<v-col cols="12" md="4">
			<div class="text-center">
				<generic-image-input :photo.sync="photoLocal"></generic-image-input>
			</div>
		</v-col>
		<v-col cols="12" md="4">
			<generic-date-input label="Date Of Birth" outlined :date.sync="birthDateLocal"></generic-date-input>
		</v-col>
		<v-col cols="12" md="8">
			<generic-city-selection outlined :city-id="null" label="Birth Place"
									:city.sync="birthPlaceLocal"></generic-city-selection>
		</v-col>
		<v-col cols="12" md="2">
			<generic-sex-selection outlined :sex-id="null" label="Sex" :sex.sync="sexLocal"></generic-sex-selection>
		</v-col>
		<v-col cols="12" md="5">
			<generic-civil-status-selection outlined civil-status-id="null"
											label="Civil Status" :civil-status.sync="civilStatusLocal"></generic-civil-status-selection>
		</v-col>
		<v-col cols="12" md="5">
			<generic-citizenship-selection label="Citizenship(s)" :citizenship.sync="citizenshipLocal"
										   outlined></generic-citizenship-selection>
		</v-col>
		<v-col cols="12" md="6">
			<generic-blood-type-selection outlined :blood-type.sync="bloodTypeLocal"
										  label="Blood Type"></generic-blood-type-selection>
		</v-col>
		<v-col cols="12" md="3">
			<v-text-field type="number" label="Height" suffix="m" outlined v-model="heightLocal"></v-text-field>
		</v-col>
		<v-col cols="12" md="3">
			<v-text-field type="number" label="Weight" suffix="kg" outlined v-model="weightLocal"></v-text-field>
		</v-col>
	</v-row>
</template>

<script>
    import GenericDateInput from "../generic/DateInput";
    import GenericCitySelection from "../selection/City";
    import GenericSexSelection from "../selection/Sex";
    import GenericCivilStatusSelection from "../selection/CivilStatus";
    import GenericBloodTypeSelection from "../selection/BloodType";
    import GenericImageInput from "../generic/PhotoInput";
    import GenericCitizenshipSelection from "../selection/Citizenship";

    export default {
        name: "generic-form-profile",
        components: {
            GenericCitizenshipSelection,
            GenericImageInput,
            GenericBloodTypeSelection,
            GenericCivilStatusSelection, GenericSexSelection, GenericCitySelection, GenericDateInput
        },

        props: {
            firstName: {
                type: String,
                required: true
            },

            middleName: {
                type: String,
                required: true
            },

            lastName: {
                type: String,
                required: true
            },

            extension: {
                type: String,
                required: true
            },

            photo: {
                required: true
            },

            birthDate: {
                required: true
            },

            birthPlace: {
                type: String,
                required: true
            },

            sex: {
                type: String,
                required: true
            },

            civilStatus: {
                type: String,
                required: true
            },

            citizenship: {
                type: Array,
                required: true
            },

            bloodType: {
                type: String,
                required: true
            },

            height: {
                type: Number,
                required: true
            },

            weight: {
                type: Number,
                required: true
            }
        },

        data() {
            return {
                firstNameLocal: "",
                middleNameLocal: "",
                lastNameLocal: "",
                extensionLocal: "",
                photoLocal: null,
                birthDateLocal: null,
                birthPlaceLocal: "",
                sexLocal: "",
                civilStatusLocal: "",
                citizenshipLocal: "",
                bloodTypeLocal: "",
                heightLocal: 0,
                weightLocal: 0,
            };
        },

        watch: {
            firstNameLocal(val) {
                this.$emit("update:firstName", val);
            },

            middleNameLocal(val) {
                this.$emit("update:middleName", val);
            },

            lastNameLocal(val) {
                this.$emit("update:lastName", val);
            },

            extensionLocal(val) {
                this.$emit("update:extension", val);
            },

            photoLocal(val) {
                this.$emit("update:photo", val);
            },

            birthDateLocal(val) {
                this.$emit("update:birthDate", val);
            },

            birthPlaceLocal(val) {
                this.$emit("update:birthPlace", val);
            },

            sexLocal(val) {
                this.$emit("update:sex", val);
            },

            civilStatusLocal(val) {
                this.$emit("update:civilStatus", val);
            },

            citizenshipLocal(val) {
                this.$emit("update:citizenship", val);
            },

            bloodTypeLocal(val) {
                this.$emit("update:bloodType", val);
            },

            heightLocal(val) {
                this.$emit("update:height", parseInt(val));
            },

            weightLocal(val) {
                this.$emit("update:weight", parseInt(val));
            },

            firstName(val) {
                this.firstNameLocal = val;
            },

            middleName(val) {
                this.middleNameLocal = val;
            },

            lastName(val) {
                this.lastNameLocal = val;
            },

            extension(val) {
                this.extensionLocal = val;
            },

            photo(val) {
                this.photoLocal = val;
            },

            birthDate(val) {
                this.birthDateLocal = val;
            },

            birthPlace(val) {
                this.birthPlaceLocal = val;
            },

            sex(val) {
                this.sexLocal = val;
            },

            civilStatus(val) {
                this.civilStatusLocal = val;
            },

            citizenship(val) {
                this.citizenshipLocal = val;
            },

            bloodType(val) {
                this.bloodTypeLocal = val;
            },

            height(val) {
                this.heightLocal = val;
            },

            weight(val) {
                this.weightLocal = val;
            },
        },

        created() {
            this.firstNameLocal = this.firstName;
            this.middleNameLocal = this.middleName;
            this.lastNameLocal = this.lastName;
            this.extensionLocal = this.extension;
            this.birthDateLocal = this.birthDate;
            this.birthPlaceLocal = this.birthPlace;
            this.sexLocal = this.sex;
            this.civilStatusLocal = this.civilStatus;
            this.citizenshipLocal = this.citizenship;
            this.bloodTypeLocal = this.bloodType;
            this.heightLocal = this.height;
            this.weightLocal = this.weight;
        }
    };
</script>