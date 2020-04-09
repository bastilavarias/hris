const db = require("../../db");

module.exports = {
  getCurrent: async () => {
    const query = `select start_year as startYear, end_year as endYear from school_year where id = ?;`;
    const currentSchoolYearId = 1;
    const params = [currentSchoolYearId];
    const result = await db.executeQuery(query, params);
    return result[0][0] ? result[0][0] : {};
  },

  update: async ({ startYear, endYear }) => {
    const query = `update school_year set start_year = ?, end_year = ? where id = ?;`;
    const currentSchoolYearId = 1;
    const params = [startYear, endYear, currentSchoolYearId];
    await db.executeQuery(query, params);
  }
};
