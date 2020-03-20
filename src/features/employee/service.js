const employeeModel = require("./model");
const profileModel = require("../profile/model");
const benefitModel = require("../benefit/model");
const contactModel = require("../contact/model");
const addressModel = require("../address/model");
const familyModel = require("../family/model");
const governmentIdModel = require("../governmentId/model");
const helper = require("../../helper");
const customUtilities = require("../../customUtilities");

const employeeService = {
    create: async ({employeeNumber, departmentId, designationId, isFullTime, profile}) => {
        let error = {};
        let message = "";
        const isEmployeeExists = await helper.checkIfExists("employee", "employee_number", employeeNumber.toLowerCase());
        if (isEmployeeExists) {
            error.employeeNumber = "Employee number was already used.";
            helper.removeFile(profile.photo, "photos");
            return {
                message,
                error
            };
        }
        // const createdBenefitId = await benefitModel.create(profile.benefit);
        // const createdContactId = await contactModel.create(profile.contact);
        // const createdAddressId = await addressModel.create(profile.address);
        // const createdFamilyId = await familyModel.create(profile.family);
        // if (profile.family.children.length > 0) profile.family.children.map(async child => familyModel.addChild(createdFamilyId, child));
        // const createdGovermentIdId = await governmentIdModel.create(profile.governmentId);
        const createdProfileId = await profileModel.create(profile);
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

    getAll: async () => {
        return await employeeModel.getAll();
    },

    search: async (option, value) => {
        const options = {
            "employee number": "employee_number",
            "last name": "last_name"
        };
        return await employeeModel.search(options[option], value.trim().toLowerCase());
    },
};

module.exports = employeeService;