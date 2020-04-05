const departmentModel = require("./model");
const helper = require("../../helper");

module.exports = {
    create: async ({name, description, employeeId}) => {
        let error = {};
        let message = "";
        const isDepartmentExists = await helper.checkIfExists("department", "name", name.toLowerCase());
        if (isDepartmentExists) {
            error.name = "Department name was already used.";
            return {
                message,
                error
            };
        }
        const createdDepartmentId = await departmentModel.create({name, description});
        await departmentModel.createDepartmentHead(createdDepartmentId, employeeId);
        message = "New department is created.";
        return {
            error,
            message
        };
    },

    update: async (departmentId, {name, description, employeeId}) => {
        let message = "";
        let error = {};
        const foundDepartment = await departmentModel.getSingleByName(name.toLowerCase());
        if (Object.keys(foundDepartment).length > 0 && departmentId !== parseInt(foundDepartment.id)) {
            error.name = "Department name was already used.";
            return {
                message,
                error
            };
        }
        const isDepartmentExists = await helper.checkIfExists("department", "id", departmentId);
        if (!isDepartmentExists) {
            error.name = "Department is not exists.";
            return {
                message,
                error
            };
        }
        await departmentModel.update(departmentId, {name, description, employeeId});
        message = "Department is updated.";
        return {
            message,
            error
        };
    },

    getAll: async () => {
        return await departmentModel.getAll();
    },

    getSingle: async (departmentId) => {
        return await departmentModel.getSingle(departmentId);
    },

    search: async (option, value) => {
        const options = {
            name: "name"
        };
        return await departmentModel.search(options[option], value.trim().toLowerCase());
    },

    delete: async (departmentId) => {
        let message = "";
        let errors = [];
        const isDepartmentExists = await helper.checkIfExists("department", "id", departmentId);
        if (!isDepartmentExists) {
            errors.push("Department is not exists.");
            return {
                message,
                errors
            };
        }
        await departmentModel.delete(departmentId);
        message = "Department is deleted.";
        return {
            message,
            errors
        };
    }
};