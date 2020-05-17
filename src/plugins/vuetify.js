import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#2E86C1',
                success: '#58D68D'
            },
            dark: {
                primary: '#2C3E50'
            }
        }
    }
});