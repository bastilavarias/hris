const employeeModel = require("../employee/model");
const employeeService = require("../employee/service");
const path = require("path");
const xlsx = require("xlsx-populate");
const {emptyValue, toPDSDefaultDate} = require("../../customUtilities");

const personalDataSheetService = {
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

    generate: async (employeeId) => {
        const employeeInformation = await employeeModel.getSingle(employeeId);
        const defaultPDSPath = path.resolve(__dirname + "/defaultPDS.xlsx");
        let workbook = await xlsx.fromFileAsync(defaultPDSPath);
        workbook = personalDataSheetService.formatWorkBook(workbook, employeeInformation);
        return await workbook.outputAsync();

    },

    formatWorkBook: (workbook, employeeInformation) => {
        const {profile} = employeeInformation;
        const {lastName, middleName, firstName, extension, birthDate, citizenship, birthPlace, sex, civilStatus, height, weight, bloodType, benefit, address, contact} = profile;

        const personalInformation = [
            {
                cell: "D10",
                value: emptyValue(lastName).toUpperCase()
            },
            {
                cell: "D11",
                value: emptyValue(firstName).toUpperCase()
            },
            {
                cell: "D12",
                value: emptyValue(middleName).toUpperCase()
            },
            {
                cell: "L12",
                value: emptyValue(extension).toUpperCase()
            },
            {
                cell: "D13",
                value: toPDSDefaultDate(emptyValue(birthDate)).toUpperCase()
            },
            {
                cell: "D15",
                value: emptyValue(birthPlace).toUpperCase()
            },
            {
                cell: "I17",
                value: emptyValue(address.residential.houseNumber).toUpperCase()
            },
            {
                cell: "L17",
                value: emptyValue(address.residential.street).toUpperCase()
            },
            {
                cell: "I19",
                value: emptyValue(address.residential.subdivision).toUpperCase()
            },
            {
                cell: "L19",
                value: emptyValue(address.residential.barangay).toUpperCase()
            },
            {
                cell: "D22",
                value: height
            },
            {
                cell: "I22",
                value: emptyValue(address.residential.city).toUpperCase()
            },
            {
                cell: "L22",
                value: emptyValue(address.residential.province).toUpperCase()
            },
            {
                cell: "D24",
                value: weight
            },
            {
                cell: "I24",
                value: emptyValue(address.residential.zipCode).toUpperCase()
            },
            {
                cell: "D25",
                value: emptyValue(bloodType).toUpperCase()
            },
            {
                cell: "I25",
                value: emptyValue(address.permanent.houseNumber).toUpperCase()
            },
            {
                cell: "L25",
                value: emptyValue(address.permanent.street).toUpperCase()
            },
            {
                cell: "D27",
                value: emptyValue(benefit.gsisId).toUpperCase()
            },
            {
                cell: "I27",
                value: emptyValue(address.permanent.subdivision).toUpperCase()
            },
            {
                cell: "L27",
                value: emptyValue(address.permanent.barangay).toUpperCase()
            },
            {
                cell: "D29",
                value: emptyValue(benefit.pagibigId).toUpperCase()
            },
            {
                cell: "I29",
                value: emptyValue(address.permanent.city).toUpperCase()
            },
            {
                cell: "L29",
                value: emptyValue(address.permanent.province).toUpperCase()
            },
            {
                cell: "D31",
                value: emptyValue(benefit.philhealthId).toUpperCase()
            },
            {
                cell: "I31",
                value: emptyValue(address.permanent.zipCode).toUpperCase()
            },
            {
                cell: "D32",
                value: emptyValue(benefit.sssNumber).toUpperCase()
            },
            {
                cell: "I32",
                value: emptyValue(contact.telephoneNumber).toUpperCase()
            },
            {
                cell: "D33",
                value: emptyValue(benefit.tinNumber).toUpperCase()
            },
            {
                cell: "I33",
                value: emptyValue(contact.mobileNumber).toUpperCase()
            },
            {
                cell: "D34",
                value: emptyValue(benefit.agencyEmployeeNumber).toUpperCase()
            },
            {
                cell: "I34",
                value: emptyValue(contact.emailAddress).toUpperCase()
            },
        ];

        personalInformation.forEach(({cell, value}) => {
            workbook.sheet(0).cell(cell).value(value);

        });
        return workbook;
    }
};

module.exports = personalDataSheetService;