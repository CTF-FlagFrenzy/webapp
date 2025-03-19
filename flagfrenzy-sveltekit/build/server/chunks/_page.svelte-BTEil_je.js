import { c as create_ssr_component } from './ssr-9Nf6mmsX.js';
import 'chart.js/auto';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="px-8 pt-14">${`<p class="hidden sm:block" data-svelte-h="svelte-1a7pwc2">Loading graph data...</p> <p class="sm:hidden text-center text-white" data-svelte-h="svelte-vwrs1f">Der Graph wird nur auf größeren Bildschirmen angezeigt.</p>`} ${`${`<p data-svelte-h="svelte-xg5ivw">Loading teams data...</p>`}`}</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-BTEil_je.js.map
