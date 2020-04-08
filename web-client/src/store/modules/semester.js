import { semesterService } from "../../services/api";
import { setActionName } from "../types/action";
import { setNotificationConfig } from "../types/notification";
import {
  createSemester,
  deleteSemester,
  getAllSemesters,
  getSingleSemester,
  searchSemesters,
  setSemesterError,
  setSemesters,
  setCurrentSemester,
  updateSemester
} from "../types/semester";

export default {
  state: {
    error: {},
    list: [],
    current: {}
  },

  mutations: {
    [setSemesterError]: (state, error) => (state.error = error),
    [setSemesters]: (state, semesters) => (state.list = semesters),
    [setCurrentSemester]: (state, semester) => (state.current = semester)
  },

  actions: {
    [createSemester]: async ({ commit }, { name, isCurrent }) => {
      try {
        const result = await semesterService.create({
          name,
          isCurrent
        });
        const { error, message } = result.data;
        if (Object.keys(error).length > 0) {
          commit(setActionName, `${createSemester}-error`);
          commit(setSemesterError, error);
          return;
        }
        commit(setNotificationConfig, { message, type: "success" });
        commit(setActionName, createSemester);
      } catch (errors) {
        commit(setActionName, createSemester);
        throw new Error(`[RWV] ApiService ${errors}`);
      }
    },

    [getAllSemesters]: async ({ commit }) => {
      try {
        const result = await semesterService.getAll();
        const semesters = result.data;
        commit(setSemesters, semesters);
        commit(setActionName, getAllSemesters);
      } catch (errors) {
        commit(setActionName, "");
        throw new Error(`[RWV] ApiService ${errors}`);
      }
    },

    [getSingleSemester]: async ({ commit }, semesterId) => {
      try {
        const result = await semesterService.getSingle(semesterId);
        const semester = result.data;
        commit(setCurrentSemester, semester);
        commit(setActionName, getSingleSemester);
      } catch (errors) {
        commit(setActionName, "");
        throw new Error(`[RWV] ApiService ${errors}`);
      }
    },

    [searchSemesters]: async ({ commit }, { option, value }) => {
      try {
        const result = await semesterService.search({ option, value });
        const semesters = result.data;
        commit(setSemesters, semesters);
        commit(setActionName, searchSemesters);
      } catch (errors) {
        commit(setActionName, "");
        throw new Error(`[RWV] ApiService ${errors}`);
      }
    },

    [updateSemester]: async ({ commit }, { semesterId, details }) => {
      try {
        const result = await semesterService.update(semesterId, details);
        const { message } = result.data;
        commit(setNotificationConfig, { message, type: "success" });
        commit(setActionName, updateSemester);
      } catch (errors) {
        commit(setActionName, updateSemester);
        throw new Error(`[RWV] ApiService ${errors}`);
      }
    },

    [deleteSemester]: async ({ commit }, semesterId) => {
      try {
        const result = await semesterService.delete(semesterId);
        const { message } = result.data;
        commit(setActionName, deleteSemester);
        commit(setNotificationConfig, { message, type: "error" });
      } catch (errors) {
        commit(setActionName, deleteSemester);
        throw new Error(`[RWV] ApiService ${errors}`);
      }
    }
  }
};
