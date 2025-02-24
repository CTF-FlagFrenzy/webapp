<script>

  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import Graph from '$lib/components/graph.svelte';

  let teams, teamMembers, teamPoints, interval;
  let errorMessageTeams = '';
    export let data;
  async function loadTeams() {

    try {
      errorMessageTeams, teams = '';
      const response = await fetch('/api/teams/scoreboard');
      if (!response.ok) throw new Error("Failed to load teams");

      teams = await response.json();
    } catch (err) {
      errorMessageTeams = err.message;
    }
  }
  async function loadGraphValue() {
    try {

      errorMessageTeams, teamPoints = '';
      const response = await fetch(`/api/teampoints?id=${data.username}`);

      if (!response.ok) throw new Error("Failed to load values");
      teamPoints = '';
      teamPoints = await response.json();
    } catch (err) {
      errorMessageTeams = err.message;
    }
  }
  onMount(async () => {
    await loadTeams();
    await loadGraphValue();
    interval = setInterval((loadTeams, loadGraphValue), 300000); // Refresh every 60 seconds
    return () => {
      clearInterval(interval); // Clean up interval when component is destroyed
    };
  });

</script>
  
<div class="px-8 pt-8">
  {#if teamPoints}
    <div class="px-32 hidden sm:block">
      <Graph data={teamPoints}/>
    </div>
    <p class="sm:hidden text-center text-white">Der Graph wird nur auf größeren Bildschirmen angezeigt.</p>
  {:else}
    <p class="hidden sm:block">Loading graph data...</p>
    <p class="sm:hidden text-center text-white">Der Graph wird nur auf größeren Bildschirmen angezeigt.</p>
  {/if}
  {#if teams}
  <div class="bg-custom-110 mt-4 px-4 py-4 rounded-2xl shadow-BackdropShadow">
    <table class="styled-table w-full">
      <thead class="text-custom-200 text-xl sticky top-0 bg-custom-110 border-b z-10 border-custom-200">
        <tr>
          <th>Name</th>
          <th class="text-center">Points</th>
        </tr>
      </thead>
      <tbody class="text-white text-sm">
        {#each teams as team}
          <tr class="border-b border-custom-100">
            <td class="pt-2 align-top">{team.Teamname}</td>
            <td class="pt-2 align-top text-center">{team.Points}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
    
  {:else if errorMessageTeams}
    <p class=" text-Hard text-lg font-bold col-span-2">{errorMessageTeams}</p>
  {:else}
    <p>Loading teams data...</p>
  {/if}
</div>