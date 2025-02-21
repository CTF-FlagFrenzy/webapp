<script>
    let allFlags;
    import Graph from '$lib/components/graph.svelte';
    import { onMount, onDestroy } from 'svelte';
    let notSolved = [];
    let teamPoints, interval;
    let errorMessageTeams = '';
    export let data;

    async function loadNotSolved() {
        try {
            const response = await fetch(`/api/user_made_challenges/challenge/notSolved`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                }
            });
            notSolved = await response.json();
            if (!response.ok) {
                throw new Error("NotSolved challenges konnten nicht geladen werden.");
            }
        } catch (error) {
            console.log(error.message || "Es ist ein unbekannter Fehler aufgetreten.");
        }
    }

async function deprovision(entry) {
      try {
        const response = await fetch(`/api/cluster`, {
          method: "POST",
          body: JSON.stringify({
          UserID: entry.UserID,
          ChallengeID: entry.ChallengeID
        }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          }
     });
      if (!response.ok) {
        throw new Error("NotSolved challenges konnten nicht geladen werden.");
      }
    } catch (error) {
      console.log(error.message || "Es ist ein unbekannter Fehler aufgetreten.");
    }
  }

    async function loadGraphValue() {
        try {
            errorMessageTeams = '';
            const response = await fetch(`/api/teampoints/admin`);
            if (!response.ok) throw new Error("Failed to load values");
            teamPoints = await response.json();
        } catch (err) {
            errorMessageTeams = err.message;
        }
    }

    onMount(async () => {
        await loadGraphValue();
        await loadNotSolved();
        interval = setInterval(loadGraphValue, 300000);
        return () => clearInterval(interval);
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

<div class="px-8 py-4">
    <h2 class="text-xl font-bold text-white">Nicht gelöste Challenges</h2>
    <table class="w-full border-collapse border border-gray-700 mt-4 text-white">
        <thead>
            <tr class="bg-gray-800">
                <th class="border border-gray-700 px-4 py-2">UserID</th>
                <th class="border border-gray-700 px-4 py-2">ChallengeID</th>
                <th class="border border-gray-700 px-4 py-2">URL</th>
                <th class="border border-gray-700 px-4 py-2">Teamname</th>

                <th class="border border-gray-700 px-4 py-2">Aktionen</th>
            </tr>
        </thead>
        <tbody>
            {#each notSolved as entry}
                <tr class="bg-gray-900 border-b border-gray-700">
                    <td class="border border-gray-700 px-4 py-2">{entry.UserID}</td>
                    <td class="border border-gray-700 px-4 py-2">{entry.ChallengeID}</td>
                    <td class="border border-gray-700 px-4 py-2">
                        <a href={entry.Url} class="text-blue-400 underline" target="_blank">Challenge Link</a>
                    </td>
                    <td class="border border-gray-700 px-4 py-2">{entry.Teamname}</td>

                    <td class="border border-gray-700 px-4 py-2">
                        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                            on:click={() => deprovision(entry)}>
                            Deprovision
                        </button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    a {
        color: white;
    }
</style>
