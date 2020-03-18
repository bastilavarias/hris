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
                photo: req.file.filename ? req.file.filename : "",
                birthDate: parsedProfile.birthDate,
                birthPlace: parsedProfile.birthPlace,
                sex: parsedProfile.sex,
                civilStatus: parsedProfile.civilStatus,
                citizenship: parsedProfile.citizenship,
                bloodType: parsedProfile.bloodType,
                height: parsedProfile.height,
                weight: parsedProfile.weight
            }
        };

        try {
            const result = await employeeService.create(employeeData);
            res.status(200).json(result);
        } catch (errors) {
            console.log(errors);
            res.status(400).json(errors);
        }
    }
};