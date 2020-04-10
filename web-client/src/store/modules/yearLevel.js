import { yearLevelService } from "../../services/api";
import { setActionName } from "../types/action";
import { setNotificationConfig } from "../types/notification";
import {
  createYearLevel,
  deleteYearLevel,
  getAllYearLevels,
  getSingleYearLevel,
  searchYearLevels,
  setYearLevelError,
  setYearLevels,
  setCurrentYearLevel,
  updateYearLevel
} from "../types/yearLevel";

export default {
  state: {
    error: {},
    list: [],
    current: {}
  },

  mutations: {
    [setYearLevelError]: (state, error) => (state.error = error),
    [setYearLevels]: (state, yearLevels) => (state.list = yearLevels),
    [setCurrentYearLevel]: (state, yearLevel) => (state.current = yearLevel)
  },

  actions: {
    [createYearLevel]: async ({ commit }, { name, isCurrent }) => {
      try {
        const result = await yearLevelService.create({
          name,
          isCurrent
        });
        const { error, message } = result.data;
        if (Object.keys(error).length > 0) {
          commit(setActionName, `${createYearLevel}-error`);
          commit(setYearLevelError, error);
          return;
        }
        commit(setNotificationConfig, { message, type: "success" });
        commit(setActionName, createYearLevel);
      } catch (errors) {
        commit(setActionName, createYearLevel);
        throw new Error(`[RWV] ApiService ${errors}`);
      }
    },

    [getAllYearLevels]: async ({ commit }) => {
      try {
        const result = await yearLevelService.getAll();
        const yearLevels = result.data;
        commit(setYearLevels, yearLevels);
        commit(setActionName, getAllYearLevels);
      } catch (errors) {
        commit(setActionName, "");
        throw new Error(`[RWV] ApiService ${errors}`);
      }
    },

    [getSingleYearLevel]: async ({ commit }, yearLevelId) => {
      try {
        const result = await yearLevelService.getSingle(yearLevelId);
        const yearLevel = result.data;
        commit(setCurrentYearLevel, yearLevel);
        commit(setActionName, getSingleYearLevel);
      } catch (errors) {
        commit(setActionName, "");
        throw new Error(`[RWV] ApiService ${errors}`);
      }
    },

    [searchYearLevels]: async ({ commit }, { option, value }) => {
      try {
        const result = await yearLevelService.search({ option, value });
        const yearLevels = result.data;
        commit(setYearLevels, yearLevels);
        commit(setActionName, searchYearLevels);
      } catch (errors) {
        commit(setActionName, "");
        throw new Error(`[RWV] ApiService ${errors}`);
      }
    },

    [updateYearLevel]: async ({ commit }, { yearLevelId, details }) => {
      try {
        const result = await yearLevelService.update(yearLevelId, details);
        const { message } = result.data;
        commit(setNotificationConfig, { message, type: "success" });
        commit(setActionName, updateYearLevel);
      } catch (errors) {
        commit(setActionName, updateYearLevel);
        throw new Error(`[RWV] ApiService ${errors}`);
      }
    },

    [deleteYearLevel]: async ({ commit }, yearLevelId) => {
      try {
        const result = await yearLevelService.delete(yearLevelId);
        const { message } = result.data;
        commit(setActionName, deleteYearLevel);
        commit(setNotificationConfig, { message, type: "error" });
      } catch (errors) {
        commit(setActionName, deleteYearLevel);
        throw new Error(`[RWV] ApiService ${errors}`);
      }
    }
  }
};
