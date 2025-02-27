<script>
    import Graph from '$lib/components/graph.svelte';
    import { onMount, onDestroy } from 'svelte';

    let allFlags = [];
    let notSolved = [];
    let teamPoints;
    let interval;
    let errorMessageTeams = '';
    export let data;

    async function loadAllFlags() {
        try {
            const response = await fetch(`/api/anti-cheat`, {
                method: "GET",
                headers: { "Content-Type": "application/json; charset=UTF-8" }
            });
            if (!response.ok) throw new Error("Flags konnten nicht geladen werden.");
            allFlags = await response.json();
            console.log("Loaded Flags:", allFlags);
        } catch (error) {
            console.error("Fehler beim Laden der Flags:", error);
        }
    }

    async function loadNotSolved() {
        try {
            const response = await fetch(`/api/user_made_challenges/challenge/notSolved`, {
                method: "GET",
                headers: { "Content-Type": "application/json; charset=UTF-8" }
            });
            if (!response.ok) throw new Error("NotSolved challenges konnten nicht geladen werden.");
            notSolved = await response.json();
            console.log("Loaded NotSolved Challenges:", notSolved);
        } catch (error) {
            console.error("Fehler beim Laden der NotSolved Challenges:", error);
        }
    }

    async function deprovision(entry) {
        try {
            const response = await fetch(`/api/cluster`, {
                method: "POST",
                body: JSON.stringify({ UserID: entry.UserID, ChallengeID: entry.ChallengeID }),
                headers: { "Content-Type": "application/json; charset=UTF-8" }
            });
            loadNotSolved();
            if (!response.ok) throw new Error("Deprovision fehlgeschlagen.");
            console.log(`Challenge ${entry.ChallengeID} für User ${entry.UserID} deprovisioniert.`);
        
        } catch (error) {
            console.error("Fehler bei Deprovision:", error);
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

    onMount(async() => {
    await loadAllFlags();
    await loadGraphValue();
    await loadNotSolved();
    
    const interval = setInterval(() => {
      loadAllFlags();
      loadGraphValue();
      loadNotSolved();
    }, 100000);

    // Cleanup beim Verlassen der Komponente
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
    <h2 class="text-xl font-bold text-white">Solved Challenges</h2>
    <table class="w-full border-collapse border border-gray-700 mt-4 text-white">
        <thead>
            <tr class="bg-gray-800">
                <th class="border border-gray-700 px-4 py-2">Team</th>
                <th class="border border-gray-700 px-4 py-2">Challengename</th>
                <th class="border border-gray-700 px-4 py-2">Submission Time</th>

            </tr>
        </thead>
        <tbody>
            {#each (allFlags && allFlags.valid_flags) || [] as entry}
    <tr class="bg-gray-900 border-b border-gray-700">
        <td class="border border-gray-700 px-4 py-2">{entry.team_name}</td>
        <td class="border border-gray-700 px-4 py-2">{entry.challenge_name}</td>
        <td class="border border-gray-700 px-4 py-2">{entry.flag.submission_time}</td>
    </tr>
{/each}
        </tbody>
    </table>
</div>

<div class="px-8 py-4">
    <h2 class="text-xl font-bold text-white">Shared Challenges</h2>
    <table class="w-full border-collapse border border-gray-700 mt-4 text-white">
        <thead>
            <tr class="bg-gray-800">
                <th class="border border-gray-700 px-4 py-2">Team</th>
                <th class="border border-gray-700 px-4 py-2">Original Team</th>

                <th class="border border-gray-700 px-4 py-2">Challengename</th>
                <th class="border border-gray-700 px-4 py-2">Submission Time</th>
                <th class="border border-gray-700 px-4 py-2">Shared Flags Counter</th>

            </tr>
        </thead>
        <tbody>
            {#each (allFlags && allFlags.shared_flags) || [] as entry}
    <tr class="bg-gray-900 border-b border-gray-700">
        <td class="border border-gray-700 px-4 py-2">{entry.team_name}</td>
        <td class="border border-gray-700 px-4 py-2">{entry.original_team_name}</td>

        <td class="border border-gray-700 px-4 py-2">{entry.challenge_name}</td>
        <td class="border border-gray-700 px-4 py-2">{entry.flag.submission_time}</td>
        <td class="border border-gray-700 px-4 py-2">{entry.shared_flags}</td>

    </tr>
{/each}
        </tbody>
    </table>
</div>

<div class="px-8 py-4">
    <h2 class="text-xl font-bold text-white">Not solved Challenges</h2>
    <table class="w-full border-collapse border border-gray-700 mt-4 text-white">
        <thead>
            <tr class="bg-gray-800">
                <th class="border border-gray-700 px-4 py-2">UserID</th>
                <th class="border border-gray-700 px-4 py-2">Challenge Name</th>
                <th class="border border-gray-700 px-4 py-2">URL</th>
                <th class="border border-gray-700 px-4 py-2">Teamname</th>
                <th class="border border-gray-700 px-4 py-2">Aktionen</th>
            </tr>
        </thead>
        <tbody>
            {#each notSolved as entry}
                <tr class="bg-gray-900 border-b border-gray-700">
                    <td class="border border-gray-700 px-4 py-2">{entry.UserID}</td>
                    <td class="border border-gray-700 px-4 py-2">{entry.ChallengeName}</td>
                    <td class="border border-gray-700 px-4 py-2">
                        <a class="text-custom-200 border-2 border-custom-200 rounded-full px-2 py-1 text-base w-1/3 text-center" href="{entry.URL}" target="_blank">Open Challenge</a>
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
