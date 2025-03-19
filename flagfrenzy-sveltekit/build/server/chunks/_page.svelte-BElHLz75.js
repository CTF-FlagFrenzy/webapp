import { c as create_ssr_component, d as add_attribute, v as validate_component, h as createEventDispatcher, e as escape, f as each } from './ssr-9Nf6mmsX.js';
import './logger-myu11loA.js';

const CreateTeamModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { isOpen = false } = $$props;
  let { data } = $$props;
  let teamname, password;
  let refreshInterval;
  createEventDispatcher();
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  {
    if (isOpen) {
      refreshInterval = setInterval(
        () => {
        },
        // checkIfStarted();
        5e3
      );
    } else {
      clearInterval(refreshInterval);
    }
  }
  return `${isOpen ? ` <div class="fixed inset-0 bg-black bg-opacity-75 z-10" tabindex="0" role="button"></div> <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-lg z-20 max-h-3/5 max-w-2xl w-11/12 bg-custom-110 card-Default text-white"><button class="absolute top-2.5 right-2.5 text-xl cursor-pointer bg-none" data-svelte-h="svelte-1p3cej">✖</button> <div class="flex justify-center items-center pb-4" data-svelte-h="svelte-1lys32r"><h2 class="text-3xl text-center">Create a Team</h2></div> <div class="flex flex-col justify-center items-center"><form class="py-4"><input class="bg-custom-100 border-2 border-custom-200 rounded-2xl px-2 py-1 text-xl w-full" type="text" placeholder="Team name" required${add_attribute("value", teamname, 0)}> <input class="bg-custom-100 border-2 border-custom-200 rounded-2xl px-2 py-1 mt-2 text-xl w-full" type="password" placeholder="Password" required${add_attribute("value", password, 0)}></form> <button class="text-custom-200 border-2 border-custom-200 rounded-2xl px-2 py-1 text-xl w-1/3 text-center" type="submit" data-svelte-h="svelte-1o8377o">Create</button> ${``}</div></div>` : ``}`;
});
const TeamModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { isOpen = false } = $$props;
  let { data } = $$props;
  let { teamdata } = $$props;
  let password = "";
  let refreshInterval;
  let errorMessage = "";
  createEventDispatcher();
  const deadline = new Date(2025, 2, 20, 9, 0);
  let isExpired = false;
  function checkExpiration() {
    const now = /* @__PURE__ */ new Date();
    isExpired = now >= deadline;
  }
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.teamdata === void 0 && $$bindings.teamdata && teamdata !== void 0)
    $$bindings.teamdata(teamdata);
  {
    if (isOpen) {
      errorMessage = "";
      refreshInterval = setInterval(
        () => {
        },
        5e3
      );
    } else {
      clearInterval(refreshInterval);
    }
  }
  {
    {
      checkExpiration();
      isExpired = /* @__PURE__ */ new Date() >= deadline;
    }
  }
  return `${isOpen ? ` <div class="fixed inset-0 bg-black bg-opacity-75 z-10" tabindex="0" role="button"></div> <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-lg z-20 max-h-3/5 max-w-2xl w-11/12 bg-custom-110 card-Team text-white"><button class="absolute top-2.5 right-2.5 text-xl cursor-pointer bg-none" data-svelte-h="svelte-1p3cej">✖</button> <div class="flex justify-between pb-4"><h2 class="text-3xl text-white w-[350px]">${escape(teamdata.Teamname)}</h2> <h3 class="text-2xl mr-4">Points: ${escape(teamdata.Points)}</h3></div> <table class="styled-table w-full mb-4 table-fixed"><thead class="text-custom-200 text-xl border-b border-custom-200" data-svelte-h="svelte-1fhcxlv"><tr><th class="pl-4 text-left w-1/2">Name</th> <th class="pl-4 text-left w-1/2">Nickname</th></tr></thead> <tbody class="text-gray-400 text-base">${each(
    [...teamdata.Members].sort((a, b) => a.ID === teamdata.TeamLeader ? -1 : b.ID === teamdata.TeamLeader ? 1 : 0),
    (member) => {
      return `<tr class="border-b border-custom-100">${member.ID == teamdata.TeamLeader ? `<td class="pl-4 pt-2 align-top">${escape(member.ID)} <span class="text-custom-200 text-xl" data-svelte-h="svelte-1gcw0oi">♛</span></td>` : `<td class="pl-4 pt-2 align-top">${escape(member.ID)}</td>`} <td class="pl-4 pt-2 align-top">${escape(member.Nickname)}</td> </tr>`;
    }
  )}</tbody></table> ${!isExpired ? `<div class="flex flex-row mt-4 justify-around pt-4 border-t border-custom-200"><form class="flex flex-row">${data.username == teamdata.TeamLeader ? `<input class="bg-custom-100 border-2 border-custom-200 rounded-2xl px-2 py-1 text-xl w-full" type="password" placeholder="Password" required${add_attribute("value", password, 0)}> <button class="text-custom-200 border-2 border-custom-200 rounded-2xl px-2 py-1 text-xl w-1/3 ml-4" data-svelte-h="svelte-iflpiz">Delete</button>` : `${teamdata.Members.some((member) => member.ID === data.username) ? `<input class="bg-custom-100 border-2 border-custom-200 rounded-2xl px-2 py-1 text-xl w-full " type="password" placeholder="Password" required${add_attribute("value", password, 0)}> <button class="text-custom-200 border-2 border-custom-200 rounded-2xl px-2 py-1 text-xl w-1/3 ml-4" type="submit" data-svelte-h="svelte-dwhcog">Leave</button>` : `${teamdata.Members.length < 4 ? `<input class="bg-custom-100 border-2 border-custom-200 rounded-2xl px-2 py-1 text-xl w-full" type="password" placeholder="Password" required${add_attribute("value", password, 0)}> <button class="text-custom-200 border-2 border-custom-200 rounded-2xl ml-4 px-2 py-1 text-xl w-1/3 text-center" type="submit" data-svelte-h="svelte-1dcmirj">Join</button>` : ``}`}`}</form></div> ${errorMessage ? `<p class="text-Hard text-lg font-bold">${escape(errorMessage)}</p>` : ``}` : ``}</div>` : ``}`;
});
const css = {
  code: ".hide-scrollbar.svelte-1ouk6m8::-webkit-scrollbar{display:none}@media(min-height: 900px){}.spacer.svelte-1ouk6m8{height:20px;flex-shrink:0}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let search = "";
  let teamData;
  let isCreateTeamModalOpen = false;
  let isTeamModalOpen = false;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `<div class="h-screen"><div class="mx-4 md:!mx-52 flex flex-col mb-16 h-full"><h1 class="text-whita text-4xl font-bold pt-4 text-center md:text-5xl mt-8 mb-4" data-svelte-h="svelte-1i92js9">Teams</h1> <div class="w-full items-center flex justify-around"><div class="py-4 flex flex-row justify-around w-full md:!w-1/2 gap-1 md:!gap-3.5"><input class="bg-custom-100 border-2 border-custom-200 rounded-2xl px-2 py-1 text-xl w-3/7 md:!w-2/6 lg:!w-3/6 xl:!w-3/5" type="text" placeholder="Search a team"${add_attribute("value", search, 0)}> <button class="text-custom-200 border-2 border-custom-200 rounded-2xl px-2 py-1 text-xl w-3/7 md:!w-3/6 lg:!w-2/6 xl:!w-1/5" type="submit" data-svelte-h="svelte-1r92ei8">Create</button></div></div> <div class="h-1/2 bg-custom-110 w-full px-4 rounded-2xl shadow-BackdropShadow"><div class="h-[95%] overflow-y-auto hide-scrollbar svelte-1ouk6m8"><div class="hide-scrollbar flex-grow overflow-x-auto svelte-1ouk6m8">${`${`<div class="flex items-center justify-center h-80" data-svelte-h="svelte-1ne7m7a"><p class="text-lg font-bold col-span-2 text-center">Loading teams...</p></div>`}`}</div></div> <div class="spacer svelte-1ouk6m8"></div></div></div></div> <div>${validate_component(CreateTeamModal, "CreateTeamModal").$$render($$result, { isOpen: isCreateTeamModalOpen, data }, {}, {})}</div> <div>${validate_component(TeamModal, "TeamModal").$$render(
    $$result,
    {
      isOpen: isTeamModalOpen,
      data,
      teamdata: teamData
    },
    {},
    {}
  )} </div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-BElHLz75.js.map
