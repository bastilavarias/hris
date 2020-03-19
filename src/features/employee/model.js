const db = require("../../db");

module.exports = {
    create: async ({employeeNumber, departmentId, designationId, isFullTime, profileId}) => {
        const query = `insert into employee (department_id, designation_id, profile_id, employee_number, is_full_time)
                       values (?, ?, ?, ?, ?);`;
        const params = [
            departmentId,
            designationId,
            profileId,
            employeeNumber,
            isFullTime
        ];
        await db.executeQuery(query, params);
    },

    getAll: async () => {
        const query = `select mainEmployee.id,
                              mainEmployee.employee_number               as employeeNumber,
                              (select json_object('id', d.id, 'name', d.name)
                               from department d
                               where d.id = mainEmployee.department_id)  as department,
                              (select json_object('id', d.id, 'name', d.name)
                               from designation d
                               where d.id = mainEmployee.designation_id) as designation,
                              (select json_object('id', p.id, 'firstName', p.first_name, 'middleName', p.middle_name,
                                                  'lastName', p.last_name, 'extension', p.extension)
                               from profile p
                               where p.id = mainEmployee.profile_id)     as profile,
                                mainEmployee.is_deleted as isDeleted
                       from employee mainEmployee
                       where is_deleted = ?;`;
        const params = [false];
        const results = await db.executeQuery(query, params);
        return results[0] ? results[0] : [];
    },

    search: async (option, value) => {
        const targetTable = option === "employee_number" ? `mainEmployee` : `mainProfile`;
        const query = `select mainEmployee.id,
                              mainEmployee.employee_number               as employeeNumber,
                              (select json_object('id', d.id, 'name', d.name)
                               from department d
                               where d.id = mainEmployee.department_id)  as department,
                              (select json_object('id', d.id, 'name', d.name)
                               from designation d
                               where d.id = mainEmployee.designation_id) as designation,
                              (select json_object('id', p.id, 'firstName', p.first_name, 'middleName', p.middle_name,
                                                  'lastName', p.last_name, 'extension', p.extension)
                               from profile p
                               where p.id = mainEmployee.profile_id)     as profile,
                                mainEmployee.is_deleted as isActivisDeletede
                       from employee mainEmployee join profile mainProfile on mainEmployee.profile_id = mainProfile.id where ${targetTable}.${option} like '%${value}%' and mainEmployee.is_deleted = ?;`;
        const params = [false];
        const results = await db.executeQuery(query, params);
        return results[0] ? results[0] : [];
    },
};