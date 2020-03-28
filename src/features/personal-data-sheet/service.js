const employeeModel = require("../employee/model");
const employeeService = require("../employee/service");
const path = require("path");
const ExcelJS = require("exceljs");

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
        const book = new ExcelJS.Workbook();
        const defaultPDSPath = path.resolve(__dirname + "/defaultPDS.xlsx");
        const workbook = await book.xlsx.readFile(defaultPDSPath);
        return workbook.xlsx.writeBuffer();
    }
};