import moment from "moment";

export default {
    methods: {
        formatDate(date) {
            return date ? moment(date).format("MMMM, Do YYYY") : "";
        }
    }
};