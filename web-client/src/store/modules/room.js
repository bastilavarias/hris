import { roomService } from "../../services/api";
import { setActionName } from "../types/action";
import { setNotificationConfig } from "../types/notification";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getSingleRoom,
  searchRooms,
  setRoomError,
  setRooms,
  setCurrentRoom,
  updateRoom
} from "../types/room";

export default {
  state: {
    error: {},
    list: [],
    current: {}
  },

  mutations: {
    [setRoomError]: (state, error) => (state.error = error),
    [setRooms]: (state, rooms) => (state.list = rooms),
    [setCurrentRoom]: (state, room) => (state.current = room)
  },

  actions: {
    [createRoom]: async ({ commit }, { name, buildingId }) => {
      try {
        const result = await roomService.create({ name, buildingId });
        const { error, message } = result.data;
        if (Object.keys(error).length > 0) {
          commit(setActionName, `${createRoom}-error`);
          commit(setRoomError, error);
          return;
        }
        commit(setNotificationConfig, { message, type: "success" });
        commit(setActionName, createRoom);
      } catch (errors) {
        commit(setActionName, createRoom);
        throw new Error(`[RWV] ApiService ${errors}`);
      }
    },

    [getAllRooms]: async ({ commit }) => {
      try {
        const result = await roomService.getAll();
        const rooms = result.data;
        commit(setRooms, rooms);
        commit(setActionName, getAllRooms);
      } catch (errors) {
        commit(setActionName, "");
        throw new Error(`[RWV] ApiService ${errors}`);
      }
    },

    [getSingleRoom]: async ({ commit }, roomId) => {
      try {
        const result = await roomService.getSingle(roomId);
        const room = result.data;
        commit(setCurrentRoom, room);
        commit(setActionName, getSingleRoom);
      } catch (errors) {
        commit(setActionName, "");
        throw new Error(`[RWV] ApiService ${errors}`);
      }
    },

    [searchRooms]: async ({ commit }, { option, value }) => {
      try {
        const result = await roomService.search({ option, value });
        const rooms = result.data;
        commit(setRooms, rooms);
        commit(setActionName, searchRooms);
      } catch (errors) {
        commit(setActionName, "");
        throw new Error(`[RWV] ApiService ${errors}`);
      }
    },

    [updateRoom]: async ({ commit }, { roomId, details }) => {
      try {
        const result = await roomService.update(roomId, details);
        const { message, error } = result.data;
        if (Object.keys(error).length > 0) {
          commit(setActionName, `${updateRoom}-error`);
          commit(setRoomError, error);
          return;
        }
        commit(setNotificationConfig, { message, type: "success" });
        commit(setActionName, updateRoom);
      } catch (errors) {
        commit(setActionName, updateRoom);
        throw new Error(`[RWV] ApiService ${errors}`);
      }
    },

    [deleteRoom]: async ({ commit }, roomId) => {
      try {
        const result = await roomService.delete(roomId);
        const { message } = result.data;
        commit(setActionName, deleteRoom);
        commit(setNotificationConfig, { message, type: "error" });
      } catch (errors) {
        commit(setActionName, deleteRoom);
        throw new Error(`[RWV] ApiService ${errors}`);
      }
    }
  }
};
