function load({ locals }) {
  const userinfo = locals.user;
  const username = userinfo.displayName;
  const email = userinfo.mail;
  const givenname = userinfo.givenName;
  const surname = userinfo.surname;
  return {
    username,
    email,
    givenname,
    surname
  };
}

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 9;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BElHLz75.js')).default;
const server_id = "src/routes/(protected)/team/+page.server.js";
const imports = ["_app/immutable/nodes/9.9FxafONR.js","_app/immutable/chunks/scheduler.dkCXWz9Q.js","_app/immutable/chunks/index.C_7_3hqN.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/FontAwesomeIcon.DS-XzytD.js"];
const stylesheets = ["_app/immutable/assets/9.BW3hDSrZ.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=9-Czxx4HhZ.js.map
