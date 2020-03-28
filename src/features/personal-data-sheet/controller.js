const personalDataSheetService = require("./service");

module.exports = {
    getSingle: async (req, res) => {
        const employeeId = parseInt(req.user.id);
        try {
            const result = await personalDataSheetService.getSingle(employeeId);
            res.status(200).json(result);
        } catch (errors) {
            console.log(errors);
            res.status(400).json(errors);
        }
    },

    update: async (req, res) => {
        const employeeId = parseInt(req.user.id);
        const parsedProfile = JSON.parse(req.body.profile);
        const pds = {
            departmentId: parseInt(req.user.department.id),
            designationId: parseInt(req.user.designation.id),
            isFullTime: req.user.isFullTime,
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
                    issuanceDate: parsedProfile.governmentIssueId.issuanceDate ? parsedProfile.governmentIssueId.issuanceDate : null,
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
            const result = await personalDataSheetService.update(employeeId, pds);
            res.status(200).json(result);
        } catch (errors) {
            console.log(errors);
            res.status(400).json({
                errors
            });
        }
    },

    generate: async (req, res) => {
        // const employeeId = parseInt(req.user.id);
        try {
            const result = await personalDataSheetService.generate();
            res.writeHead(200, [["Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]]);
            res.end(result);
        } catch (errors) {
            console.log(errors);
            res.status(400).json(errors);
        }
    },
};