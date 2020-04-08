const moment = require("moment");

module.exports = {
  toNumber: str => {
    return str ? parseInt(str) : null;
  },

  emptyValue: str => {
    return str ? str : "";
  },

  getCurrentYear: () => {
    const date = new Date();
    return date.getFullYear();
  },

  toPDSDefaultDate: date => {
    return date ? moment(date).format("MMMM Do YYYY") : "";
  },

  formatData: str => {
    return str.toLowerCase().trim();
  }
};
