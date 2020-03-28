const employeeModel = require("../employee/model");
const employeeService = require("../employee/service");
const XLSX = require("xlsx");
const path = require("path");

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
    },

    generate: async () => {
        const defaultPDSPath = path.resolve(__dirname + "/pds.xlsx");
        const workbook = XLSX.readFile(defaultPDSPath);
        return XLSX.write(workbook, {type: "buffer", bookType: "xlsx", bookSST: false});
    }
};