const db = require("../../db");

module.exports = {
    create: async ({name, description}) => {
        const query = `insert into department (name, description)
                       values (?, ?);`;
        const params = [
            name.toLowerCase(),
            description.toLowerCase()
        ];
        const result = await db.executeQuery(query, params);
        return result[0].insertId;
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
        const query = `select d.id,
                              d.name,
                              d.description,
                              (select json_object('id', e.id,
                                                  'employeeNumber', e.employee_number,
                                                  'isDeleted', e.is_deleted,
                                                  'createdAt', e.created_at,
                                                  'profile',
                                                  (select json_object('firstName', first_name, 'middleName',
                                                                      middle_name, 'lastName', last_name)
                                                   from profile
                                                   where id = e.profile_id)
                                          )
                               from employee e
                               where id = dh.employee_id) as head
                       from department d
                                join department_head dh on d.id = dh.department_id
                       where d.is_deleted = ?;`;
        const params = [
            false
        ];
        const results = await db.executeQuery(query, params);
        return results[0] ? results[0] : [];
    },

    getSingle: async (departmentId) => {
        const query = `select d.id,
                              d.name,
                              d.description,
                              (select json_object('id', e.id,
                                                  'profile',
                                                  (select json_object('firstName', first_name, 'middleName',
                                                                      middle_name, 'lastName', last_name)
                                                   from profile
                                                   where id = e.profile_id),
                                                  'department', (select json_object('id', d.id, 'name', d.name)
                                                                 from department d
                                                                 where d.id = e.department_id),
                                                  'designation', (select json_object('id', d.id, 'name', d.name)
                                                                  from designation d
                                                                  where d.id = e.designation_id)
                                          )
                               from employee e
                               where id = dh.employee_id) as head
                       from department d
                                join department_head dh on d.id = dh.department_id
                       where d.id = ?
                         AND d.is_deleted = ?;`;
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
        const query = `select d.id,
                              d.name,
                              d.description,
                              (select json_object('id', e.id,
                                                  'profile',
                                                  (select json_object('firstName', first_name, 'middleName',
                                                                      middle_name, 'lastName', last_name)
                                                   from profile
                                                   where id = e.profile_id),
                                                  'department', (select json_object('id', d.id, 'name', d.name)
                                                                 from department d
                                                                 where d.id = e.department_id),
                                                  'designation', (select json_object('id', d.id, 'name', d.name)
                                                                  from designation d
                                                                  where d.id = e.designation_id)
                                          )
                               from employee e
                               where id = dh.employee_id) as head
                        from department d
                                join department_head dh on d.id = dh.department_id where d.${option} like '%${value}%' and d.is_deleted = ?;`;
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
    },

    createDepartmentHead: async (departmentId, employeeId) => {
        const query = `insert into department_head (employee_id, department_id)
                       values (?, ?);`;
        const params = [employeeId, departmentId];
        await db.executeQuery(query, params);
    },

    updateDepartmentHead: async (departmentId, employeeId) => {
        const query = `update department_head set employee_id = ? where department_id = ?;`;
        const params = [employeeId, departmentId];
        await db.executeQuery(query, params);
    }
};