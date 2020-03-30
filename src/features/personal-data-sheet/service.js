const employeeModel = require("../employee/model");
const employeeService = require("../employee/service");
const path = require("path");
const xlsx = require("xlsx-populate");
const {emptyValue, toPDSDefaultDate} = require("../../customUtilities");

const personalDataSheetService = {
    getSingle: async (employeeId) => await employeeModel.getSingle(employeeId),

    update: async (employeeId, {departmentId, designationId, isFullTime, profile}) => {
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
        const {lastName, middleName, firstName, extension, birthDate, citizenship, birthPlace, sex, civilStatus, height, weight, bloodType, benefit, address, contact, family, education, civilServiceEligibility} = profile;

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
        personalInformation.forEach(({cell, value}) => workbook.sheet(0).cell(cell).value(value));

        const familyBackground = [
            {
                cell: "D36",
                value: emptyValue(family.spouse.lastName).toUpperCase()
            },
            {
                cell: "D37",
                value: emptyValue(family.spouse.firstName).toUpperCase()
            },
            {
                cell: "D38",
                value: emptyValue(family.spouse.middleName).toUpperCase()
            },
            {
                cell: "G38",
                value: emptyValue(family.spouse.extension).toUpperCase()
            },
            {
                cell: "D43",
                value: emptyValue(family.father.lastName).toUpperCase()
            },
            {
                cell: "D44",
                value: emptyValue(family.father.firstName).toUpperCase()
            },
            {
                cell: "D45",
                value: emptyValue(family.father.middleName).toUpperCase()
            },
            {
                cell: "G45",
                value: emptyValue(family.father.extension).toUpperCase()
            },
            {
                cell: "D47",
                value: emptyValue(family.mother.lastName).toUpperCase()
            },
            {
                cell: "D48",
                value: emptyValue(family.mother.firstName).toUpperCase()
            },
            {
                cell: "D49",
                value: emptyValue(family.mother.middleName).toUpperCase()
            },
        ];
        familyBackground.forEach(({cell, value}) => workbook.sheet(0).cell(cell).value(value));

        const familyBackgroundChildren = family.children ? family.children : [];
        familyBackgroundChildren.forEach(({name, birthDate}, index) => {
            const defaultRow = 37;
            workbook.sheet(0).cell(`I${defaultRow + index}`).value(emptyValue(name).toUpperCase());
            workbook.sheet(0).cell(`M${defaultRow + index}`).value(toPDSDefaultDate(emptyValue(birthDate)).toUpperCase());
        });

        const educationalBackground = education ? education : [];
        const EBDefaultRow = 54;

        educationalBackground.forEach((education, index) => {
            workbook.sheet(0).row(EBDefaultRow + index).height(28.5);
            workbook.sheet(0).range(`A${EBDefaultRow + index}:C${EBDefaultRow + index}`).merged(true).value(education.level.toUpperCase());
            workbook.sheet(0).range(`D${EBDefaultRow + index}:F${EBDefaultRow + index}`).merged(true).value(education.schoolName.toUpperCase());
            workbook.sheet(0).range(`G${EBDefaultRow + index}:I${EBDefaultRow + index}`).merged(true).value(education.degree.toUpperCase());
            workbook.sheet(0).cell(`J${EBDefaultRow + index}`).value(education.yearFrom);
            workbook.sheet(0).cell(`K${EBDefaultRow + index}`).value(education.yearTo);
            workbook.sheet(0).cell(`L${EBDefaultRow + index}`).value(education.recognition.toUpperCase());
            workbook.sheet(0).cell(`M${EBDefaultRow + index}`).value(education.yearGraduated);
            workbook.sheet(0).cell(`N${EBDefaultRow + index}`).value(education.scholarship.toUpperCase());
        });
        const EBLastRow = EBDefaultRow + educationalBackground.length - 1;
        workbook.sheet(0).range(`A${EBDefaultRow}:A${EBLastRow}`).style({
            fill: "EAEAEA"
        });
        workbook.sheet(0).range(`A${EBDefaultRow}:N${EBLastRow}`).style({
            fontSize: 8,
            fontFamily: "Arial Narrow",
            horizontalAlignment: "center",
            verticalAlignment: "center",
            wrapText: true,
            border: true,
            borderColor: "000000",
            borderStyle: "thin"
        });

        const footerRow = EBLastRow + 1;
        const signAndDateStyle = {
            fill: "EAEAEA"
        };
        const footerStyle = {
            fontSize: 11,
            fontFamily: "Arial Narrow",
            horizontalAlignment: "center",
            verticalAlignment: "center",
            wrapText: true,
            border: true,
            borderColor: "000000",
            borderStyle: "thick",
            bold: true,
            italic: true
        };
        workbook.sheet(0).row(footerRow).height(27.5);
        workbook.sheet(0).range(`A${footerRow}:N${footerRow}`).style(footerStyle);
        workbook.sheet(0).range(`A${footerRow}:C${footerRow}`).merged(true).value("SIGNATURE").style(signAndDateStyle);
        workbook.sheet(0).range(`D${footerRow}:I${footerRow}`).merged(true);
        workbook.sheet(0).range(`J${footerRow}:K${footerRow}`).merged(true).value("DATE").style(signAndDateStyle);
        workbook.sheet(0).range(`L${footerRow}:N${footerRow}`).merged(true);


        const CSEList = civilServiceEligibility ? civilServiceEligibility : [];
        const CSEDefaultRowsNumber = 7;
        const CSEDefaultRow = 5;
        const CSEStyle = {
            fontSize: 8,
            fontFamily: "Arial Narrow",
            horizontalAlignment: "left",
            verticalAlignment: "center",
            wrapText: true,
            border: true,
            borderColor: "000000",
            borderStyle: "thin",
            fill: "FFFFFF"
        };
        let filledCSEList = [];
        if (CSEList.length <= 7) {
            for (let i = 0; i < CSEDefaultRowsNumber; i++) {
                const currentCSE = CSEList[i];
                if (currentCSE) {
                    filledCSEList.push(currentCSE);
                } else {
                    filledCSEList.push({
                        rating: "",
                        licenseTitle: "",
                        validityDate: "",
                        licenseNumber: "",
                        examinationDate: "",
                        examinationPlace: ""
                    });
                }
            }
        } else {
            filledCSEList = CSEList;
        }

        filledCSEList.forEach((service, index) => {
            workbook.sheet(1).row(CSEDefaultRow + index).height(27.5);
            workbook.sheet(1).range(`A${CSEDefaultRow + index}:M${CSEDefaultRow + index}`).style(CSEStyle);
            workbook.sheet(1).range(`A${CSEDefaultRow + index}:E${CSEDefaultRow + index}`).merged(true).value(service.licenseTitle.toUpperCase());
            workbook.sheet(1).cell(`F${CSEDefaultRow + index}`).value(service.rating.toUpperCase());
            workbook.sheet(1).range(`G${CSEDefaultRow + index}:H${CSEDefaultRow + index}`).merged(true).value(service.examinationDate);
            workbook.sheet(1).range(`I${CSEDefaultRow + index}:K${CSEDefaultRow + index}`).merged(true).value(service.examinationPlace.toUpperCase());
            workbook.sheet(1).cell(`L${CSEDefaultRow + index}`).value(service.licenseNumber.toUpperCase());
            workbook.sheet(1).cell(`M${CSEDefaultRow + index}`).value(service.validityDate);
        });

        const CSELastRow = CSEDefaultRow + filledCSEList.length;
        const workExpHeaderStyle = {
            fontFamily: "Arial Narrow",
            fontColor: "FFFFFF",
            horizontalAlignment: "left",
            verticalAlignment: "center",
            wrapText: true,
            fill: "969696",
            italic: true,
            bold: true
        };

        workbook.sheet(1).row(CSELastRow).height(16.5);
        workbook.sheet(1).range(`A${CSELastRow}:M${CSELastRow}`).merged(true).value("V. Work Experience".toUpperCase()).style({
            ...workExpHeaderStyle,
            fontSize: 11,
            topBorder: true,
            topBorderColor: "000000",
            topBorderStyle: "thick",
            leftBorder: true,
            leftBorderColor: "000000",
            leftBorderStyle: "thick",
            rightBorder: true,
            rightBorderColor: "000000",
            rightBorderStyle: "thick"

        });
        workbook.sheet(1).row(CSELastRow + 1).height(12);
        workbook.sheet(1).range(`A${CSELastRow + 1}:M${CSELastRow + 1}`).merged(true).value("(Include private employment. Start from your recent work) Description of duties should be indicated in the attached Work Experience sheet.").style({
            ...workExpHeaderStyle,
            fontSize: 10,
            bottomBorder: true,
            bottomBorderColor: "000000",
            bottomBorderStyle: "thick",
            leftBorder: true,
            leftBorderColor: "000000",
            leftBorderStyle: "thick",
            rightBorder: true,
            rightBorderColor: "000000",
            rightBorderStyle: "thick"
        });

        return workbook;
    }
};

module.exports = personalDataSheetService;