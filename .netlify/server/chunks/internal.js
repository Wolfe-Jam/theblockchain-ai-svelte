import{c as b,s as w,v as l,m}from"./ssr.js";import{a as B}from"./ssr2.js";let f="",g=f;const I="_app",v={base:f,assets:g};function T(t){f=t.base,g=t.assets}function z(){f=v.base,g=v.assets}function P(t){g=v.assets=t}let x={},S={};function F(t){}function U(t){x=t}function L(t){S=t}let A=null;function q(t){A=t}function D(t){}let E=!1;function R(){}function M(){E=!0}const j=b((t,e,n,y)=>{let{stores:c}=e,{page:h}=e,{constructors:a}=e,{components:o=[]}=e,{form:r}=e,{data_0:p=null}=e,{data_1:d=null}=e,{data_2:u=null}=e;w("__svelte__",c),B(c.page.notify),e.stores===void 0&&n.stores&&c!==void 0&&n.stores(c),e.page===void 0&&n.page&&h!==void 0&&n.page(h),e.constructors===void 0&&n.constructors&&a!==void 0&&n.constructors(a),e.components===void 0&&n.components&&o!==void 0&&n.components(o),e.form===void 0&&n.form&&r!==void 0&&n.form(r),e.data_0===void 0&&n.data_0&&p!==void 0&&n.data_0(p),e.data_1===void 0&&n.data_1&&d!==void 0&&n.data_1(d),e.data_2===void 0&&n.data_2&&u!==void 0&&n.data_2(u);let s,_,k=t.head;do s=!0,t.head=k,c.page.set(h),_=`  ${a[1]?`${l(a[0]||m,"svelte:component").$$render(t,{data:p,this:o[0]},{this:i=>{o[0]=i,s=!1}},{default:()=>`${a[2]?`${l(a[1]||m,"svelte:component").$$render(t,{data:d,this:o[1]},{this:i=>{o[1]=i,s=!1}},{default:()=>`${l(a[2]||m,"svelte:component").$$render(t,{data:u,form:r,this:o[2]},{this:i=>{o[2]=i,s=!1}},{})}`})}`:`${l(a[1]||m,"svelte:component").$$render(t,{data:d,form:r,this:o[1]},{this:i=>{o[1]=i,s=!1}},{})}`}`})}`:`${l(a[0]||m,"svelte:component").$$render(t,{data:p,form:r,this:o[0]},{this:i=>{o[0]=i,s=!1}},{})}`} `;while(!s);return _}),N={app_template_contains_nonce:!1,csp:{mode:"auto",directives:{"upgrade-insecure-requests":!1,"block-all-mixed-content":!1},reportOnly:{"upgrade-insecure-requests":!1,"block-all-mixed-content":!1}},csrf_check_origin:!0,embedded:!1,env_public_prefix:"PUBLIC_",env_private_prefix:"",hash_routing:!1,hooks:null,preload_strategy:"modulepreload",root:j,service_worker:!1,templates:{app:({head:t,body:e,assets:n,nonce:y,env:c})=>`<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		
		<!-- Primary Meta Tags -->
		<title>theBlockchain.ai | The Economic Layer for Open-Source</title>
		<meta name="title" content="theBlockchain.ai | The Economic Layer for Open-Source" />
		<meta name="description" content="Building the economic backbone for the next generation of software, transforming open-source contributions from static assets into dynamic, revenue-generating capital through AI, Blockchain, and Software convergence." />
		<meta name="keywords" content="blockchain, AI, artificial intelligence, open source, tokenization, ERC-1155, smart contracts, convergent economy, software monetization, decentralized development" />
		<meta name="author" content="theBlockchain.ai" />
		<meta name="robots" content="index, follow" />
		<link rel="canonical" href="https://theblockchain.ai/" />
		
		<!-- Favicons and Icons -->
		<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
		<link rel="icon" href="/theBlockchain-ai-logo.png" type="image/png" sizes="32x32" />
		<link rel="apple-touch-icon" href="/theBlockchain-ai-logo.png" sizes="180x180" />
		<link rel="manifest" href="/manifest.json" />
		<meta name="theme-color" content="#004AAE" />
		<meta name="msapplication-TileColor" content="#004AAE" />
		
		<!-- Open Graph / Facebook -->
		<meta property="og:type" content="website" />
		<meta property="og:site_name" content="theBlockchain.ai" />
		<meta property="og:title" content="theBlockchain.ai | The Economic Layer for Open-Source" />
		<meta property="og:description" content="Building the economic backbone for the next generation of software, transforming open-source contributions from static assets into dynamic, revenue-generating capital." />
		<meta property="og:image" content="https://theblockchain.ai/theBlockchain-ai-landscape.webp" />
		<meta property="og:image:alt" content="theBlockchain.ai - The Convergent Economy of AI, Blockchain, and Software" />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
		<meta property="og:url" content="https://theblockchain.ai/" />
		<meta property="og:locale" content="en_US" />
		
		<!-- Twitter Card -->
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content="theBlockchain.ai | The Economic Layer for Open-Source" />
		<meta name="twitter:description" content="Building the economic backbone for the next generation of software through AI, Blockchain, and Software convergence." />
		<meta name="twitter:image" content="https://theblockchain.ai/theBlockchain-ai-landscape.webp" />
		<meta name="twitter:image:alt" content="theBlockchain.ai - The Convergent Economy" />
		<meta name="twitter:site" content="@theBlockchainAI" />
		<meta name="twitter:creator" content="@theBlockchainAI" />
		
		<!-- Additional SEO -->
		<meta name="format-detection" content="telephone=no" />
		<meta name="geo.region" content="US" />
		<meta name="geo.placename" content="United States" />
		<meta name="language" content="English" />
		
		<!-- Content Security Policy (only security header that works in meta) -->
		<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://js.stripe.com https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: https: blob:; connect-src 'self' https://api.stripe.com https://*.supabase.co https://fonts.googleapis.com; frame-src 'self' https://js.stripe.com;">
		
		<!-- Google Fonts -->
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Roboto+Mono:wght@700&display=swap" rel="stylesheet">
		
		<!-- Font Awesome -->
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
		
		<!-- Stripe.js for NOBS Pay -->
		<script src="https://js.stripe.com/v3/"><\/script>
		
		<!-- JSON-LD Structured Data -->
		<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Organization",
			"name": "theBlockchain.ai",
			"url": "https://theblockchain.ai",
			"logo": "https://theblockchain.ai/theBlockchain-ai-logo.svg",
			"description": "Building the economic backbone for the next generation of software, transforming open-source contributions from static assets into dynamic, revenue-generating capital.",
			"industry": "Technology",
			"foundingDate": "2024",
			"sameAs": [
				"https://github.com/Wolfe-Jam/theblockchain-ai-svelte"
			],
			"contactPoint": {
				"@type": "ContactPoint",
				"contactType": "customer service",
				"email": "info@theblockchain.ai"
			},
			"mainEntity": {
				"@type": "SoftwareApplication",
				"name": "theBlockchain.ai Platform",
				"description": "AI-powered tools for smart contract generation and blockchain development",
				"applicationCategory": "DeveloperApplication",
				"operatingSystem": "Web Browser"
			}
		}
		<\/script>
		
		`+t+`
	</head>
	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">`+e+`</div>
	</body>
</html>`,error:({status:t,message:e})=>`<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>`+e+`</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">`+t+`</span>
			<div class="message">
				<h1>`+e+`</h1>
			</div>
		</div>
	</body>
</html>
`},version_hash:"nm93a6"};async function G(){return{handle:void 0,handleFetch:void 0,handleError:void 0,init:void 0,reroute:void 0,transport:void 0}}export{g as a,f as b,I as c,A as d,N as e,F as f,G as g,E as h,U as i,L as j,q as k,P as l,R as m,D as n,T as o,x as p,M as q,z as r,S as s};
