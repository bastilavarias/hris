const db = require("../../db");

module.exports = {
  create: async ({ name, description }) => {
    const query = `insert into department (name, description)
                       values (?, ?);`;
    const params = [name.toLowerCase(), description.toLowerCase()];
    const result = await db.executeQuery(query, params);
    return result[0].insertId;
  },

  update: async (departmentId, { name, description }) => {
    const query = `update department
                       set name        = ?,
                           description = ?
                       where id = ?;`;
    const params = [
      name.toLowerCase(),
      description.toLowerCase(),
      departmentId,
    ];
    await db.executeQuery(query, params);
  },

  getAll: async () => {
    const query = `select d.id,
                              d.name,
                              d.description
                       from department d
                                join department_head dh on d.id = dh.department_id
                       where d.is_deleted = ?;`;
    const params = [false];
    const result = await db.executeQuery(query, params);
    return result[0] ? result[0] : [];
  },

  getSingle: async (departmentId) => {
    const query = `select d.id,
                              d.name,
                              d.description
                       from department d
                                join department_head dh on d.id = dh.department_id
                       where d.id = ?
                         AND d.is_deleted = ?;`;
    const params = [departmentId, false];
    const result = await db.executeQuery(query, params);
    return result[0][0] ? result[0][0] : {};
  },

  getSingleByName: async (name) => {
    const query = `select id, name, description
                       from department
                       where name = ?
                         and is_deleted = ?;`;
    const params = [name, false];
    const result = await db.executeQuery(query, params);
    return result[0][0] ? result[0][0] : {};
  },

  search: async (option, value) => {
    const query = `select d.id,
                              d.name,
                              d.description
                        from department d
                                join department_head dh on d.id = dh.department_id where d.${option} like '%${value}%' and d.is_deleted = ?;`;
    const params = [false];
    const result = await db.executeQuery(query, params);
    return result[0] ? result[0] : [];
  },

  delete: async (departmentId) => {
    const query = `update department
                       set is_deleted = ?,
                           deleted_at = now()
                       where id = ?;`;
    const params = [true, departmentId];
    await db.executeQuery(query, params);
  },

  createDepartmentHead: async (departmentId, employeeId) => {
    const query = `insert into department_head (employee_id, department_id)
                       values (?, ?);`;
    const params = [employeeId, departmentId];
    await db.executeQuery(query, params);
  },

  updateDepartmentHead: async (departmentId, employeeId) => {
    const query = `update department_head
                       set employee_id = ?
                       where department_id = ?;`;
    const params = [employeeId, departmentId];
    await db.executeQuery(query, params);
  },
};
