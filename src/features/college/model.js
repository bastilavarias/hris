const db = require("../../db");

module.exports = {
    create: async ({customId, name, description}) => {
        const query = `insert into college (custom_id, name, description)
                       values (?, ?, ?);`;
        const params = [
            customId.toLowerCase(),
            name.toLowerCase(),
            description.toLowerCase()
        ];
        await db.executeQuery(query, params);
    },

    update: async (collegeId, {name, description}) => {

        const query = `update college
                       set name        = ?,
                           description = ?
                       where id = ?;`;
        const params = [
            name.toLowerCase(),
            description.toLowerCase(),
            collegeId
        ];
        await db.executeQuery(query, params);
    },

    // deleteAllPrerqeuisites: async parentSubjectId => {
    //     const query = `delete
    //                    from subject_prerequisite
    //                    where parent_subject_id = ?;`;
    //     const params = [parentSubjectId];
    //     await db.executeQuery(query, params);
    // },

    getAll: async () => {
        const query = `select custom_id as customId, name, description
                       from college
                       where is_deleted = ?;`;
        const params = [
            false
        ];
        const results = await db.executeQuery(query, params);
        return results[0] ? results[0] : [];
    },

    // getSingle: async (subjectId) => {
    //     const query = `select custom_id as customId, name, description
    //                    from college
    //                    where mainSubject.id = ?
    //                      AND mainSubject.is_deleted = ?;`;
    //     const params = [
    //         subjectId,
    //         false
    //     ];
    //     const results = await db.executeQuery(query, params);
    //     return results[0][0] ? results[0][0] : {};
    // },

    search: async (option, value) => {
        const query = `select custom_id as customId, name, description
                       from college where ${option} like '%${value}%' and is_deleted = ?;`;
        const params = [false];
        const results = await db.executeQuery(query, params);
        return results[0] ? results[0] : [];
    },

    // delete: async subjectId => {
    //     const query = `update subject
    //                    set is_deleted = ?,
    //                        deleted_at = now()
    //                    where id = ?;`;
    //     const params = [
    //         true,
    //         subjectId
    //     ];
    //     await db.executeQuery(query, params);
    // }
};