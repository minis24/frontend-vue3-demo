import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';
import { customSVGs } from '@/plugins/vuetify/customSVGs';

export const icons = {
	defaultSet: 'mdi',
	aliases: { 
		...aliases,
	},
	sets: {
		custom: customSVGs,
		mdi,
	},
};
