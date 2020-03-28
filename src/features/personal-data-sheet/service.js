const employeeModel = require("../employee/model");
const employeeService = require("../employee/service");
const path = require("path");
const ExcelJS = require("exceljs");
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
        let book = await new ExcelJS.Workbook().xlsx.readFile(defaultPDSPath);
        const formattedBook = personalDataSheetService.formatWorkBook(book, employeeInformation);
        return formattedBook.xlsx.writeBuffer();
    },

    formatWorkBook: (book, employeeInformation) => {
        const {profile} = employeeInformation;
        const {lastName, middleName, firstName, extension, birthDate, citizenship, birthPlace, sex, civilStatus, height, weight, bloodType, benefit, address} = profile;
        const personalInformation = [
            {
                cell: "A10",
                position: 3,
                value: lastName
            },
            {
                cell: "A11",
                position: 3,
                value: middleName
            },
            {
                cell: "A12",
                position: 3,
                value: firstName
            },
            {
                cell: "A12",
                position: 11,
                value: extension
            },
            {
                cell: "A13",
                position: 3,
                value: toPDSDefaultDate(birthDate)
            },
            {
                cell: "A13",
                position: 9,
                value: citizenship[0]
            },
            {
                cell: "A15",
                position: 3,
                value: birthPlace
            },
            {
                cell: "A16",
                position: 3,
                value: sex
            },
            {
                cell: "A16",
                position: 9,
                value: citizenship.length > 1 ? citizenship[1] : ""
            },
            {
                cell: "A17",
                position: 3,
                value: civilStatus
            },
            {
                cell: "A17",
                position: 8,
                value: address.residential.houseNumber
            },
            {
                cell: "A17",
                position: 12,
                value: address.residential.street
            },
            {
                cell: "A19",
                position: 8,
                value: address.residential.subdivision
            },
            {
                cell: "A19",
                position: 12,
                value: address.residential.barangay
            },
            {
                cell: "A22",
                position: 3,
                value: height
            },
            {
                cell: "A22",
                position: 8,
                value: address.residential.city
            },
            {
                cell: "A22",
                position: 12,
                value: address.residential.province
            },
            {
                cell: "A24",
                position: 3,
                value: weight
            },
            {
                cell: "A24",
                position: 8,
                value: address.residential.zipCode
            },

            {
                cell: "A25",
                position: 3,
                value: bloodType
            },
            {
                cell: "A25",
                position: 8,
                value: address.permanent.houseNumber
            },
            {
                cell: "A25",
                position: 12,
                value: address.permanent.street
            },
            {
                cell: "A27",
                position: 3,
                value: benefit.gsisId
            },
            {
                cell: "A27",
                position: 8,
                value: address.permanent.subdivision
            },
            {
                cell: "A27",
                position: 12,
                value: address.permanent.barangay
            },
            {
                cell: "A29",
                position: 3,
                value: benefit.pagibigId
            },
            {
                cell: "A29",
                position: 8,
                value: address.permanent.city
            },
            {
                cell: "A29",
                position: 12,
                value: address.permanent.province
            },
            {
                cell: "A31",
                position: 3,
                value: benefit.philhealthId
            },
            {
                cell: "A31",
                position: 8,
                value: address.permanent.zipCode
            },
        ];
        personalInformation.forEach(({cell, position, value}) => {
            book.getWorksheet(1).getCell(cell)._row._cells[position].value = emptyValue(value);
        });
        return book;
    }
};

module.exports = personalDataSheetService;