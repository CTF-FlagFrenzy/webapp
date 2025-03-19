import { c as create_ssr_component, f as each, e as escape, d as add_attribute } from './ssr-9Nf6mmsX.js';
import 'chart.js/auto';
import './index-DzcLzHBX.js';
import './client-CjdeEz1m.js';
import './exports-DuWZopOC.js';

const css = {
  code: "a.svelte-16scy71{color:white}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let allFlags = [];
  let notSolved = [];
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `${data.adminUser && data.adminUser.includes(data.username) ? `<div class="px-8 pt-8">${`<p class="hidden sm:block" data-svelte-h="svelte-1a7pwc2">Loading graph data...</p> <p class="sm:hidden text-center text-white" data-svelte-h="svelte-vwrs1f">Der Graph wird nur auf größeren Bildschirmen angezeigt.</p>`}</div> <div class="px-8 py-4"><h2 class="text-xl font-bold text-white" data-svelte-h="svelte-13up9oo">Solved Challenges</h2> <table class="w-full border-collapse border border-gray-700 mt-4 text-white"><thead data-svelte-h="svelte-18b4w0m"><tr class="bg-gray-800"><th class="border border-gray-700 px-4 py-2">Team</th> <th class="border border-gray-700 px-4 py-2">TeamID</th> <th class="border border-gray-700 px-4 py-2">Challenge Difficulty</th> <th class="border border-gray-700 px-4 py-2">Challengename</th> <th class="border border-gray-700 px-4 py-2">Starttime</th> <th class="border border-gray-700 px-4 py-2">Submission Time</th> <th class="border border-gray-700 px-4 py-2">Time Difference</th></tr></thead> <tbody>${each(allFlags && allFlags.valid_flags || [], (entry) => {
    return `<tr class="bg-gray-900 border-b border-gray-700"><td class="border border-gray-700 px-4 py-2">${escape(entry.team_name)}</td> <td class="border border-gray-700 px-4 py-2">${escape(entry.team_id)}</td> <td class="border border-gray-700 px-4 py-2">${escape(entry.challenge_name)}</td> <td class="border border-gray-700 px-4 py-2">${escape(entry.challenge_difficulty)}</td> <td class="border border-gray-700 px-4 py-2">${escape(new Date(entry.start_time).toLocaleString())}</td> <td class="border border-gray-700 px-4 py-2">${escape(new Date(entry.flag.submission_time).toLocaleString())}</td> <td class="border border-gray-700 px-4 py-2">${escape(entry.time_difference)} Min</td> </tr>`;
  })}</tbody></table></div> <div class="px-8 py-4"><h2 class="text-xl font-bold text-white" data-svelte-h="svelte-t7iwss">Shared Challenges</h2> <table class="w-full border-collapse border border-gray-700 mt-4 text-white"><thead data-svelte-h="svelte-1qsdabt"><tr class="bg-gray-800"><th class="border border-gray-700 px-4 py-2">Team</th> <th class="border border-gray-700 px-4 py-2">Original Team</th> <th class="border border-gray-700 px-4 py-2">Challengename</th> <th class="border border-gray-700 px-4 py-2">Submission Time</th> <th class="border border-gray-700 px-4 py-2">Shared Flags Counter</th></tr></thead> <tbody>${each(allFlags && allFlags.shared_flags || [], (entry) => {
    return `<tr class="bg-gray-900 border-b border-gray-700"><td class="border border-gray-700 px-4 py-2">${escape(entry.team_name)}</td> <td class="border border-gray-700 px-4 py-2">${escape(entry.original_team_name)}</td> <td class="border border-gray-700 px-4 py-2">${escape(entry.challenge_name)}</td> <td class="border border-gray-700 px-4 py-2">${escape(new Date(entry.flag.submission_time).toLocaleString())}</td> <td class="border border-gray-700 px-4 py-2">${escape(entry.shared_flags)}</td> </tr>`;
  })}</tbody></table></div> <div class="px-8 py-4"><h2 class="text-xl font-bold text-white" data-svelte-h="svelte-14kr8c5">Not solved Challenges</h2> <table class="w-full border-collapse border border-gray-700 mt-4 text-white"><thead data-svelte-h="svelte-196v350"><tr class="bg-gray-800"><th class="border border-gray-700 px-4 py-2">UserID</th> <th class="border border-gray-700 px-4 py-2">Challenge Name</th> <th class="border border-gray-700 px-4 py-2">TeamID</th> <th class="border border-gray-700 px-4 py-2">Difficulty</th> <th class="border border-gray-700 px-4 py-2">URL</th> <th class="border border-gray-700 px-4 py-2">Teamname</th> <th class="border border-gray-700 px-4 py-2">Aktionen</th></tr></thead> <tbody>${each(notSolved, (entry) => {
    return `<tr class="bg-gray-900 border-b border-gray-700"><td class="border border-gray-700 px-4 py-2">${escape(entry.UserID)}</td> <td class="border border-gray-700 px-4 py-2">${escape(entry.ChallengeName)}</td> <td class="border border-gray-700 px-4 py-2">${escape(entry.TeamID)}</td> <td class="border border-gray-700 px-4 py-2">${escape(entry.Difficulty)}</td> <td class="border border-gray-700 px-4 py-2"><a class="text-custom-200 px-2 py-1 text-base w-1/3 text-center svelte-16scy71"${add_attribute("href", entry.URL, 0)} target="_blank">Open Challenge</a></td> <td class="border border-gray-700 px-4 py-2">${escape(entry.Teamname)}</td> <td class="border border-gray-700 px-4 py-2"><button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" data-svelte-h="svelte-1gkmkvd">Deprovision
                        </button></td> </tr>`;
  })}</tbody></table></div>` : ``}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-BM11Q3ol.js.map
