import { c as create_ssr_component, e as escape, g as getContext } from './ssr-9Nf6mmsX.js';
import './client-CjdeEz1m.js';

const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let onlineMembers = 0;
  let totalMembers = 0;
  return `<footer class="shadow-BackdropShadow2 bg-custom-110 grid grid-cols-1 lg:grid-cols-3 justify-items-center justify-around p-4 mt-14"><div class="w-full text-center lg:border-r border-gray-500 justify-items-center px-6 sm:mb-4 md:mb-4 lg:!mb-0 xl:mb-0 2xl:!mb-0 mb-4"><h3 class="text-custom-200 text-2xl mb-2" data-svelte-h="svelte-f6qseu">Discord Server</h3> <div class="bg-custom-100 rounded-2xl py-4 px-2 lg:py-3 xl:p-4 w-auto text-white shadow-BackdropShadow h-24"><div class="flex justify-center items-center space-x-4"><div class="w-10 h-10 rounded-md bg-center bg-cover" style="background-image: url('https://cdn.discordapp.com/icons/1283699326534553600/811f9b16c144dfae14c6e571c3cfbbee.webp?size=128');"></div> <div class="flex flex-col justify-between"><h3 class="flex items-center sm:md:text-sm xl:text-base font-semibold" data-svelte-h="svelte-l85nw4">TopHack | CTF FlagFrenzy</h3> <div class="flex items-center text-gray-400 space-x-4"><div class="flex items-center"><span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span> <strong class="text-xs xl:text-sm">${escape(onlineMembers)} Online</strong></div> <div class="flex items-center"><span class="w-2 h-2 bg-gray-500 rounded-full mr-2"></span> <strong class="text-xs xl:text-sm">${escape(totalMembers)} Members</strong></div></div></div> <a class="bg-green-500 rounded-md text-sm font-semibold hover:bg-green-600 transition text-white px-2 py-2 sm:!px-4 md:!px-4 lg:!px-2 xl:!px-4 " href="https://discord.gg/Wns7pxwJKF" data-svelte-h="svelte-1km3528">Join</a></div></div></div> <div class="w-full text-center lg:border-r border-gray-500 sm:mb-4 md:mb-4 lg:mb-0" data-svelte-h="svelte-1i132zv"><h3 class="text-custom-200 text-2xl mb-2">Quick Links</h3> <div class="flex h-24 align-middle items-center justify-center"><ul class="text-white"><li><a href="/">Home</a></li> <li><a href="/about-us">About Us</a></li> <li><a href="/#Rules">Rules</a></li></ul></div></div> <div class="w-full text-center" data-svelte-h="svelte-dyvmt"><h3 class="text-custom-200 text-2xl mb-2">Sponsors</h3> <div class="flex items-center justify-center h-24"><div class="flex justify-center items-center w-full sm:w-1/2 md:w-1/2 lg:w-11/12 xl:w-3/4"><ul class="text-white w-2/4"><li><a href="https://www.bpn-group.com/de/">BPN</a></li> <li><a href="https://www.barmherzige-brueder.at/portal/itservices/home">BARMHERZIGE BRÜDER</a></li> <li><a href="https://www.3bankenit.at/">3Banken IT</a></li></ul> <ul class="text-white w-2/4"><li><a href="https://www.nts.eu">NTS</a></li> <li><a href="https://www.spar-ics.com">Spar ICS</a></li> <li><a href="https://www.5min.at/">5 Min</a></li></ul></div></div></div></footer>`;
});
const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};

export { Footer as F, page as p };
//# sourceMappingURL=stores-BKKrhw-5.js.map
