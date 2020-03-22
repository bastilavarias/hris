const employeeService = require("./service");
const customUtilities = require("../../customUtilities");

module.exports = {
    create: async (req, res) => {
        const parsedProfile = JSON.parse(req.body.profile);
        const employeeData = {
            employeeNumber: req.body.employeeNumber,
            departmentId: customUtilities.toNumber(req.body.departmentId),
            designationId: customUtilities.toNumber(req.body.designationId),
            isFullTime: req.body.isFullTime === "true",
            profile: {
                firstName: parsedProfile.firstName,
                middleName: parsedProfile.middleName,
                lastName: parsedProfile.lastName,
                extension: parsedProfile.extension,
                photo: req.file ? req.file.filename : "",
                birthDate: parsedProfile.birthDate,
                birthPlace: parsedProfile.birthPlace,
                sex: parsedProfile.sex,
                civilStatus: parsedProfile.civilStatus,
                citizenship: parsedProfile.citizenship,
                bloodType: parsedProfile.bloodType ? parsedProfile.bloodType : "",
                height: parsedProfile.height ? parsedProfile.height : "",
                weight: parsedProfile.weight ? parsedProfile.weight : "",
                benefit: {
                    gsisId: "",
                    pagibigId: "",
                    philhealthId: "",
                    sssNumber: "",
                    tinNumber: "",
                    agencyEmployeeNumber: ""
                },
                contact: {telephoneNumber: "", mobileNumber: "", emailAddress: ""},
                address: {
                    permanent: {
                        houseNumber: "",
                        street: "",
                        subdivision: "",
                        barangay: "",
                        city: "",
                        province: "",
                        zipCode: "",
                    },
                    residential: {
                        houseNumber: "",
                        street: "",
                        subdivision: "",
                        barangay: "",
                        city: "",
                        province: "",
                        zipCode: "",
                    },
                },
                family: {
                    spouse: {
                        firstName: "",
                        middleName: "",
                        lastName: "",
                        extension: "",
                    },
                    father: {
                        firstName: "",
                        middleName: "",
                        lastName: "",
                        extension: "",
                    },
                    mother: {
                        firstName: "",
                        middleName: "",
                        lastName: "",
                        extension: "",
                    }
                },
                governmentIssueId: {
                    governmentId: "",
                    licenseNumber: "",
                    issuanceDate: null,
                    issuancePlace: ""
                }
            }
        };

        try {
            const result = await employeeService.create(employeeData);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(400).json({error: {all: error}});
        }
    },

    generateEmployeeNumber: async (req, res) => {
        try {
            const result = await employeeService.generateEmployeeNumber();
            res.status(200).json(result);
        } catch (errors) {
            console.log(errors);
            res.status(400).json(errors);
        }
    },

    getAll: async (req, res) => {
        try {
            const result = await employeeService.getAll();
            res.status(200).json(result);
        } catch (errors) {
            console.log(errors);
            res.status(400).json(errors);
        }
    },

    search: async (req, res) => {
        const searchOption = req.params.searchOption;
        const searchValue = req.params.searchValue;
        try {
            const result = await employeeService.search(searchOption, searchValue);
            res.status(200).json(result);
        } catch (errors) {
            console.log(errors);
            res.status(400).json(errors);
        }
    },

    getSingle: async (req, res) => {
        const employeeId = req.params.employeeId ? parseInt(req.params.employeeId) : null;
        try {
            const result = await employeeService.getSingle(employeeId);
            res.status(200).json(result);
        } catch (errors) {
            console.log(errors);
            res.status(400).json(errors);
        }
    },

    update: async (req, res) => {
        const employeeId = req.params.employeeId ? parseInt(req.params.employeeId) : null;
        const parsedProfile = JSON.parse(req.body.profile);
        const employeeData = {
            departmentId: customUtilities.toNumber(req.body.departmentId),
            designationId: customUtilities.toNumber(req.body.designationId),
            isFullTime: !!req.body.isFullTime,
            profile: {
                firstName: parsedProfile.firstName ? parsedProfile.firstName : "",
                middleName: parsedProfile.middleName,
                lastName: parsedProfile.lastName,
                extension: parsedProfile.extension,
                photo: req.file ? req.file.filename : "",
                birthDate: parsedProfile.birthDate,
                birthPlace: parsedProfile.birthPlace,
                sex: parsedProfile.sex,
                civilStatus: parsedProfile.civilStatus,
                citizenship: parsedProfile.citizenship,
                bloodType: parsedProfile.bloodType ? parsedProfile.bloodType : "",
                height: parsedProfile.height ? parsedProfile.height : "",
                weight: parsedProfile.weight ? parsedProfile.weight : "",
                benefit: {
                    gsisId: "",
                    pagibigId: "",
                    philhealthId: "",
                    sssNumber: "",
                    tinNumber: "",
                    agencyEmployeeNumber: ""
                },
                contact: {telephoneNumber: "", mobileNumber: "", emailAddress: ""},
                address: {
                    permanent: {
                        houseNumber: "",
                        street: "",
                        subdivision: "",
                        barangay: "",
                        city: "",
                        province: "",
                        zipCode: "",
                    },
                    residential: {
                        houseNumber: "",
                        street: "",
                        subdivision: "",
                        barangay: "",
                        city: "",
                        province: "",
                        zipCode: "",
                    },
                },
                family: {
                    spouse: {
                        firstName: "",
                        middleName: "",
                        lastName: "",
                        extension: "",
                    },
                    father: {
                        firstName: "",
                        middleName: "",
                        lastName: "",
                        extension: "",
                    },
                    mother: {
                        firstName: "",
                        middleName: "",
                        lastName: "",
                        extension: "",
                    }
                },
                governmentIssueId: {
                    governmentId: "",
                    licenseNumber: "",
                    issuanceDate: null,
                    issuancePlace: ""
                }
            }
        };
        try {
            const result = await employeeService.getSingle(employeeId);
            res.status(200).json(result);
        } catch (errors) {
            res.status(400).json({
                errors
            });
        }
    }
};