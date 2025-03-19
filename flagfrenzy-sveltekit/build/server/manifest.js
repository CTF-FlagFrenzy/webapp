const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","favicon.png","images/.DS_Store","images/3_banken_bg.png","images/3_banken_logo.svg","images/5_min_bg.png","images/Anonymous.png","images/Brown.jpg","images/Flaschberger.jpg","images/Hacker.png","images/Hafner.jpg","images/Hero.png","images/Huber.jpg","images/Kavalar.jpg","images/Logo_BHB_IT-Services.png","images/Logo_NTS_Combo1_2017_RGB_White.png","images/Pinter.jpg","images/Ploner.jpg","images/Queen.png","images/Rabensteiner.jpg","images/Romauch.jpg","images/Slogan.png","images/Spy.png","images/Sturm.jpg","images/Warrior.png","images/bhb_bg.png","images/bpn_bg.jpg","images/bpn_logo.png","images/logo.png","images/logo_5_min.png","images/nts_bg.png","images/spar_ics_bg.jpg","images/spar_ics_logo.png","images/team.jpg"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml",".jpg":"image/jpeg"},
	_: {
		client: {"start":"_app/immutable/entry/start.CDlRtjc0.js","app":"_app/immutable/entry/app.CatP2xWN.js","imports":["_app/immutable/entry/start.CDlRtjc0.js","_app/immutable/chunks/entry.sl7xxWI7.js","_app/immutable/chunks/scheduler.dkCXWz9Q.js","_app/immutable/chunks/index.XHvH0xhw.js","_app/immutable/entry/app.CatP2xWN.js","_app/immutable/chunks/scheduler.dkCXWz9Q.js","_app/immutable/chunks/index.C_7_3hqN.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-BmbAEK2k.js')),
			__memo(() => import('./chunks/1-BdZpdr8D.js')),
			__memo(() => import('./chunks/2-CL3newFe.js')),
			__memo(() => import('./chunks/3-CChMdCJC.js')),
			__memo(() => import('./chunks/4-DVzNKgg3.js')),
			__memo(() => import('./chunks/5-C483r2nm.js')),
			__memo(() => import('./chunks/6-C5HQUbbK.js')),
			__memo(() => import('./chunks/7-Ck-2ligl.js')),
			__memo(() => import('./chunks/8-BJRhrwy0.js')),
			__memo(() => import('./chunks/9-Czxx4HhZ.js'))
		],
		routes: [
			{
				id: "/(protected)",
				pattern: /^\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/(protected)/about-us",
				pattern: /^\/about-us\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/(protected)/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/api/anti-cheat",
				pattern: /^\/api\/anti-cheat\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-23bwT5Vb.js'))
			},
			{
				id: "/api/anti-cheat/static_flags",
				pattern: /^\/api\/anti-cheat\/static_flags\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-BTnAOQ2G.js'))
			},
			{
				id: "/api/challenges",
				pattern: /^\/api\/challenges\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-jK6uBsrq.js'))
			},
			{
				id: "/api/challenges/hints",
				pattern: /^\/api\/challenges\/hints\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-SRlO3KDD.js'))
			},
			{
				id: "/api/cluster",
				pattern: /^\/api\/cluster\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-FSiXPd3g.js'))
			},
			{
				id: "/api/teampoints",
				pattern: /^\/api\/teampoints\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-S1lEQkdH.js'))
			},
			{
				id: "/api/teampoints/admin",
				pattern: /^\/api\/teampoints\/admin\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-CRs9ZpSg.js'))
			},
			{
				id: "/api/teams",
				pattern: /^\/api\/teams\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-859J7bwA.js'))
			},
			{
				id: "/api/teams/members",
				pattern: /^\/api\/teams\/members\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-EyMUwFq0.js'))
			},
			{
				id: "/api/teams/members/allMembers",
				pattern: /^\/api\/teams\/members\/allMembers\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-Ney2Dw7K.js'))
			},
			{
				id: "/api/teams/scoreboard",
				pattern: /^\/api\/teams\/scoreboard\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-BZD1xmGj.js'))
			},
			{
				id: "/api/user_made_challenges",
				pattern: /^\/api\/user_made_challenges\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-y71emRoJ.js'))
			},
			{
				id: "/api/user_made_challenges/challenge",
				pattern: /^\/api\/user_made_challenges\/challenge\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-DZJ8Y4vA.js'))
			},
			{
				id: "/api/user_made_challenges/challenge/notSolved",
				pattern: /^\/api\/user_made_challenges\/challenge\/notSolved\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-D6XlUmVM.js'))
			},
			{
				id: "/api/user",
				pattern: /^\/api\/user\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-DM2gqJ5C.js'))
			},
			{
				id: "/api/user/details",
				pattern: /^\/api\/user\/details\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-F8VCx9Cd.js'))
			},
			{
				id: "/api/user/leave",
				pattern: /^\/api\/user\/leave\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-CnQfS-l_.js'))
			},
			{
				id: "/api/user/team",
				pattern: /^\/api\/user\/team\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-Cpe9_sr7.js'))
			},
			{
				id: "/callback",
				pattern: /^\/callback\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-Cr_6dPMR.js'))
			},
			{
				id: "/(protected)/challenges",
				pattern: /^\/challenges\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(protected)/logout",
				pattern: /^\/logout\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-BpRYswNY.js'))
			},
			{
				id: "/(protected)/profile",
				pattern: /^\/profile\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/(protected)/scoreboard",
				pattern: /^\/scoreboard\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/(protected)/team",
				pattern: /^\/team\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
