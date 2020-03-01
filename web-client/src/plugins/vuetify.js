import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#327726",
                secondary: "#f39c12",
                error: "#e74c3c",
                success: "#2ecc71"
            }
        }
    }
});
