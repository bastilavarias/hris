import { buildingService } from "../../services/api";
import { setActionName } from "../types/action";
import { setNotificationConfig } from "../types/notification";
import {
  createBuilding,
  deleteBuilding,
  getAllBuildings,
  getSingleBuilding,
  searchBuildings,
  setBuildingError,
  setBuildings,
  setCurrentBuilding,
  updateBuilding
} from "../types/building";

export default {
  state: {
    error: {},
    list: [],
    current: {}
  },

  mutations: {
    [setBuildingError]: (state, error) => (state.error = error),
    [setBuildings]: (state, buildings) => (state.list = buildings),
    [setCurrentBuilding]: (state, building) => (state.current = building)
  },

  actions: {
    [createBuilding]: async ({ commit }, { name }) => {
      try {
        const result = await buildingService.create({
          name
        });
        const { error, message } = result.data;
        if (Object.keys(error).length > 0) {
          commit(setActionName, `${createBuilding}-error`);
          commit(setBuildingError, error);
          return;
        }
        commit(setNotificationConfig, { message, type: "success" });
        commit(setActionName, createBuilding);
      } catch (errors) {
        commit(setActionName, createBuilding);
        throw new Error(`[RWV] ApiService ${errors}`);
      }
    },

    [getAllBuildings]: async ({ commit }) => {
      try {
        const result = await buildingService.getAll();
        const buildings = result.data;
        commit(setBuildings, buildings);
        commit(setActionName, getAllBuildings);
      } catch (errors) {
        commit(setActionName, "");
        throw new Error(`[RWV] ApiService ${errors}`);
      }
    },

    [getSingleBuilding]: async ({ commit }, buildingId) => {
      try {
        const result = await buildingService.getSingle(buildingId);
        const building = result.data;
        commit(setCurrentBuilding, building);
        commit(setActionName, getSingleBuilding);
      } catch (errors) {
        commit(setActionName, "");
        throw new Error(`[RWV] ApiService ${errors}`);
      }
    },

    [searchBuildings]: async ({ commit }, { option, value }) => {
      try {
        const result = await buildingService.search({ option, value });
        const buildings = result.data;
        commit(setBuildings, buildings);
        commit(setActionName, searchBuildings);
      } catch (errors) {
        commit(setActionName, "");
        throw new Error(`[RWV] ApiService ${errors}`);
      }
    },

    [updateBuilding]: async ({ commit }, { buildingId, details }) => {
      try {
        const result = await buildingService.update(buildingId, details);
        const { message, error } = result.data;
        if (Object.keys(error).length > 0) {
          commit(setActionName, `${updateBuilding}-error`);
          commit(setBuildingError, error);
          return;
        }
        commit(setNotificationConfig, { message, type: "success" });
        commit(setActionName, updateBuilding);
      } catch (errors) {
        commit(setActionName, updateBuilding);
        throw new Error(`[RWV] ApiService ${errors}`);
      }
    },

    [deleteBuilding]: async ({ commit }, buildingId) => {
      try {
        const result = await buildingService.delete(buildingId);
        const { message } = result.data;
        commit(setActionName, deleteBuilding);
        commit(setNotificationConfig, { message, type: "error" });
      } catch (errors) {
        commit(setActionName, deleteBuilding);
        throw new Error(`[RWV] ApiService ${errors}`);
      }
    }
  }
};
