const db = require("../../db");

module.exports = {
  create: async ({ code, title, description, units, categoryId }) => {
    const query = `insert into subject (subject_category_id, code, title, description, units)
                       values (?, ?, ?, ?, ?);`;
    const params = [
      parseInt(categoryId),
      code.toLowerCase(),
      title.toLowerCase(),
      description.toLowerCase(),
      units
    ];
    const result = await db.executeQuery(query, params);
    return result[0].insertId;
  },

  addPrerequisite: async (parentSubjectId, childSubjectId) => {
    const query = `insert into subject_prerequisite (parent_subject_id, child_subject_id)
                       values (?, ?);`;
    const params = [parentSubjectId, childSubjectId];
    await db.executeQuery(query, params);
  },

  update: async (subjectId, { title, description, units, categoryId }) => {
    const query = `update subject
                       set subject_category_id = ?,
                           title               = ?,
                           description         = ?,
                           units               = ?
                       where id = ?;`;
    const params = [
      categoryId,
      title.toLowerCase(),
      description.toLowerCase(),
      units,
      subjectId
    ];
    await db.executeQuery(query, params);
  },

  deleteAllPrerqeuisites: async parentSubjectId => {
    const query = `delete
                       from subject_prerequisite
                       where parent_subject_id = ?;`;
    const params = [parentSubjectId];
    await db.executeQuery(query, params);
  },

  getAll: async () => {
    const query = `select mainSubject.id,
                              mainSubject.code,
                              mainSubject.title,
                              mainSubject.description,
                              mainSubject.units,
                              (select json_object('id', id, 'name', name)
                               from subject_category
                               where id = mainSubject.subject_category_id)  as category,
                              (select json_object('id', s.id, 'code', s.code, 'title', s.title, 'description',
                                                  s.description, 'units', s.units)
                               from subject_prerequisite sp
                                        join subject s on sp.child_subject_id = s.id
                               where sp.parent_subject_id = mainSubject.id) as prerequisite
                       from subject mainSubject
                       where mainSubject.is_deleted = ?;`;
    const params = [false];
    const result = await db.executeQuery(query, params);
    return result[0] ? result[0] : [];
  },

  getSingle: async subjectId => {
    const query = `select mainSubject.id,
                              mainSubject.code,
                              mainSubject.title,
                              mainSubject.description,
                              mainSubject.units,
                              (select json_object('id', id, 'name', name)
                               from subject_category
                               where id = mainSubject.subject_category_id)  as category,
                              (select json_object('id', s.id, 'code', s.code, 'title', s.title, 'description',
                                                  s.description, 'units', s.units)
                               from subject_prerequisite sp
                                        join subject s on sp.child_subject_id = s.id
                               where sp.parent_subject_id = mainSubject.id) as prerequisite
                       from subject mainSubject
                       where mainSubject.id = ?
                         AND mainSubject.is_deleted = ?;`;
    const params = [subjectId, false];
    const result = await db.executeQuery(query, params);
    return result[0][0] ? result[0][0] : {};
  },

  search: async (option, value) => {
    const query = `select mainSubject.id,
                              mainSubject.code,
                              mainSubject.title,
                              mainSubject.description,
                              mainSubject.units,
                              (select json_object('id', id, 'name', name)
                               from subject_category
                               where id = mainSubject.subject_category_id)  as category,
                              (select json_object('code', s.code, 'title', s.title, 'description',
                                                  s.description, 'units', s.units)
                               from subject_prerequisite sp
                                        join subject s on sp.child_subject_id = s.id
                               where sp.parent_subject_id = mainSubject.id) as prerequisite
                       from subject mainSubject where mainSubject.${option} like '%${value}%' and mainSubject.is_deleted = ?;`;
    const params = [false];
    const result = await db.executeQuery(query, params);
    return result[0] ? result[0] : [];
  },

  delete: async subjectId => {
    const query = `update subject
                       set is_deleted = ?,
                           deleted_at = now()
                       where id = ?;`;
    const params = [true, subjectId];
    await db.executeQuery(query, params);
  },

  getCategories: async () => {
    const query = `select id, name
                       from subject_category
                       order by id;`;
    const result = await db.executeQuery(query);
    return result[0] ? result[0] : [];
  }
};
