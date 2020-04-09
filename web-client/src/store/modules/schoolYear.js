import { schoolYearService, semesterService } from "../../services/api";
import { setActionName } from "../types/action";
import { setNotificationConfig } from "../types/notification";
import {
  createSchoolYear,
  deleteSchoolYear,
  getAllSchoolYears,
  getCurrentSchoolYear,
  getSingleSchoolYear,
  searchSchoolYears,
  setCurrentSchoolYear,
  setSchoolYearError,
  setSchoolYears,
  updateSchoolYear
} from "../types/schoolYear";
import { getSingleSemester, setCurrentSemester } from "../types/semester";

export default {
  state: {
    error: {},
    list: [],
    current: {}
  },

  mutations: {
    [setCurrentSchoolYear]: (state, schoolYear) => (state.current = schoolYear)
  },

  actions: {
    [updateSchoolYear]: async ({ commit }, { startYear, endYear }) => {
      try {
        const result = await schoolYearService.update({ startYear, endYear });
        const { message } = result.data;
        commit(setNotificationConfig, { message, type: "success" });
        commit(setActionName, updateSchoolYear);
      } catch (errors) {
        commit(setActionName, updateSchoolYear);
        throw new Error(`[RWV] ApiService ${errors}`);
      }
    },

    [getCurrentSchoolYear]: async ({ commit }) => {
      try {
        const result = await schoolYearService.getCurrent();
        const schoolYear = result.data;
        commit(setCurrentSchoolYear, schoolYear);
        commit(setActionName, getCurrentSchoolYear);
      } catch (errors) {
        commit(setActionName, "");
        throw new Error(`[RWV] ApiService ${errors}`);
      }
    }
  }
};
