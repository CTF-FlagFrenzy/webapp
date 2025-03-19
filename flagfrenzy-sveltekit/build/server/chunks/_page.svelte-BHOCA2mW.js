import { c as create_ssr_component, e as escape, d as add_attribute, f as each } from './ssr-9Nf6mmsX.js';

const css = {
  code: '.fonts-test.svelte-yoo3vu{font-family:"Caveat", cursive}',
  map: null
};
function getColor(placement) {
  if (placement === 1)
    return "#F3CC59";
  if (placement === 2)
    return "#D2EAFE";
  if (placement === 3)
    return "#A87A00";
  return "#FFFFFF";
}
function splitText(text, maxLength) {
  if (!text)
    return [];
  let words = text.split(" ");
  let lines = [];
  let currentLine = "";
  for (let word of words) {
    if ((currentLine + " " + word).trim().length > maxLength) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine += (currentLine.length > 0 ? " " : "") + word;
    }
  }
  if (currentLine.length > 0) {
    lines.push(currentLine);
  }
  return lines;
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let Nickname, Email, userID = "";
  let avatars = [
    "/images/Hero.png",
    "/images/Hacker.png",
    "/images/Anonymous.png",
    "/images/Queen.png",
    "/images/Spy.png",
    "/images/Warrior.png"
  ];
  let currentIndex = 0;
  let user;
  let shadow, color;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `<div class="flex flex-col justify-center items-center text-center mt-4"><svg width="95%" height="100%" viewBox="0 0 200 120" class="md:mx-4"><defs><filter id="red-shadow" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#F35977" flood-opacity="1"></feDropShadow></filter><filter id="green-shadow" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#59F359" flood-opacity="1"></feDropShadow></filter><filter id="purple-shadow" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#B259F3" flood-opacity="1"></feDropShadow></filter><filter id="orange-shadow" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#FF962E" flood-opacity="1"></feDropShadow></filter><filter id="white-shadow" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#A5A2A2" flood-opacity="1"></feDropShadow></filter></defs><ellipse cx="100" cy="50" rx="80" ry="40" fill="#151a22" transform="rotate(20, 100, 50)" filter="${"url(#" + escape(shadow, true) + ")"}"></ellipse><text x="50" y="20" font-size="7" font-weight="bold"${add_attribute("fill", getColor(user?.team_placement), 0)} text-anchor="middle" class="fonts-test svelte-yoo3vu">#${escape(" -")}</text><text x="50" y="27" font-size="6" font-weight="bold" fill="#9ca3af" text-anchor="middle" class="fonts-test svelte-yoo3vu">${each(splitText("-", 23), (line, i) => {
    return `<tspan x="50"${add_attribute("dy", i * 7, 0)}>${escape(line)}</tspan>`;
  })}</text><foreignObject x="20" y="10" width="160" height="80"><div xmlns="http://www.w3.org/1999/xhtml" class="relative w-full h-full flex items-center justify-center"><img${add_attribute("src", avatars[currentIndex], 0)} alt="Avatar Vorschau" class="w-auto h-auto max-w-[80%] max-h-[80%] rounded-full"><button type="button" style="font-size: 4px;" class="absolute left-[50px] top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-[6px] h-[6px] flex items-center justify-center">&lt;
        </button><button type="button" style="font-size: 4px;" class="absolute right-[50px] top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-[6px] h-[6px] flex items-center justify-center">&gt;</button></div></foreignObject><text x="172" y="14" font-size="4" font-weight="bold" fill="#ffffff" text-anchor="middle" class="hidden md:block">Nickname</text><foreignObject x="145" y="15" width="54" height="6"><div xmlns="http://www.w3.org/1999/xhtml" class="w-full h-full items-center justify-center hidden md:flex"><input type="text" class="bg-transparent text-white text-center font-normal w-full h-auto outline-none" style="font-size: 3.5px;" placeholder="Enter Nickname" maxlength="30"${add_attribute("value", Nickname, 0)}></div></foreignObject><text x="25" y="71" font-size="4" font-weight="700" font-family="Roboto" fill="#9ca3af" text-anchor="middle" class="hidden md:block">Name</text><text x="25" y="75" font-size="3.5" font-weight="400" font-family="Roboto" fill="#9ca3af" text-anchor="middle" class="hidden md:block">${escape(userID)}</text><text x="35" y="90" font-size="4" font-weight="700" fill="#9ca3af" text-anchor="middle" class="hidden md:block">Email</text><text x="35" y="94" font-size="3.5" font-weight="400" font-family="Roboto" fill="#9ca3af" text-anchor="middle" class="hidden md:block">${escape(Email)}</text><text x="140" y="75" font-size="8" font-weight="bold" fill="#9ca3af" class="fonts-test svelte-yoo3vu">${escape("-")}</text><foreignObject x="85" y="100" width="30" height="10"><div xmlns="http://www.w3.org/1999/xhtml" class="w-full h-full items-center justify-center hidden md:flex"><button class="text-white border-[0.5px] rounded-2xl pt-[1px] text-[3.5px] font-normal w-full text-center" type="submit" style="${"border-color: " + escape(color, true) + ";"}">Save Changes</button></div></foreignObject></svg></div> <form class="px-4 pb-4"><div class="gap-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1"><div class="flex flex-col justify-center items-center text-center h-full"><h1 class="text-white text-2xl pb-2 font-bold md:hidden" data-svelte-h="svelte-1k64a0t">Nickname</h1> <input class="bg-custom-100 border-2 border-custom-200 rounded-3xl px-2 py-1 mb-4 text-xl text-white w-5/6 md:w-2/3 lg:w-3/6 md:hidden" type="text" placeholder="Enter Nickname" maxlength="30"${add_attribute("value", Nickname, 0)}> <h1 class="text-white text-2xl font-bold pb-2 md:hidden" data-svelte-h="svelte-8llxka">Name</h1> <input class="bg-custom-100 border-2 border-custom-200 rounded-3xl px-2 py-1 mb-4 text-xl font-normal text-gray-400 w-5/6 md:w-2/3 lg:w-3/6 md:hidden" type="text"${add_attribute("value", userID, 0)} readonly> <h1 class="text-white text-2xl font-bold pb-2 md:hidden" data-svelte-h="svelte-8x6e1d">Email</h1> <input class="bg-custom-100 border-2 border-custom-200 rounded-3xl px-2 py-1 mb-4 text-xl text-gray-400 w-5/6 md:w-2/3 lg:w-3/6 md:hidden" type="email"${add_attribute("value", Email, 0)} readonly> <button class="text-custom-200 border-2 border-custom-200 rounded-2xl px-2 py-1 text-2xl w-5/6 md:w-2/3 lg:w-3/6 md:hidden" type="submit" data-svelte-h="svelte-pak069">Save Changes</button></div></div> </form>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-BHOCA2mW.js.map
