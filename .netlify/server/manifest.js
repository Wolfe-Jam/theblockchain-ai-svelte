export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","convergent-economy-academic.pdf","convergent-economy-report.pdf","favicon-old.svg","favicon.svg","forms.html","manifest.json","robots.txt","sitemap.xml","theBlockchain-ai-full-logo.svg","theBlockchain-ai-landscape.png","theBlockchain-ai-landscape.webp","theBlockchain-ai-logo.png","theBlockchain-ai-logo.svg","three-pillars-graphic.svg","vite.svg","zero-fraud-icon.svg"]),
	mimeTypes: {".pdf":"application/pdf",".svg":"image/svg+xml",".html":"text/html",".json":"application/json",".txt":"text/plain",".xml":"text/xml",".png":"image/png",".webp":"image/webp"},
	_: {
		client: {start:"_app/immutable/entry/start.CUuufqKt.js",app:"_app/immutable/entry/app.BsAi67Sm.js",imports:["_app/immutable/entry/start.CUuufqKt.js","_app/immutable/chunks/DKl5Jh6K.js","_app/immutable/chunks/wGEaMokz.js","_app/immutable/chunks/Dd42kC7b.js","_app/immutable/entry/app.BsAi67Sm.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/wGEaMokz.js","_app/immutable/chunks/IHki7fMi.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js')),
			__memo(() => import('./nodes/13.js')),
			__memo(() => import('./nodes/14.js')),
			__memo(() => import('./nodes/15.js')),
			__memo(() => import('./nodes/16.js')),
			__memo(() => import('./nodes/17.js')),
			__memo(() => import('./nodes/18.js')),
			__memo(() => import('./nodes/19.js')),
			__memo(() => import('./nodes/20.js')),
			__memo(() => import('./nodes/21.js')),
			__memo(() => import('./nodes/22.js')),
			__memo(() => import('./nodes/23.js')),
			__memo(() => import('./nodes/25.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/api/admin/security-dashboard",
				pattern: /^\/api\/admin\/security-dashboard\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/admin/security-dashboard/_server.ts.js'))
			},
			{
				id: "/api/market-data",
				pattern: /^\/api\/market-data\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/market-data/_server.js'))
			},
			{
				id: "/api/search",
				pattern: /^\/api\/search\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/search/_server.ts.js'))
			},
			{
				id: "/briefings",
				pattern: /^\/briefings\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/deep-dive/the-convergent-economy",
				pattern: /^\/deep-dive\/the-convergent-economy\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/demo",
				pattern: /^\/demo\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/demo/[slug]",
				pattern: /^\/demo\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/download",
				pattern: /^\/download\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/faqs",
				pattern: /^\/faqs\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/founders-proof",
				pattern: /^\/founders-proof\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/glossary",
				pattern: /^\/glossary\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/help",
				pattern: /^\/help\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/interactive-guides",
				pattern: /^\/interactive-guides\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/interactive/market-analysis",
				pattern: /^\/interactive\/market-analysis\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/invest",
				pattern: /^\/invest\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/invest/dashboard",
				pattern: /^\/invest\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/invest/opportunities",
				pattern: /^\/invest\/opportunities\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/marketplace",
				pattern: /^\/marketplace\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/marketplace/demo/nobs-pay",
				pattern: /^\/marketplace\/demo\/nobs-pay\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/marketplace/products/[slug]",
				pattern: /^\/marketplace\/products\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/purchase-success",
				pattern: /^\/purchase-success\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/quantum-demo",
				pattern: /^\/quantum-demo\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/report",
				pattern: /^\/report\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/vision",
				pattern: /^\/vision\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 24 },
				endpoint: null
			}
		],
		prerendered_routes: new Set(["/tools/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
