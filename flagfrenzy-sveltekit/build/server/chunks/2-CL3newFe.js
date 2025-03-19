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

var _layout_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 2;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-Dt2nuvCV.js')).default;
const server_id = "src/routes/(protected)/+layout.server.js";
const imports = ["_app/immutable/nodes/2.DO0uiEg8.js","_app/immutable/chunks/scheduler.dkCXWz9Q.js","_app/immutable/chunks/index.C_7_3hqN.js","_app/immutable/chunks/index.DYJSRd4e.js","_app/immutable/chunks/entry.sl7xxWI7.js","_app/immutable/chunks/index.XHvH0xhw.js"];
const stylesheets = ["_app/immutable/assets/1.BCNeuJnb.css","_app/immutable/assets/index.bJpthXzg.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server as server, server_id, stylesheets };
//# sourceMappingURL=2-CL3newFe.js.map
