const employeeModel = require("./model");
const profileModel = require("../profile/model");
const helper = require("../../helper");

module.exports = {
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
        const createdProfileID = await profileModel.create(profile);
        await employeeModel.create({
            employeeNumber,
            departmentId,
            designationId,
            isFullTime,
            profileId: createdProfileID
        });
        message = "New employee is created.";
        return {
            error,
            message
        };
    }
};