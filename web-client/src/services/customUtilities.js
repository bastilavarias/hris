import moment from "moment";

export default {
    methods: {
        formatDate(date) {
            return date ? moment(date).format("MMMM, Do YYYY") : "";
        },

        convertMilitaryTime(givenTime) {
            return givenTime ? moment(givenTime, "HH:mm").format("hh:mm A") : "";
        },
    }
};