const subjectModel = require("./model");

module.exports = {
    create: async ({code, title, description, units, categoryId, prerequisiteSubjectId}) => {
        let errors = [];
        let message = "";
        const isExists = await subjectModel.checkIfExists("code", code);
        if (isExists) {
            errors.push("Subject was already exists.");
            return {
                message,
                errors
            };
        }
        const createdSubjectId = await subjectModel.create({code, title, description, units, categoryId});
        if (prerequisiteSubjectId) {
            await subjectModel.addPrerequisite(createdSubjectId, prerequisiteSubjectId);
        }
        message = "New subject is created.";
        return {
            errors,
            message
        };
    },

    update: async (subjectId, {title, code, description, units, categoryId, prerequisiteSubjectId}) => {
        let message = "";
        let errors = [];
        const isSubjectExists = await subjectModel.checkIfExists("code", code);
        if (!isSubjectExists) {
            errors.push(`Subject with code of ${code} is not existing in database.`);
            return {
                errors,
                message
            };
        }
        await subjectModel.update(subjectId, {title, description, units, categoryId});
        await subjectModel.deleteAllPrerqeuisites(subjectId);
        if (prerequisiteSubjectId) {
            await subjectModel.addPrerequisite(subjectId, prerequisiteSubjectId);
        }
        message = "Subject is updated.";
        return {
            message,
            errors
        };
    },

    getAll: async () => {
        return await subjectModel.getAll();
    },

    search: async (by, value) => {
        const option = {
            code: "code",
            title: "title"
        };
        return await subjectModel.search(option[by], value);
    },

    delete: async (subjectId) => {
        let message = "";
        let errors = [];
        const isExists = await subjectModel.checkIfExists("id", subjectId);
        if (!isExists) {
            errors.push("Subject is not exists.");
            return {
                message,
                errors
            };
        }
        await subjectModel.delete(subjectId);
        message = "Subject is deleted.";
        return {
            message,
            errors
        };
    }
};