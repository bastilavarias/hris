const db = require("../../db");

module.exports = {
  create: async ({ code, name, description, collegeId }) => {
    const query = `insert into course (college_id, code, name, description)
                       values (?, ?, ?, ?);`;
    const params = [
      collegeId,
      code.toLowerCase(),
      name.toLowerCase(),
      description.toLowerCase()
    ];
    await db.executeQuery(query, params);
  },

  update: async (courseId, { name, description, collegeId }) => {
    const query = `update course
                       set college_id  = ?,
                           name        = ?,
                           description = ?
                       where id = ?;`;
    const params = [
      collegeId,
      name.toLowerCase(),
      description.toLowerCase(),
      courseId
    ];
    await db.executeQuery(query, params);
  },

  getAll: async () => {
    const query = `select mainCourse.id,
                              mainCourse.code,
                              mainCourse.name,
                              mainCourse.description,
                              (select json_object('id', c.id, 'customId', c.custom_id, 'name', c.name, 'description',
                                                  c.description)
                               from college c
                               where c.id = mainCourse.college_id) as college
                       from course mainCourse
                       where mainCourse.is_deleted = ?;`;
    const params = [false];
    const result = await db.executeQuery(query, params);
    return result[0] ? result[0] : [];
  },

  getSingle: async courseId => {
    const query = `select mainCourse.id,
                              mainCourse.code,
                              mainCourse.name,
                              mainCourse.description,
                              (select json_object('id', c.id, 'customId', c.custom_id, 'name', c.name, 'description',
                                                  c.description)
                               from college c
                               where c.id = mainCourse.college_id) as college
                       from course mainCourse
                       where mainCourse.id = ?
                         AND mainCourse.is_deleted = ?;`;
    const params = [courseId, false];
    const result = await db.executeQuery(query, params);
    return result[0][0] ? result[0][0] : {};
  },

  search: async (option, value) => {
    const query = `select mainCourse.id, 
       mainCourse.code,
                              mainCourse.name,
                              mainCourse.description,
                              (select json_object('id', c.id, 'customId', c.custom_id, 'name', c.name, 'description',
                                                  c.description)
                               from college c
                               where c.id = mainCourse.college_id) as college
                       from course mainCourse where mainCourse.${option} like '%${value}%' and mainCourse.is_deleted = ?;`;
    const params = [false];
    const result = await db.executeQuery(query, params);
    return result[0] ? result[0] : [];
  },

  delete: async courseId => {
    const query = `update course
                       set is_deleted = ?,
                           deleted_at = now()
                       where id = ?;`;
    const params = [true, courseId];
    await db.executeQuery(query, params);
  }
};
