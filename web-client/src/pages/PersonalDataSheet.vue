<template>
  <v-row>
    <v-col cols="12" md="3">
      <v-card>
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <div class="text-center">
                <v-avatar :size="150" color="primary" class="mb-10"></v-avatar>
                <v-file-input
                  label="Image"
                  placeholder="Choose an image"
                  outlined
                  prepend-icon="mdi-camera"
                ></v-file-input>
              </div>
            </v-col>
            <v-col cols="12">
              <v-text-field outlined label="Employee Number"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field outlined label="Department"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field outlined label="Designation"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field outlined label="Appointment Status"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="9">
      <v-card>
        <v-card-title>
          <div class="flex-grow-1"></div>
          <v-btn icon>
            <v-icon>mdi-printer</v-icon>
          </v-btn>
        </v-card-title>
        <v-tabs fixed-tabs v-model="tab">
          <template v-for="(tab, index) in tabs">
            <v-tab :key="index">{{ tab }}</v-tab>
          </template>
        </v-tabs>
        <v-card-text>
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-row dense>
                <v-col cols="12">
                  <personal-data-sheet-profile-form></personal-data-sheet-profile-form>
                </v-col>
                <v-col cols="12">
                  <personal-data-sheet-contact-form></personal-data-sheet-contact-form>
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item>
              <v-row dense>
                <v-col cols="12">
                  <personal-data-sheet-benefit-form></personal-data-sheet-benefit-form>
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item>
              <v-row dense>
                <v-col cols="12">
                  <personal-data-sheet-address-form></personal-data-sheet-address-form>
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item>
              <v-row dense>
                <v-col cols="12">
                  <personal-data-sheet-family-form></personal-data-sheet-family-form>
                </v-col>
                <v-col cols="12">
                  <personal-data-sheet-child-list></personal-data-sheet-child-list>
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item>
              <v-row dense>
                <v-col cols="12">
                  <personal-data-sheet-education-list></personal-data-sheet-education-list>
                </v-col>
                <v-col cols="12">
                  <personal-data-sheet-civil-service-list></personal-data-sheet-civil-service-list>
                </v-col>
                <v-col cols="12">
                  <personal-data-sheet-work-experience-list></personal-data-sheet-work-experience-list>
                </v-col>
                <v-col cols="12">
                  <personal-data-sheet-voluntary-work-experience-list></personal-data-sheet-voluntary-work-experience-list>
                </v-col>
                <v-col cols="12">
                  <personal-data-sheet-training-program-list></personal-data-sheet-training-program-list>
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item>
              <v-row dense>
                <v-col cols="12">
                  <personal-data-sheet-hobby-list></personal-data-sheet-hobby-list>
                </v-col>
                <v-col cols="12">
                  <personal-data-sheet-recognition-list></personal-data-sheet-recognition-list>
                </v-col>
                <v-col cols="12">
                  <personal-data-sheet-organization-list></personal-data-sheet-organization-list>
                </v-col>
                <v-col cols="12">
                  <personal-data-sheet-reference-list></personal-data-sheet-reference-list>
                </v-col>
                <v-col cols="12">
                  <personal-data-sheet-issued-id-form></personal-data-sheet-issued-id-form>
                </v-col>
              </v-row>
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
        <v-card-actions>
          <v-btn color="secondary" block>Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import PersonalDataSheetProfileForm from "../components/personal-data-sheet/ProfileForm";
import PersonalDataSheetBenefitForm from "../components/personal-data-sheet/BenefitForm";
import PersonalDataSheetAddressForm from "../components/personal-data-sheet/AddressForm";
import PersonalDataSheetFamilyForm from "../components/personal-data-sheet/FamilyForm";
import PersonalDataSheetContactForm from "../components/personal-data-sheet/ContactForm";
import PersonalDataSheetChildList from "../components/personal-data-sheet/ChildList";
import PersonalDataSheetEducationList from "../components/personal-data-sheet/EducationList";
import PersonalDataSheetCivilServiceList from "../components/personal-data-sheet/CivilServiceList";
import PersonalDataSheetWorkExperienceList from "../components/personal-data-sheet/WorkExperienceList";
import PersonalDataSheetVoluntaryWorkExperienceList from "../components/personal-data-sheet/VoluntaryWorkExperience";
import PersonalDataSheetTrainingProgramList from "../components/personal-data-sheet/TrainingProgramList";
import PersonalDataSheetHobbyList from "../components/personal-data-sheet/HobbyList";
import PersonalDataSheetOrganizationList from "../components/personal-data-sheet/OrganizationList";
import PersonalDataSheetRecognitionList from "../components/personal-data-sheet/RecognitionList";
import PersonalDataSheetReferenceList from "../components/personal-data-sheet/ReferenceList";
import PersonalDataSheetIssuedIdForm from "../components/personal-data-sheet/IssuedIdForm";
export default {
  components: {
    PersonalDataSheetIssuedIdForm,
    PersonalDataSheetReferenceList,
    PersonalDataSheetRecognitionList,
    PersonalDataSheetOrganizationList,
    PersonalDataSheetHobbyList,
    PersonalDataSheetTrainingProgramList,
    PersonalDataSheetVoluntaryWorkExperienceList,
    PersonalDataSheetWorkExperienceList,
    PersonalDataSheetCivilServiceList,
    PersonalDataSheetEducationList,
    PersonalDataSheetChildList,
    PersonalDataSheetContactForm,
    PersonalDataSheetFamilyForm,
    PersonalDataSheetAddressForm,
    PersonalDataSheetBenefitForm,
    PersonalDataSheetProfileForm,
  },
  data() {
    return {
      tab: 0,
      tabs: [
        "Profile",
        "Benefits",
        "Address Details",
        "Family Details",
        "Experience",
        "Other Information",
      ],
    };
  },
};
</script>
