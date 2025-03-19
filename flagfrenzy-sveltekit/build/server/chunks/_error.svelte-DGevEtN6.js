import { c as create_ssr_component, b as subscribe, d as add_attribute, e as escape, v as validate_component } from './ssr-9Nf6mmsX.js';
import { p as page, F as Footer } from './stores-BKKrhw-5.js';
import './client-CjdeEz1m.js';
import './exports-DuWZopOC.js';

const css = {
  code: ".active-tab.svelte-1em8jaz{text-decoration:underline;text-underline-offset:4px}",
  map: null
};
const Error_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentPath;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  currentPath = $page.url.pathname;
  $$unsubscribe_page();
  return `<body class="bg-custom-100 h-auto text-white"><header class="bg-custom-110 text-custom-200 flex justify-between items-center p-4 z-40 shadow-BackdropShadow4 mb-1"><a href="/" data-svelte-h="svelte-1p40tt9"><img alt="The project logo"${add_attribute("src", "/images/logo.png", 0)} class="w-60 h-auto object-contain"></a> <nav class="hidden lg:flex gap-8 text-3xl"><a href="/challenges" class="${["svelte-1em8jaz", currentPath === "/challenges" ? "active-tab" : ""].join(" ").trim()}" data-svelte-h="svelte-10ta6jr">Challenges</a> <a href="/scoreboard" class="${["svelte-1em8jaz", currentPath === "/scoreboard" ? "active-tab" : ""].join(" ").trim()}" data-svelte-h="svelte-1tgr86f">Scoreboard</a> <a href="/team" class="${["svelte-1em8jaz", currentPath === "/team" ? "active-tab" : ""].join(" ").trim()}" data-svelte-h="svelte-wsxwee">Team</a></nav> ${`<button class="hidden lg:block text-custom-200 focus:outline-none text-3xl mx-4">${escape("☰")}</button>`} <button class="lg:hidden text-custom-200 focus:outline-none text-3xl">${escape("☰")}</button></header> ${``} ${``} <main class="h-auto text-white">${$page.status != "404" ? `<div class="error-container h-screen flex flex-col justify-center items-center text-center"><h1 class="text-red-600 text-4xl">There was an ${escape($page.status)} Error</h1> <p class="text-gray-400 text-lg font-normal">${escape($page.error?.message ?? "An unexpected error occurred")}</p> <br> <p class="text-xl" data-svelte-h="svelte-88fmh5">Please try again or contact the support.</p></div>` : `<div class="error-container h-screen flex flex-col justify-center items-center text-center" data-svelte-h="svelte-1jst320"><h1 class="text-red-600 text-4xl">404 Page not found</h1> <br> <p class="text-xl">Nice try, but not here. Try hacking another website.</p></div>`}</main> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})} </body>`;
});

export { Error_1 as default };
//# sourceMappingURL=_error.svelte-DGevEtN6.js.map
