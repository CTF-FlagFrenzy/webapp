<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    let teamname, password = '';
    let teams, teamMembers, allMembers;
    let errorMessage, errorMessageTeams, errorMessageTeamMembers = '';

    export let data;

    async function joinTeam() {
      try {
        errorMessage = '';
        const response = await fetch(`/api/user/team?id=${data.username}`, {
          method: "PUT",
          body: JSON.stringify({
            Teamname: teamname,
            Password: password
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          }  
        });
        if (!response.ok) {
          throw new Error("Team konnte nicht beigetreten werden. Bitte überprüfe Teamname und Passwort.");
        }

        loadTeams();
        loadTeamMember();
  
      } catch (error) {
        errorMessage = error.message || "Es ist ein unbekannter Fehler aufgetreten.";
      } 
    } 
    async function addTeam() {
      try {
        errorMessage = '';
        const response = await fetch("/api/teams", {
          method: "POST",
          body: JSON.stringify({
            Teamname: teamname,
            Password: password,
            UserID: data.username
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          }
        });
        if (!response.ok) {
          throw new Error("Team konnte nicht erstellt werden. Bitte überprüfe den Teamname.");
        }
        joinTeam()
      } catch (error) {
        errorMessage = error.message || "Es ist ein unbekannter Fehler aufgetreten.";
      } 
    } 
    
  async function loadTeams() {
    try {
      errorMessageTeams, teams = '';
      const response = await fetch('/api/teams');
      if (!response.ok) throw new Error("Failed to load teams");

      teams = await response.json();
      console.log(teams);
    } catch (err) {
      errorMessageTeams = err.message;
    }
  }
  async function loadAllTeamMembers() {
    try {
      errorMessageTeams, teams = '';
      const response = await fetch('/api/teams/members/allmembers');
      if (!response.ok) throw new Error("Failed to load teammembers");

      allMembers = await response.json();
      console.log(teams);
    } catch (err) {
      errorMessageTeams = err.message;
    }
  }
  
  async function loadTeamMember() {
    try {
      errorMessageTeamMembers, teamMembers = '';
      const response = await fetch(`/api/teams/members?user_id=${data.username}`);
      if (!response.ok) throw new Error("Failed to load team members");

      teamMembers = await response.json();
      console.log(teamMembers)
    } catch (err) {
      errorMessageTeamMembers = err.message;
    }
  }
      async function deleteTeam() {
        try {
            const response = await fetch(`/api/teams?id=${teamMembers.TeamsID}&userId=${data.username}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
            });
            if (response.ok) {
                dispatch('deleteTeam');
                loadTeams();
                loadTeamMember();
            } 
        } catch (error) {
            console.log(error)
        }
    }

  onMount(() => {
    loadTeams();
    loadTeamMember();
    
    const interval = setInterval(() => {
      loadTeams();
      loadTeamMember();
    }, 100000);

    // Cleanup beim Verlassen der Komponente
    return () => clearInterval(interval);
  });

</script>

<h1 class="text-custom-200 text-2xl font-serif font-bold pt-4 px-4">Create or Join Team</h1>
<div class=" gap-7 px-4 mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
  <form class="py-4 gap-3.5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
    <input class="bg-custom-100 border-2 border-custom-200 rounded-2xl px-2 py-1 text-xl w-full" type="text" placeholder="Team name" bind:value={teamname} required>
    <input class="bg-custom-100 border-2 border-custom-200 rounded-2xl px-2 py-1 text-xl w-full" type="password" placeholder="Password" bind:value={password} required>
  </form>
  <div class="py-4 gap-3.5 flex">
    <button class="text-custom-200 border-2 border-custom-200 rounded-2xl px-2 py-1 text-xl w-1/3 md:w-1/5 lg:w-1/6" type="submit" on:click={addTeam}>Create</button>
    <button class="text-custom-200 border-2 border-custom-200 rounded-2xl px-2 py-1 text-xl w-1/3 md:w-1/5 lg:w-1/6" type="submit" on:click={joinTeam}>Join</button>
  </div>
  {#if errorMessage}
    <p class=" text-Hard text-lg font-bold col-span-2">{errorMessage}</p>
  {/if}
  <div class="">
    <div class="pb-4">
      <h1 class="text-custom-200 text-2xl font-serif font-bold py-1">Teams</h1>
    </div>
    <div class="h-80 max-h-80 overflow-y-auto hide-scrollbar bg-custom-110 w-full px-4 rounded-2xl shadow-BackdropShadow">
      {#if teams}
        <table class="styled-table w-full bg-custom-110 mt-4">
          <thead class="text-custom-200 text-xl sticky top-0 bg-custom-110 border-b z-10 border-custom-200">
            <tr>
              <th>Name</th>
              <th class="text-center">Strikes</th>
              <th class="text-center">Members</th>
            </tr>
          </thead>
          <tbody class="text-white text-sm">
            {#each teams as team}
              <tr class="border-b border-custom-100">
                <td class="pt-2 align-top">{team.Teamname}</td>
                <td class="pt-2 align-top text-center">
                  {#if team.Disabled}
                    ☠️
                  {:else if team.SharedFlag === 1}
                    ❌
                  {:else if team.SharedFlag === 2}
                    ❌❌
                  {:else}
                    -
                  {/if}
                </td>
                <td class="pt-2 align-top text-center">{team.Members}/4</td>
              </tr>
            {/each}
          </tbody>
        </table>
      {:else if errorMessageTeams}
        <p class=" text-Hard text-lg font-bold col-span-2">{errorMessageTeams}</p>
      {:else}
        <p>Loading teams data...</p>
      {/if}
    </div>
  </div>
  <div class="">
    {#if teamMembers}
      <div class="flex gap-3.5 pb-4">
        <h1 class="text-custom-200 text-2xl font-serif font-bold py-1">{teamMembers.Teamname}</h1>
        <button class="text-custom-200 border-2 border-custom-200 rounded-2xl px-2 py-1 text-xl w-1/3 md:w-1/5" on:click={() => {
          if (confirm("Bist du sicher, dass du das Team löschen möchtest? Diese Aktion kann nicht rückgängig gemacht werden.")) {
            deleteTeam();
          }
        }}>Delete Team</button>
      </div>
    {:else}
      <div class="pb-4">
        <h1 class="text-custom-200 text-2xl font-serif font-bold py-1">Join a Team</h1>
      </div>
    {/if}
    <div class="max-h-80 overflow-y-auto hide-scrollbar bg-custom-110 w-2/3 px-4 py-4 rounded-2xl shadow-BackdropShadow">
      {#if teamMembers}
        <table class="styled-table w-full">
          <thead class="text-custom-200 text-xl border-b border-custom-200">
            <tr>
              <th>Name</th>
              <th>Nickname</th>
            </tr>
          </thead>
          <tbody class="text-white text-sm">
            {#each teamMembers.Members as member}
              <tr class="border-b border-custom-100">
                <td class="pt-2 align-top">{member.ID}</td> 
                <td class="pt-2 align-top">{member.Nickname}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      {:else if errorMessageTeamMembers}
        <p class=" text-Hard text-lg font-bold col-span-2">{errorMessageTeamMembers}</p>
      {:else}
        <p>Loading Members data...</p>
      {/if}
    </div>
  </div>
</div>

<style>
  .hide-scrollbar::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge */
  }
</style>