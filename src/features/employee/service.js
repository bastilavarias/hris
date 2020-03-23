const employeeModel = require("./model");
const profileModel = require("../profile/model");
const benefitModel = require("../profile/benefit/model");
const contactModel = require("../contact/model");
const addressModel = require("../profile/address/model");
const familyModel = require("../profile/family/model");
const governmentIssueIdModel = require("../profile/governmentIssueId/model");
const civilServiceEligibility = require("../profile/civilServiceEligibility/model");
const photoModel = require("../profile/photo/model");
const educationModel = require("../profile/education/model");
const workExperienceModel = require("../profile/workExperience/model");
const voluntaryWorkExperienceModel = require("../profile/voluntaryWorkExperience/model");
const trainingModel = require("../profile/training/model");
const hobbyModel = require("../profile/hobby/model");
const recognitionModel = require("../profile/recognition/model");
const organizationModel = require("../profile/organization/model");
const referenceModel = require("../profile/reference/model");
const helper = require("../../helper");
const customUtilities = require("../../customUtilities");
const cloudinaryService = require("../cloudinary/service");

const employeeService = {
    create: async ({employeeNumber, departmentId, designationId, isFullTime, profile}) => {
        let error = {};
        let message = "";
        const isEmployeeExists = await helper.checkIfExists("employee", "employee_number", employeeNumber.toLowerCase());
        if (isEmployeeExists) {
            error.employeeNumber = "Employee number was already used.";
            return {
                message,
                error
            };
        }
        const createdBenefitId = await benefitModel.create(profile.benefit);
        const createdContactId = await contactModel.create(profile.contact);
        const createdAddressId = await addressModel.create(profile.address);
        const createdFamilyId = await familyModel.create(profile.family);
        const createdGovernmentIssueId = await governmentIssueIdModel.create(profile.governmentIssueId);
        let profilePhotoMeta = {url: "", publicId: ""};
        if (profile.photo) {
            const {url, public_id} = await cloudinaryService.upload(profile.photo);
            profilePhotoMeta = {url, publicId: public_id};
        }
        const createPhotoId = await photoModel.create(profilePhotoMeta);
        const createdProfileId = await profileModel.create({
            benefitId: createdBenefitId,
            contactId: createdContactId,
            addressId: createdAddressId,
            familyId: createdFamilyId,
            governmentIssueIdId: createdGovernmentIssueId,
            photoId: createPhotoId
        }, profile);
        if (profile.citizenship.length > 0) profile.citizenship.map(async name => await profileModel.addCitizenship(createdProfileId, name));
        await employeeModel.create({
            employeeNumber,
            departmentId,
            designationId,
            isFullTime,
            profileId: createdProfileId
        });
        message = "New employee is created.";
        return {
            error,
            message
        };
    },

    generateEmployeeNumber: async () => {
        const universityCode = 38;
        const currentYear = customUtilities.getCurrentYear();
        const employeeTableCount = parseInt(await helper.countTableRows("employee"));
        let lastPart = "";
        if (employeeTableCount >= 0 && employeeTableCount <= 9) lastPart = `000${employeeTableCount}`;
        if (employeeTableCount >= 10 && employeeTableCount <= 99) lastPart = `00${employeeTableCount}`;
        if (employeeTableCount >= 100 && employeeTableCount <= 999) lastPart = `0${employeeTableCount}`;
        if (employeeTableCount >= 1000) lastPart = `${employeeTableCount}`;
        return {
            employeeNumber: `${universityCode}-${currentYear}-${lastPart}`
        };
    },

    getAll: async () => await employeeModel.getAll(),

    search: async (option, value) => {
        const options = {
            "employee number": "employee_number",
            "last name": "last_name"
        };
        return await employeeModel.search(options[option], value.trim().toLowerCase());
    },

    getSingle: async (employeeId) => await employeeModel.getSingle(employeeId),

    update: async (employeeId, {departmentId, designationId, isFullTime, profile}) => {
        const gotRawEmployee = await employeeModel.getRaw(employeeId);
        const gotRawProfile = await profileModel.getRaw(gotRawEmployee.profileId);
        const gotRawPhoto = await photoModel.getRaw(gotRawProfile.photoId);

        if (profile.photo) {
            await cloudinaryService.delete(gotRawPhoto.publicId);
            const {url, public_id} = await cloudinaryService.upload(profile.photo);
            await photoModel.update(gotRawPhoto.id, {url, publicId: public_id});
        }
        await profileModel.update(gotRawProfile.id, profile);
        await benefitModel.update(gotRawProfile.benefitId, profile.benefit);
        await contactModel.update(gotRawProfile.contactId, profile.contact);
        await addressModel.update(gotRawProfile.addressId, profile.address);
        await familyModel.update(gotRawProfile.familyId, profile.family);
        await governmentIssueIdModel.update(gotRawProfile.governmentIssueIdId, profile.governmentIssueId);

        await profileModel.deleteCitizenship(gotRawProfile.id);
        if (profile.citizenship.length > 0) {
            profile.citizenship.map(nation => profileModel.addCitizenship(gotRawProfile.id, nation));
        }
        await familyModel.deleteChildren(gotRawProfile.familyId);
        if (profile.family.children.length > 0) {
            profile.family.children.map(child => familyModel.addChild(gotRawProfile.familyId, child));
        }
        await educationModel.delete(gotRawProfile.id);
        if (profile.education.length > 0) {
            profile.education.map(details => educationModel.create(gotRawProfile.id, details));
        }
        await civilServiceEligibility.delete(gotRawProfile.id);
        if (profile.civilServiceEligibility.length > 0) {
            profile.civilServiceEligibility.map(details => civilServiceEligibility.create(gotRawProfile.id, details));
        }
        await workExperienceModel.delete(gotRawProfile.id);
        if (profile.workExperiences.length > 0) {
            profile.workExperiences.map(details => workExperienceModel.create(gotRawProfile.id, details));
        }
        await voluntaryWorkExperienceModel.delete(gotRawProfile.id);
        if (profile.voluntaryWorkExperiences.length > 0) {
            profile.voluntaryWorkExperiences.map(details => voluntaryWorkExperienceModel.create(gotRawProfile.id, details));
        }
        await trainingModel.delete(gotRawProfile.id);
        if (profile.trainings.length > 0) {
            profile.trainings.map(details => trainingModel.create(gotRawProfile.id, details));
        }
        await hobbyModel.delete(gotRawProfile.id);
        if (profile.hobbies.length > 0) {
            profile.hobbies.map(name => hobbyModel.create(gotRawProfile.id, name));
        }
        await recognitionModel.delete(gotRawProfile.id);
        if (profile.recognitions.length > 0) {
            profile.recognitions.map(name => recognitionModel.create(gotRawProfile.id, name));
        }
        await organizationModel.delete(gotRawProfile.id);
        if (profile.organizations.length > 0) {
            profile.organizations.map(name => organizationModel.create(gotRawProfile.id, name));
        }
        await referenceModel.delete(gotRawProfile.id);
        if (profile.references.length > 0) {
            profile.references.map(details => referenceModel.create(gotRawProfile.id, details));
        }
    }

};

module.exports = employeeService;