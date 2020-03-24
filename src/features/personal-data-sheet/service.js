const employeeModel = require("../employee/model");


module.exports = {
    getSingle: async (employeeId) => await employeeModel.getSingle(employeeId)
};