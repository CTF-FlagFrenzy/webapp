import { c as create_ssr_component, b as subscribe, d as add_attribute, e as escape, v as validate_component } from './ssr-9Nf6mmsX.js';
import { p as page, F as Footer } from './stores-BKKrhw-5.js';
import './client-CjdeEz1m.js';
import './exports-DuWZopOC.js';

const css = {
  code: ".active-tab.svelte-1em8jaz{text-decoration:underline;text-underline-offset:4px}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentPath;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  currentPath = $page.url.pathname;
  $$unsubscribe_page();
  return `<body class="bg-custom-100 h-auto text-white"><header class="bg-custom-110 text-custom-200 flex justify-between items-center p-4 z-40 shadow-BackdropShadow4 mb-1"><a href="/" data-svelte-h="svelte-1p40tt9"><img alt="The project logo"${add_attribute("src", "/images/logo.png", 0)} class="w-60 h-auto object-contain"></a> <nav class="hidden lg:flex gap-8 text-3xl"><a href="/challenges" class="${[
    "!text-custom-200 svelte-1em8jaz",
    currentPath === "/challenges" ? "active-tab" : ""
  ].join(" ").trim()}" data-svelte-h="svelte-bxdwqz">Challenges</a> <a href="/scoreboard" class="${["svelte-1em8jaz", currentPath === "/scoreboard" ? "active-tab" : ""].join(" ").trim()}" data-svelte-h="svelte-1tgr86f">Scoreboard</a> <a href="/team" class="${["svelte-1em8jaz", currentPath === "/team" ? "active-tab" : ""].join(" ").trim()}" data-svelte-h="svelte-wsxwee">Team</a></nav> ${`<p data-svelte-h="svelte-9u4hfj">Loading user data...</p>`} <button class="lg:hidden text-custom-200 focus:outline-none text-3xl">${escape("☰")}</button></header> ${``} ${``} <main class="h-auto text-white">${slots.default ? slots.default({}) : ``}</main> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})} </body>`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-Dt2nuvCV.js.map
