import { sectionService } from "../../services/api";
import { setActionName } from "../types/action";
import { setNotificationConfig } from "../types/notification";
import {
  createSection,
  deleteSection,
  getAllSections,
  getSingleSection,
  searchSections,
  setCurrentSection,
  setSectionError,
  setSections,
  updateSection
} from "../types/section";

export default {
  state: {
    error: {},
    list: [],
    current: {}
  },

  mutations: {
    [setSectionError]: (state, error) => (state.error = error),
    [setSections]: (state, sections) => (state.list = sections),
    [setCurrentSection]: (state, section) => (state.current = section)
  },

  actions: {
    [createSection]: async (
      { commit },
      { code, name, description, yearLevelId, collegeId, courseId }
    ) => {
      try {
        const result = await sectionService.create({
          code,
          name,
          description,
          yearLevelId,
          collegeId,
          courseId
        });
        const { error, message } = result.data;
        if (Object.keys(error).length > 0) {
          commit(setActionName, `${createSection}-error`);
          commit(setSectionError, error);
          return;
        }
        commit(setNotificationConfig, { message, type: "success" });
        commit(setActionName, createSection);
      } catch (errors) {
        commit(setActionName, createSection);
        throw new Error(`[RWV] ApiService ${errors}`);
      }
    },

    [getAllSections]: async ({ commit }) => {
      try {
        const result = await sectionService.getAll();
        const sections = result.data;
        commit(setSections, sections);
        commit(setActionName, getAllSections);
      } catch (errors) {
        commit(setActionName, "");
        throw new Error(`[RWV] ApiService ${errors}`);
      }
    },

    [getSingleSection]: async ({ commit }, sectionId) => {
      try {
        const result = await sectionService.getSingle(sectionId);
        const section = result.data;
        commit(setCurrentSection, section);
        commit(setActionName, getSingleSection);
      } catch (errors) {
        commit(setActionName, "");
        throw new Error(`[RWV] ApiService ${errors}`);
      }
    },

    [searchSections]: async ({ commit }, { option, value }) => {
      try {
        const result = await sectionService.search({ option, value });
        const sections = result.data;
        commit(setSections, sections);
        commit(setActionName, searchSections);
      } catch (errors) {
        commit(setActionName, "");
        throw new Error(`[RWV] ApiService ${errors}`);
      }
    },

    [updateSection]: async ({ commit }, { sectionId, details }) => {
      try {
        const result = await sectionService.update(sectionId, details);
        const { message } = result.data;
        commit(setNotificationConfig, { message, type: "success" });
        commit(setActionName, updateSection);
      } catch (errors) {
        commit(setActionName, updateSection);
        throw new Error(`[RWV] ApiService ${errors}`);
      }
    },

    [deleteSection]: async ({ commit }, sectionId) => {
      try {
        const result = await sectionService.delete(sectionId);
        const { message } = result.data;
        commit(setActionName, deleteSection);
        commit(setNotificationConfig, { message, type: "error" });
      } catch (errors) {
        commit(setActionName, deleteSection);
        throw new Error(`[RWV] ApiService ${errors}`);
      }
    }
  }
};
