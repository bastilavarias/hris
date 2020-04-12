const roomModel = require("./model");
const helper = require("../../helper");
const { formatData, toNumber } = require("../../customUtilities");

const semesterService = {
  create: async (buildingId, name) => {
    let error = {};
    let message = "";
    const isRoomNameExists = await helper.checkIfExists(
      "room",
      "name",
      formatData(name)
    );
    if (isRoomNameExists) {
      error.name = "Room name was already used.";
      return {
        message,
        error
      };
    }
    await roomModel.create(buildingId, formatData(name));
    message = `${name} was created.`;
    return {
      message,
      error
    };
  },

  update: async (roomId, buildingId, name) => {
    let message;
    let error = {};
    const gotRoom = await roomModel.getSingleByName(formatData(name));
    if (Object.keys(gotRoom).length > 1) {
      const isSameRoomId = toNumber(roomId) === toNumber(gotRoom.id);
      const isSameRoomName = formatData(name) === formatData(gotRoom.name);
      if (!isSameRoomId && isSameRoomName) {
        error.name = "Room name was already exists.";
        return {
          message: "",
          error
        };
      }
    }
    await roomModel.update(roomId, buildingId, name);
    message = "Room details is updated.";
    return {
      message,
      error
    };
  },

  getAll: async () => await roomModel.getAll(),

  getSingle: async roomId => await roomModel.getSingle(roomId),

  search: async (option, value) => {
    const options = {
      name: "name"
    };
    return await roomModel.search(options[option], formatData(value));
  },

  delete: async roomId => {
    await roomModel.delete(roomId);
    let message = "Room is deleted.";
    return {
      message
    };
  }
};

module.exports = semesterService;
