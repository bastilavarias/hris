const db = require("../../db");

module.exports = {
  create: async ({
    code,
    name,
    description,
    yearLevel,
    collegeId,
    courseId
  }) => {
    const query = `insert into section (college_id, course_id, code, name, description, year_level)
                       values (?, ?, ?, ?, ?, ?);`;
    const params = [
      collegeId,
      courseId,
      code.toLowerCase(),
      name.toLowerCase(),
      description.toLowerCase(),
      yearLevel
    ];
    await db.executeQuery(query, params);
  },

  update: async (
    sectionId,
    { name, description, yearLevel, collegeId, courseId }
  ) => {
    const query = `update section
                       set name        = ?,
                           description = ?,
                           year_level  = ?,
                           college_id  = ?,
                           course_id   = ?
                       where id = ?;`;
    const params = [
      name.toLowerCase(),
      description.toLowerCase(),
      yearLevel,
      collegeId,
      courseId,
      sectionId
    ];
    await db.executeQuery(query, params);
  },

  getAll: async () => {
    const query = `select s.id,
                              s.code,
                              s.name,
                              s.description,
                              s.year_level              as yearLevel,
                              (select json_object('id', id, 'name', name)
                               from college
                               where id = s.college_id) as college,
                              (select json_object('id', id, 'name', name)
                               from course
                               where id = s.course_id)  as course
                       from section s
                       where s.is_deleted = ?;`;
    const params = [false];
    const result = await db.executeQuery(query, params);
    return result[0] ? result[0] : [];
  },

  getSingle: async sectionId => {
    const query = `select s.id,
                              s.code,
                              s.name,
                              s.description,
                              s.year_level              as yearLevel,
                              (select json_object('id', id, 'name', name)
                               from college
                               where id = s.college_id) as college,
                              (select json_object('id', id, 'name', name)
                               from course
                               where id = s.course_id)  as course
                       from section s
                       where s.id = ?
                         and s.is_deleted = ?;`;
    const params = [sectionId, false];
    const result = await db.executeQuery(query, params);
    return result[0][0] ? result[0][0] : {};
  },

  search: async (option, value) => {
    const query = `select s.id,
                              s.code,
                              s.name,
                              s.description,
                              s.year_level              as yearLevel,
                              (select json_object('id', id, 'name', name)
                               from college
                               where id = s.college_id) as college,
                              (select json_object('id', id, 'name', name)
                               from course
                               where id = s.course_id)  as course
                       from section s where s.${option} like '%${value}%' and s.is_deleted = ?;`;
    const params = [false];
    const result = await db.executeQuery(query, params);
    return result[0] ? result[0] : [];
  },

  delete: async sectionId => {
    const query = `update section
                       set is_deleted = ?,
                           deleted_at = now()
                       where id = ?;`;
    const params = [true, sectionId];
    await db.executeQuery(query, params);
  }
};
