<script>
    let allFlags;
    import Graph from '$lib/components/graph.svelte';
  import { onMount, onDestroy } from 'svelte';

let teamPoints, interval;
let errorMessageTeams = '';
  export let data;

    
 async function loadFlags() {
      try {
        const response = await fetch(`/api/anti-cheat`, {
          method: "GET",
      
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          }
     });
    allFlags = await response.json();
      if (!response.ok) {
        throw new Error("Flags konnten nicht geladen werden.");
      }
    } catch (error) {
      console.log(error.message || "Es ist ein unbekannter Fehler aufgetreten.");
    }
  }

async function loadGraphValue() {
  try {

    errorMessageTeams, teamPoints = '';
    const response = await fetch(`/api/teampoints/admin`);

    if (!response.ok) throw new Error("Failed to load values");
    teamPoints = '';
    teamPoints = await response.json();
  } catch (err) {
    errorMessageTeams = err.message;
  }
}
onMount(async () => {
  await loadGraphValue();
  interval = setInterval((loadGraphValue), 300000); // Refresh every 60 seconds
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
</div>
<style>
    a {
        color: white;
    }
</style>