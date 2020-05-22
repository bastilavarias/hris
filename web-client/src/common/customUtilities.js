export default {
  methods: {
    hasError(error) {
      return !!error;
    },

    getTextFirstLetter(text) {
      return text ? text[0] : "";
    },

    isObject(obj) {
      return obj instanceof Object;
    },

    formatFullName({ firstName, middleName, lastName, extension }) {
      return `${firstName} ${
        middleName ? `${this.getTextFirstLetter(middleName)}.` : ""
      } ${lastName} ${extension ? `${extension.toUpperCase()}` : ""} `;
    },
  },
};
