function load({ locals }) {
  const userinfo = locals.user;
  const username = userinfo.displayName;
  const email = userinfo.mail;
  const givenname = userinfo.givenName;
  const surname = userinfo.surname;
  const adminUser = ["PINTER Elias, 5AHITS", "STURM Leon Attila, 5BHITS", "PLONER Fabian, 5AHITS", "HUBER Julian, 5AHITS", "BROWN Ilaria, 5BHITS", "KAVALAR Johannes, 5AHITS", "FLASCHBERGER Florian, 5AHITS", "HAFNER Florian, 5AHITS", "ROMAUCH Daniel, 5AHITS"];
  return {
    username,
    email,
    givenname,
    surname,
    adminUser
  };
}

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BM11Q3ol.js')).default;
const server_id = "src/routes/(protected)/admin/+page.server.js";
const imports = ["_app/immutable/nodes/5.Djjl1O3_.js","_app/immutable/chunks/scheduler.dkCXWz9Q.js","_app/immutable/chunks/index.C_7_3hqN.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/graph.GC2_r2d9.js","_app/immutable/chunks/entry.Cfaor06_.js","_app/immutable/chunks/index.XHvH0xhw.js"];
const stylesheets = ["_app/immutable/assets/5.DEu64tov.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=5-iKf8f7U8.js.map
