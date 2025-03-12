<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
  import CreateTeamModal from '$lib/components/CreateTeamModal.svelte';
  import TeamModal from '$lib/components/TeamModal.svelte';

  export let data;
  let search = '';
  let teams, teamMembers, teamData;
  let errorMessage, errorMessageTeamMembers = '';
  let isCreateTeamModalOpen = false;
  let isTeamModalOpen = false;

  function openCreateTeamModal() {
    isCreateTeamModalOpen = true;
  }
  function openTeamModal(teamID) {
    teamData = teams.find(team => team.TeamsID === teamID);
    isTeamModalOpen = true;
  }
  function closeCreateTeamModal() {
    isCreateTeamModalOpen = false;
  }
  function closeTeamModal() {
    isTeamModalOpen = false;
  }
    
  async function loadTeams() {
    try {
      errorMessage, teams = '';
      const response = await fetch('/api/teams/members/allMembers/');
      if (!response.ok) throw new Error("Failed to load teams");

      teams = await response.json();
    } catch (err) {
      errorMessage = err.message;
    }
  }
  async function loadTeamMember() {
    try {
      errorMessageTeamMembers, teamMembers = '';
      const response = await fetch(`/api/teams/members?user_id=${data.username}`);
      if (!response.ok) throw new Error("Failed to load team members");

      teamMembers = await response.json();
    } catch (err) {
      errorMessageTeamMembers = err.message;
    }
  }

  onMount(() => {
    loadTeams();
    loadTeamMember();
    const interval = setInterval(() => {loadTeams();loadTeamMember();}, 100000);

    return () => clearInterval(interval);
  });

  $: filteredTeams = search
      ? teams.filter(team => team.Teamname.toLowerCase().includes(search.toLowerCase()))
      : teams;
</script>
<div class="custom-h-screen">
<div class="mx-4 md:!mx-52 flex flex-col mb-16 justify-around">
  <h1 class="text-whita text-4xl font-bold pt-4 text-center md:text-5xl mt-8 mb-4">Teams</h1>
  <div class="w-full items-center flex justify-around">
    <div class="py-4 flex flex-row justify-around w-full md:!w-1/2 gap-1 md:!gap-3.5">
      <input class="bg-custom-100 border-2 border-custom-200 rounded-2xl px-2 py-1 text-xl w-3/7 md:!w-2/6 lg:!w-3/6 xl:!w-3/5" type="text" placeholder="Search a team" bind:value={search}>
      <button class="text-custom-200 border-2 border-custom-200 rounded-2xl px-2 py-1 text-xl w-3/7 md:!w-3/6 lg:!w-2/6  xl:!w-1/5" type="submit" on:click={openCreateTeamModal}>Create</button>
    </div>
  </div>
  <div class="h-80 max-h-80 bg-custom-110 w-full px-4 rounded-2xl shadow-BackdropShadow">
    <div class="h-[300px] overflow-y-auto hide-scrollbar">
      <div class="hide-scrollbar flex-grow overflow-x-auto">
        {#if teams}
          <table class="w-[400px] styled-table md:!w-full bg-custom-110 mt-4">
            <thead class="text-custom-200 text-xl sticky top-0 bg-custom-110 border-b z-10 border-custom-200">
              <tr>
                <th class="w-2/6">Name</th>
                <th class="w-1/6 text-center"></th>
                <th class="w-1/6 text-center hidden md:table-cell">Strikes</th>
                <th class="w-1/6 text-center">Members</th>
                <th class="w-1/6 text-center">Points</th>
              </tr>
            </thead>
            <tbody class="text-white text-sm">
              {#each filteredTeams as team}
                <tr class="border-b border-custom-100 {team.Members.some(member => member.ID === data.username) ? 'text-white' : 'text-gray-400'}" on:click={openTeamModal(team.TeamsID)}>
                  <td class="pt-2 align-top">{team.Teamname}</td>
                  <td class="pt-2 align-top">
                    <FontAwesomeIcon icon={faInfoCircle} class="cursor-pointer text-custom-200" on:click={() => openTeamModal(team.TeamsID)} />
                  </td>
                  <td class="pt-2 align-top text-center hidden md:table-cell">
                    {#if team.Disabled}
                      ☠️
                    {:else if team.SharedFlag === 1}
                      ❌
                    {:else}
                      -
                    {/if}
                  </td>
                  <td class="pt-2 align-top text-center">{team.Members.length}/4</td>
                  <td class="pt-2 align-top text-center">{team.Points}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        {:else if errorMessage}
          <div class="flex items-center justify-center h-80">
            <p class=" text-Hard text-lg font-bold text-center">{errorMessage}</p>
          </div>
        {:else}
          <div class="flex items-center justify-center h-80">
            <p class="text-lg font-bold col-span-2 text-center">Loading teams...</p>
          </div>
        {/if}
      </div>
    </div>
    <div class="spacer"></div>
  </div>
</div>
</div>
<div>
  <CreateTeamModal isOpen={isCreateTeamModalOpen} data={data} on:close={closeCreateTeamModal} on:teamCreated={() => {loadTeams();}}></CreateTeamModal>
</div>
<div>
  <TeamModal isOpen={isTeamModalOpen} data={data} teamdata={teamData} on:close={closeTeamModal} on:teamDeleted={() => {loadTeams();}}></TeamModal>
</div>

<style>
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  @media (min-height: 900px) {
    .custom-h-screen {
      height: 100vh;
    }
  }
  .spacer {
    height: 20px; /* Definiert den konstanten Abstand */
    flex-shrink: 0;
  }
</style>