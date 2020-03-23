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
                photo: req.files ? req.files.profilePhoto : "",
                birthDate: parsedProfile.birthDate,
                birthPlace: parsedProfile.birthPlace,
                sex: parsedProfile.sex,
                civilStatus: parsedProfile.civilStatus,
                citizenship: parsedProfile.citizenship,
                bloodType: parsedProfile.bloodType ? parsedProfile.bloodType : "",
                height: parsedProfile.height ? parsedProfile.height : 0,
                weight: parsedProfile.weight ? parsedProfile.weight : 0,
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
        const employeeId = customUtilities.toNumber(req.params.employeeId);
        const parsedProfile = JSON.parse(req.body.profile);
        const employeeData = {
            departmentId: customUtilities.toNumber(req.body.departmentId),
            designationId: customUtilities.toNumber(req.body.designationId),
            isFullTime: !!req.body.isFullTime,
            profile: {
                firstName: parsedProfile.firstName,
                middleName: parsedProfile.middleName,
                lastName: parsedProfile.lastName,
                extension: parsedProfile.extension,
                photo: req.files ? req.files.profilePhoto : "",
                birthDate: parsedProfile.birthDate,
                birthPlace: parsedProfile.birthPlace,
                sex: parsedProfile.sex,
                civilStatus: parsedProfile.civilStatus,
                citizenship: parsedProfile.citizenship,
                bloodType: parsedProfile.bloodType,
                height: parsedProfile.height,
                weight: parsedProfile.weight,
                benefit: {
                    gsisId: parsedProfile.benefit.gsisId,
                    pagibigId: parsedProfile.benefit.pagibigId,
                    philhealthId: parsedProfile.benefit.philhealthId,
                    sssNumber: parsedProfile.benefit.sssNumber,
                    tinNumber: parsedProfile.benefit.tinNumber,
                    agencyEmployeeNumber: parsedProfile.benefit.agencyEmployeeNumber
                },
                contact: {
                    telephoneNumber: parsedProfile.contact.telephoneNumber,
                    mobileNumber: parsedProfile.contact.mobileNumber,
                    emailAddress: parsedProfile.contact.emailAddress
                },
                address: {
                    permanent: {
                        houseNumber: parsedProfile.address.permanent.houseNumber,
                        street: parsedProfile.address.permanent.street,
                        subdivision: parsedProfile.address.permanent.subdivision,
                        barangay: parsedProfile.address.permanent.barangay,
                        city: parsedProfile.address.permanent.city,
                        province: parsedProfile.address.permanent.province,
                        zipCode: parsedProfile.address.permanent.zipCode
                    },
                    residential: {
                        houseNumber: parsedProfile.address.residential.houseNumber,
                        street: parsedProfile.address.residential.street,
                        subdivision: parsedProfile.address.residential.subdivision,
                        barangay: parsedProfile.address.residential.barangay,
                        city: parsedProfile.address.residential.city,
                        province: parsedProfile.address.residential.province,
                        zipCode: parsedProfile.address.residential.zipCode
                    },
                },
                family: {
                    spouse: {
                        firstName: parsedProfile.family.spouse.firstName,
                        middleName: parsedProfile.family.spouse.middleName,
                        lastName: parsedProfile.family.spouse.lastName,
                        extension: parsedProfile.family.spouse.extension,
                    },
                    father: {
                        firstName: parsedProfile.family.father.firstName,
                        middleName: parsedProfile.family.father.middleName,
                        lastName: parsedProfile.family.father.lastName,
                        extension: parsedProfile.family.father.extension,
                    },
                    mother: {
                        firstName: parsedProfile.family.mother.firstName,
                        middleName: parsedProfile.family.mother.middleName,
                        lastName: parsedProfile.family.mother.lastName,
                        extension: parsedProfile.family.mother.extension,
                    },
                    children: parsedProfile.family.children ? parsedProfile.family.children : []
                },
                governmentIssueId: {
                    governmentId: parsedProfile.governmentIssueId.governmentId,
                    licenseNumber: parsedProfile.governmentIssueId.licenseNumber,
                    issuanceDate: parsedProfile.governmentIssueId.issuanceDate,
                    issuancePlace: parsedProfile.governmentIssueId.issuancePlace,
                },
                education: parsedProfile.education,
                civilServiceEligibility: parsedProfile.civilServiceEligibility,
                workExperiences: parsedProfile.workExperiences,
                voluntaryWorkExperiences: parsedProfile.voluntaryWorkExperiences,
                trainings: parsedProfile.trainings,
                hobbies: parsedProfile.hobbies,
                recognitions: parsedProfile.recognitions,
                organizations: parsedProfile.organizations,
                references: parsedProfile.references
            }
        };
        try {
            const result = await employeeService.update(employeeId, employeeData);
            res.status(200).json(result);
        } catch (errors) {
            console.log(errors);
            res.status(400).json({
                errors
            });
        }
    }
};