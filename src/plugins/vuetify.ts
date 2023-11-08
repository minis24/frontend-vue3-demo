import 'vuetify/styles';
import '@/assets/scss/index.scss';

// Vuetify
import { createVuetify } from 'vuetify';
import { icons } from './vuetify/icons';

const vuetify = createVuetify({
	icons,
	ssr: false,
});

export default vuetify;
