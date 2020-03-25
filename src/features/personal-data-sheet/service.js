const employeeModel = require("../employee/model");
const employeeService = require("../employee/service");

module.exports = {
    getSingle: async (employeeId) => await employeeModel.getSingle(employeeId),

    update: async (employeeId, {departmentId, designationId, isFullTime, profile}) => {
        console.log(profile);
        const {error} = await employeeService.update(employeeId, {departmentId, designationId, isFullTime, profile});
        let message = "Your information was edited.";

        return {
            message,
            error
        };
    }
};