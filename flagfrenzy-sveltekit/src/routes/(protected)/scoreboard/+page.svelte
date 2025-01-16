<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import Graph from '$lib/components/graph.svelte';

  let teams, teamMembers;
  let errorMessageTeams = '';

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
      const response = await fetch('/api/teampoints');
      if (!response.ok) throw new Error("Failed to load values");

      teamPoints = await response.json();
      console.log(teamPoints)
    } catch (err) {
      errorMessageTeams = err.message;
    }
  }
onMount(() => {
    loadTeams();
    loadGraphValue();
  
    
    const interval = setInterval(() => {
      loadTeams();
    }, 100000);

    // Cleanup beim Verlassen der Komponente
    return () => clearInterval(interval);
  });
  </script>
  
  <div>
       {#if teams}
        <table class="styled-table w-full bg-custom-110 mt-4">
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
      {:else if errorMessageTeams}
        <p class=" text-Hard text-lg font-bold col-span-2">{errorMessageTeams}</p>
      {:else}
        <p>Loading teams data...</p>
      {/if}
      <Graph />
  </div>