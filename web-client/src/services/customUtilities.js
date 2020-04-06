import moment from "moment";

export default {
    methods: {
        formatDate(date) {
            return date ? moment(date).format("MMMM D, YYYY") : "";
        },

        convertMilitaryTime(givenTime) {
            return givenTime ? moment(givenTime, "HH:mm").format("hh:mm A") : "";
        },

        hasError(error) {
            return !!error;
        },

        getTextFirstLetter(text) {
            return text ? text[0] : "";
        }
    }
};