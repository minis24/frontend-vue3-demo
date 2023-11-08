import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';

const isTest = process.env.VITEST;
export async function createServer(
	root = process.cwd(),
	isProd = process.env.NODE_ENV === 'production',
	hmrPort
) {
	const __dirname = path.dirname(fileURLToPath(import.meta.url));
	const resolve = (p) => path.resolve(__dirname, p);

	// 'production'모드일때는 배포된 client index.html파일을 최초로 읽는다.
	const indexProd = isProd ?
		fs.readFileSync(resolve('dist/client/index.html'), 'utf-8') : '';

	// 'production'모드일때는 배포된 manifest.json파일을 가져온다.
	const manifest = isProd ?
		fs.readFileSync(resolve('dist/client/ssr-manifest.json', 'utf-8')) : {};

	const ssrApp = express();

	// 개발 시 사용할 ViteDevServer를 미들웨어로 적용한다.
	// appType을 'custom'으로 해서 vite자체 html제공 로직을 비활성화 하고, express와 같이 상위 서버에서 제어.
	let vite;
	if (!isProd) {
		vite = await ( await import('vite') ).createServer({
			base: '/',
			root,
			logLevel: isTest ? 'error' : 'info',
			server: {
				middlewareMode: true,
				watch: {
					usePolling: true,
					interval: 100,
				},
				hmr: {
					port: hmrPort,
				},
			},
			appType: 'custom',
		});

		// vite를 미들웨어로 사용한다.
		ssrApp.use(vite.middlewares);
	
	// 'production'모드일때 
	} else {
		ssrApp.use((await import('compression')).default());
		ssrApp.use(
			'/',
			(await import('serve-static')).default(resolve('dist/client'), {
				index: false,
			})
		);
	}

	// 랜더링된 html제공 '*' 핸들러 구현
	ssrApp.use('*', async (req, res) => {
		
		try {
			const url = req.originalUrl;

			let template, render;
			if (!isProd) {
				template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
				template = await vite.transformIndexHtml(url, template);
				render = (await vite.ssrLoadModule('/src/entry-server.js')).render;
			} else {
				template = indexProd;
				render = (await import('./dist/server/entry-server.js')).render;
			}

			const [ appHtml, preloadLinks, ] = await render(url, manifest);
			const html = template
				.replace(`<!-- app-preload-links -->`, preloadLinks)
				.replace(`<!-- app-content-resource -->`, appHtml);

			res.status(200).set({ 'Content-Type': 'text/html', }).end(html);
		} catch(e) {
			vite && vite.ssrFixStacktrace(e);
			console.log(e.stack);
			res.status(500).end(e.stack);
		}
	});

	return { ssrApp, vite, };
}

if (!isTest) {
	createServer().then(({ ssrApp, }) => {
		return ssrApp.listen(6173, () => {
			console.log('waiting local server port:6173 !!');
		});
	});
}

