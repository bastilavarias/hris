const db = require("../../db");

module.exports = {
    create: async ({name, description, employeeId}) => {
        const query = `insert into department (name, description)
                       values (?, ?);`;
        const params = [
            name.toLowerCase(),
            description.toLowerCase()
        ];
        await db.executeQuery(query, params);
    },

    update: async (departmentId, {name, description}) => {

        const query = `update department
                       set name        = ?,
                           description = ?
                       where id = ?;`;
        const params = [
            name.toLowerCase(),
            description.toLowerCase(),
            departmentId
        ];
        await db.executeQuery(query, params);
    },

    getAll: async () => {
        const query = `select id, name, description
                       from department
                       where is_deleted = ?;`;
        const params = [
            false
        ];
        const results = await db.executeQuery(query, params);
        return results[0] ? results[0] : [];
    },

    getSingle: async (departmentId) => {
        const query = `select id, name, description
                       from department
                       where id = ?
                         and is_deleted = ?;`;
        const params = [
            departmentId,
            false
        ];
        const results = await db.executeQuery(query, params);
        return results[0][0] ? results[0][0] : {};
    },

    getSingleByName: async (name) => {
        const query = `select id, name, description
                       from department
                       where name = ?
                         and is_deleted = ?;`;
        const params = [
            name,
            false
        ];
        const results = await db.executeQuery(query, params);
        return results[0][0] ? results[0][0] : {};
    },

    search: async (option, value) => {
        const query = `select id, name, description
                       from department where ${option} like '%${value}%' and is_deleted = ?;`;
        const params = [false];
        const results = await db.executeQuery(query, params);
        return results[0] ? results[0] : [];
    },

    delete: async departmentId => {
        const query = `update department
                       set is_deleted = ?,
                           deleted_at = now()
                       where id = ?;`;
        const params = [
            true,
            departmentId
        ];
        await db.executeQuery(query, params);
    }
};