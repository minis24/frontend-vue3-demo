import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/demo1',
	plugins: [
		vue(),
		vuetify({
			styles: {
				configFile: 'src/assets/scss/vuetify/_variables.scss', 
			},
		}),
		basicSsl(),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	//ssr: {
	//	noExternal: [ 'vuetify', ],
	//},
	//server: {
	//	proxy: {
	//		'/api/v1': 'https://hn.algolia.com',
	//		'/api/pilot': {
	//			target: 'http://3.39.88.103:8088',
	//			changeOrigin: true,
	//		},
	//		'/loginAction': {
	//			target: 'http://3.39.88.103:8088',
	//			changeOrigin: true,
	//		},
	//	},
	//},
	server: {
		proxy: {
			'/api/v1': 'https://hn.algolia.com',
			'/api/pilot': {
				target: 'http://3.39.88.103:8088',
				changeOrigin: true,
				//rewrite: (path) => path.replace(/^\/api\/pilot/, ''),
			},
			'/api/login': {
				target: 'http://3.39.88.103:8088',
				changeOrigin: true,
				//rewrite: (path) => path.replace(/^\/api\/login/, ''),
			},
		},
		https: true,
	},
});
