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
        const {lastName, middleName, firstName, extension, birthDate, citizenship, birthPlace, sex, civilStatus, height, weight, bloodType, benefit, address, contact, family, education, civilServiceEligibility, workExperiences, voluntaryWorkExperiences} = profile;

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
        workbook.sheet(0).range(`A${EBDefaultRow}:N${EBLastRow}`).style({
            fill: "FFFFFF",
            fontSize: 8,
            fontFamily: "Arial Narrow",
            horizontalAlignment: "center",
            verticalAlignment: "center",
            wrapText: true,
            border: true,
            borderColor: "000000",
            borderStyle: "thin"
        });
        workbook.sheet(0).range(`A${EBDefaultRow}:A${EBLastRow}`).style({
            fill: "EAEAEA"
        });

        const worksheet1FooterRowPosition = EBLastRow + 1;
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
        workbook.sheet(0).row(worksheet1FooterRowPosition).height(27.5);
        workbook.sheet(0).range(`A${worksheet1FooterRowPosition}:N${worksheet1FooterRowPosition}`).style(footerStyle);
        workbook.sheet(0).range(`A${worksheet1FooterRowPosition}:C${worksheet1FooterRowPosition}`).merged(true).value("SIGNATURE").style(signAndDateStyle);
        workbook.sheet(0).range(`D${worksheet1FooterRowPosition}:I${worksheet1FooterRowPosition}`).merged(true);
        workbook.sheet(0).range(`J${worksheet1FooterRowPosition}:K${worksheet1FooterRowPosition}`).merged(true).value("DATE").style(signAndDateStyle);
        workbook.sheet(0).range(`L${worksheet1FooterRowPosition}:N${worksheet1FooterRowPosition}`).merged(true);


        const CSEList = civilServiceEligibility ? civilServiceEligibility : [];
        const CSEDefaultRowsNumber = 7;
        const CSEDefaultRow = 5;
        const defaultRowItemStyle = {
            fill: "FFFFFF",
            fontSize: 8,
            fontFamily: "Arial Narrow",
            horizontalAlignment: "center",
            verticalAlignment: "center",
            wrapText: true,
            border: true,
            borderColor: "000000",
            borderStyle: "thin"
        };
        let filledCSEList = [];
        if (CSEList.length <= CSEDefaultRowsNumber) {
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
            workbook.sheet(1).range(`A${CSEDefaultRow + index}:M${CSEDefaultRow + index}`).style(defaultRowItemStyle);
            workbook.sheet(1).range(`A${CSEDefaultRow + index}:E${CSEDefaultRow + index}`).merged(true).value(service.licenseTitle.toUpperCase());
            workbook.sheet(1).cell(`F${CSEDefaultRow + index}`).value(service.rating.toUpperCase());
            workbook.sheet(1).range(`G${CSEDefaultRow + index}:H${CSEDefaultRow + index}`).merged(true).value(service.examinationDate);
            workbook.sheet(1).range(`I${CSEDefaultRow + index}:K${CSEDefaultRow + index}`).merged(true).value(service.examinationPlace.toUpperCase());
            workbook.sheet(1).cell(`L${CSEDefaultRow + index}`).value(service.licenseNumber.toUpperCase());
            workbook.sheet(1).cell(`M${CSEDefaultRow + index}`).value(service.validityDate);
        });

        const workExperienceHeaderPosition = CSEDefaultRow + filledCSEList.length;
        const defaultHeaderStyle = {
            fontFamily: "Arial Narrow",
            fontColor: "FFFFFF",
            horizontalAlignment: "left",
            verticalAlignment: "center",
            wrapText: true,
            fill: "969696",
            italic: true,
            bold: true
        };

        workbook.sheet(1).row(workExperienceHeaderPosition).height(16.5);
        workbook.sheet(1).range(`A${workExperienceHeaderPosition}:M${workExperienceHeaderPosition}`).merged(true).value("V. Work Experience".toUpperCase()).style({
            ...defaultHeaderStyle,
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
        workbook.sheet(1).row(workExperienceHeaderPosition + 1).height(12);
        workbook.sheet(1).range(`A${workExperienceHeaderPosition + 1}:M${workExperienceHeaderPosition + 1}`).merged(true).value("(Include private employment. Start from your recent work) Description of duties should be indicated in the attached Work Experience sheet.").style({
            ...defaultHeaderStyle,
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

        const workExperienceColumnPosition = workExperienceHeaderPosition + 2;
        const defaultColumnStyle = {
            fill: "EAEAEA",
            fontFamily: "Arial Narrow",
            fontSize: 8,
            horizontalAlignment: "center",
            verticalAlignment: "center",
            wrapText: true,
            border: true,
            borderColor: "000000",
            borderStyle: "thin",
            topBorder: false,
            bottomBorder: false
        };

        workbook.sheet(1).range(`A${workExperienceColumnPosition}:M${workExperienceColumnPosition + 2}`).style(
            defaultColumnStyle
        );
        workbook.sheet(1).row(workExperienceColumnPosition).height(18);
        workbook.sheet(1).row(workExperienceColumnPosition + 1).height(18);
        workbook.sheet(1).row(workExperienceColumnPosition + 2).height(18);

        workbook.sheet(1).cell(`A${workExperienceColumnPosition}`).value("28.").style(
            {
                horizontalAlignment: "left",
                verticalAlignment: "bottom",
                rightBorder: false
            }
        );
        workbook.sheet(1).cell(`A${workExperienceColumnPosition + 1}`).style(
            {
                rightBorder: false,
                topBorder: false
            }
        );
        workbook.sheet(1).range(`B${workExperienceColumnPosition}:C${workExperienceColumnPosition + 1}`).merged(true).value("INCLUSIVE DATES\n(mm/dd/yyyy)").style({leftBorder: false});
        workbook.sheet(1).range(`D${workExperienceColumnPosition}:F${workExperienceColumnPosition + 2}`).merged(true).value("POSITION TITLE\n(Write in full/Do not abbreviate)");
        workbook.sheet(1).range(`G${workExperienceColumnPosition}:I${workExperienceColumnPosition + 2}`).merged(true).value("DEPARTMENT / AGENCY / OFFICE / COMPANY\n(Write in full/Do not abbreviate)");
        workbook.sheet(1).range(`J${workExperienceColumnPosition}:J${workExperienceColumnPosition + 2}`).merged(true).value("MONTHLY\nSALARY");
        workbook.sheet(1).range(`K${workExperienceColumnPosition}:K${workExperienceColumnPosition + 2}`).merged(true).value(`SALARY/ JOB/ PAY GRADE (if applicable)& STEP  (Format \"00-0\")/ INCREMENT`).style({
            fontSize: 6
        });
        workbook.sheet(1).range(`L${workExperienceColumnPosition}:L${workExperienceColumnPosition + 2}`).merged(true).value("STATUS OF\nAPPOINTMENT");
        workbook.sheet(1).range(`M${workExperienceColumnPosition}:M${workExperienceColumnPosition + 2}`).merged(true).value("GOV'T SERVICE\n(Y/N)");
        workbook.sheet(1).range(`A${workExperienceColumnPosition + 2}:B${workExperienceColumnPosition + 2}`).merged(true).value("From");
        workbook.sheet(1).cell(`C${workExperienceColumnPosition + 2}`).value("To");
        workbook.sheet(1).range(`A${workExperienceColumnPosition + 2}:C${workExperienceColumnPosition + 2}`).style({
            topBorder: true,
            topBorderColor: "000000",
            topBorderStyle: "thin"
        });

        const workExperiencesList = workExperiences ? workExperiences : [];
        const workExperiencesDefaultRowsNumber = 24;
        const workExperiencesDefaultRow = workExperienceColumnPosition + 3;
        let filledWorkExperiencesList = [];
        if (workExperiencesList.length <= workExperiencesDefaultRowsNumber) {
            for (let i = 0; i < workExperiencesDefaultRow; i++) {
                const currentWorkExperience = workExperiencesList[i];
                if (currentWorkExperience) {
                    filledWorkExperiencesList.push(currentWorkExperience);
                } else {
                    filledWorkExperiencesList.push({
                        companyName: "",
                        position: "",
                        monthlySalary: "",
                        yearFrom: "",
                        yearTo: "",
                        isFullTime: false,
                        isGovernmentService: false
                    });
                }
            }
        } else {
            filledWorkExperiencesList = workExperiencesList;
        }


        filledWorkExperiencesList.forEach((experience, index) => {
            workbook.sheet(1).row(workExperiencesDefaultRow + index).height(27.5);
            workbook.sheet(1).range(`A${workExperiencesDefaultRow + index}:M${workExperiencesDefaultRow + index}`).style(defaultRowItemStyle);
            workbook.sheet(1).range(`A${workExperiencesDefaultRow + index}:B${workExperiencesDefaultRow + index}`).merged(true).value(emptyValue(experience.yearFrom));
            workbook.sheet(1).cell(`C${workExperiencesDefaultRow + index}`).value(emptyValue(experience.yearTo));
            workbook.sheet(1).range(`D${workExperiencesDefaultRow + index}:F${workExperiencesDefaultRow + index}`).merged(true).value(emptyValue(experience.position));
            workbook.sheet(1).range(`G${workExperiencesDefaultRow + index}:I${workExperiencesDefaultRow + index}`).merged(true).value(emptyValue(experience.companyName));
            workbook.sheet(1).cell(`J${workExperiencesDefaultRow + index}`).value(emptyValue(experience.monthlySalary));
            workbook.sheet(1).cell(`L${workExperiencesDefaultRow + index}`).value(experience.companyName ? experience.isFullTime ? "Full Time" : "Part Time" : "");
            workbook.sheet(1).cell(`M${workExperiencesDefaultRow + index}`).value(experience.companyName ? experience.isGovernmentService ? "Yes" : "No" : "");
        });

        const worksheet2FooterRowPosition = workExperiencesDefaultRow + filledWorkExperiencesList.length;
        workbook.sheet(1).row(worksheet2FooterRowPosition).height(27.5);
        workbook.sheet(1).range(`A${worksheet2FooterRowPosition}:M${worksheet2FooterRowPosition}`).style(footerStyle);
        workbook.sheet(1).range(`A${worksheet2FooterRowPosition}:C${worksheet2FooterRowPosition}`).merged(true).value("SIGNATURE").style(signAndDateStyle);
        workbook.sheet(1).range(`D${worksheet2FooterRowPosition}:H${worksheet2FooterRowPosition}`).merged(true);
        workbook.sheet(1).cell(`I${worksheet2FooterRowPosition}`).value("DATE").style(signAndDateStyle);
        workbook.sheet(1).range(`J${worksheet2FooterRowPosition}:M${worksheet2FooterRowPosition}`).merged(true);


        const voluntaryWorkExperiencesList = voluntaryWorkExperiences ? voluntaryWorkExperiences : [];
        const voluntaryWorkExperiencesDefaultRowsNumber = 7;
        const voluntaryWorkExperiencesDefaultRow = 6;
        let filledVoluntaryExperiencesList = [];
        if (voluntaryWorkExperiencesList.length <= voluntaryWorkExperiencesDefaultRowsNumber) {
            for (let i = 0; i < voluntaryWorkExperiencesDefaultRow; i++) {
                const currentVoluntaryWorkExperience = voluntaryWorkExperiencesList[i];
                if (currentVoluntaryWorkExperience) {
                    filledVoluntaryExperiencesList.push(currentVoluntaryWorkExperience);
                } else {
                    filledVoluntaryExperiencesList.push({
                        yearTo: "",
                        address: "",
                        position: "",
                        yearFrom: "",
                        companyName: "",
                        hoursNumber: ""
                    });
                }
            }
        } else {
            filledVoluntaryExperiencesList = voluntaryWorkExperiencesList;
        }

        filledVoluntaryExperiencesList.forEach((experience, index) => {
            workbook.sheet(2).row(voluntaryWorkExperiencesDefaultRow + index).height(27.5);
            workbook.sheet(2).range(`A${voluntaryWorkExperiencesDefaultRow + index}:K${voluntaryWorkExperiencesDefaultRow + index}`.toUpperCase()).style(defaultRowItemStyle);
            workbook.sheet(2).range(`A${voluntaryWorkExperiencesDefaultRow + index}:D${voluntaryWorkExperiencesDefaultRow + index}`).merged(true).value(`${experience.companyName}\n${experience.address}`.toUpperCase());
            workbook.sheet(2).cell(`E${voluntaryWorkExperiencesDefaultRow + index}`).value(`${emptyValue(experience.yearFrom)}`);
            workbook.sheet(2).cell(`F${voluntaryWorkExperiencesDefaultRow + index}`).value(`${emptyValue(experience.yearTo)}`);
            workbook.sheet(2).cell(`G${voluntaryWorkExperiencesDefaultRow + index}`).value(`${emptyValue(experience.hoursNumber)}`);
            workbook.sheet(2).range(`H${voluntaryWorkExperiencesDefaultRow + index}:K${voluntaryWorkExperiencesDefaultRow + index}`).merged(true).value(`${emptyValue(experience.position)}`.toUpperCase());
        });

        const trainingsHeaderPosition = voluntaryWorkExperiencesDefaultRow + filledVoluntaryExperiencesList.length;

        workbook.sheet(2).row(trainingsHeaderPosition).height(16.5);
        workbook.sheet(2).range(`A${trainingsHeaderPosition}:K${trainingsHeaderPosition}`).merged(true).value("VII.  LEARNING AND DEVELOPMENT (L&D) INTERVENTIONS/TRAINING PROGRAMS ATTENDED").style({
            ...defaultHeaderStyle,
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
        workbook.sheet(2).row(trainingsHeaderPosition + 1).height(12);
        workbook.sheet(2).range(`A${trainingsHeaderPosition + 1}:K${trainingsHeaderPosition + 1}`).merged(true).value("(Start from the most recent L&D/training program and include only the relevant L&D/training taken for the last five (5) years for Division Chief/Executive/Managerial positions)").style({
            ...defaultHeaderStyle,
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

        const trainingsColumnPosition = trainingsHeaderPosition + 2;

        workbook.sheet(2).range(`A${trainingsColumnPosition}:K${trainingsColumnPosition + 2}`).style(
            defaultColumnStyle
        );
        workbook.sheet(2).row(trainingsColumnPosition).height(18);
        workbook.sheet(2).row(trainingsColumnPosition + 1).height(25.5);
        workbook.sheet(2).row(trainingsColumnPosition + 2).height(13.5);

        workbook.sheet(2).range(`A${trainingsColumnPosition}:A${trainingsColumnPosition + 1}`).merged(true).value("30.").style(
            {
                horizontalAlignment: "center",
                verticalAlignment: "center",
                rightBorder: false
            }
        );
        workbook.sheet(2).range(`A${trainingsColumnPosition + 1}:A${trainingsColumnPosition + 2}`).style(
            {
                rightBorder: false,
                topBorder: false
            }
        );
        workbook.sheet(2).range(`B${trainingsColumnPosition}:D${trainingsColumnPosition + 2}`).merged(true).value("TITLE OF LEARNING AND DEVELOPMENT INTERVENTIONS/TRAINING PROGRAMS\n(Write in full)").style({
            leftBorder: false
        });
        workbook.sheet(2).range(`E${trainingsColumnPosition}:F${trainingsColumnPosition + 1}`).merged(true).value("INCLUSIVE DATES OF ATTENDANCE\n(mm/dd/yyyy)").style({
            bottomBorder: true,
            bottomBorderColor: "000000",
            bottomBorderStyle: "thin"
        });
        workbook.sheet(2).cell(`E${trainingsColumnPosition + 2}`).value("From");
        workbook.sheet(2).cell(`F${trainingsColumnPosition + 2}`).value("To");
        workbook.sheet(2).range(`G${trainingsColumnPosition}:G${trainingsColumnPosition + 2}`).merged(true).value("NUMBER OF HOURS").style({fontSize: 6});
        workbook.sheet(2).range(`H${trainingsColumnPosition}:H${trainingsColumnPosition + 2}`).merged(true).value("Type of LD\n" +
            "( Managerial/ Supervisory/\n" +
            "Technical/etc)").style({fontSize: 7});
        workbook.sheet(2).range(`I${trainingsColumnPosition}:K${trainingsColumnPosition + 2}`).merged(true).value(" CONDUCTED/ SPONSORED BY \n(Write in full)");

        return workbook;
    }
};

module.exports = personalDataSheetService;