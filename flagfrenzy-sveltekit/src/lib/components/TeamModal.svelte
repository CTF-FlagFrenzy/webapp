<script>
  import { createEventDispatcher, onMount } from 'svelte';
  
  export let isOpen = false;
  export let data;
  export let teamdata;
  let password = "";
  let refreshInterval;
  let errorMessage = "";

  const dispatch = createEventDispatcher();

  const deadline = new Date(2025, 2, 26, 12, 15); // 28. Februar 2025, 23:59 Uhr
  let isExpired = false;

  function close() {
    dispatch('close');
  }

  function checkExpiration() {
    const now = new Date();
    isExpired = now >= deadline;
  }

  async function joinTeam() {
    try {
      errorMessage = '';
      const response = await fetch(`/api/user/team?id=${data.username}`, {
        method: "PUT",
        body: JSON.stringify({
          Teamname: teamdata.Teamname,
          Password: password
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        }  
      });
      if (!response.ok) {
        throw new Error("Could not join team. Please check the password.");
      }
      password="";
      dispatch('teamDeleted');
      close();
    } catch (error) {
      errorMessage = error.message || "Es ist ein unbekannter Fehler aufgetreten.";
      password="";
    } 
  }

  async function deleteTeam() {
    try {
        const response = await fetch(`/api/teams?id=${teamdata.TeamsID}&userId=${data.username}&password=${password}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        });
        if (!response.ok) {
          throw new Error("Could not delete team. Please check the password.");
        }
        password="";
        dispatch('teamDeleted');
        close();
    } catch (error) {
      errorMessage = error.message || "Es ist ein unbekannter Fehler aufgetreten.";
      password="";
    }
  }
  async function leaveTeam() {
    try {
        const response = await fetch(`/api/user/leave?id=${data.username}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        });
        if (!response.ok) {
          throw new Error("Could not leave team. Please check the password.");
        }
        password="";
        dispatch('teamDeleted');
        close();
    } catch (error) {
      errorMessage = error.message || "Es ist ein unbekannter Fehler aufgetreten.";
      password="";
    }
  }

  $: if (isOpen) {
    errorMessage = "";
    refreshInterval = setInterval(() => {
    }, 5000);
  } else {
    clearInterval(refreshInterval);
  }

  $: {
    checkExpiration();
    isExpired = new Date() >= deadline; // Direkt setzen
  }

  onMount(() => {
    const interval = setInterval(() => {
      checkExpiration();
    }, 1000); // Alle 1 Sekunde überprüfen

    return () => clearInterval(interval);
  });
</script>

{#if isOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="fixed inset-0 bg-black bg-opacity-75 z-10" on:click={close} tabindex="0" role="button" ></div>
  <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-lg z-20 max-h-3/5 max-w-2xl w-11/12 bg-custom-110 card-Team text-white">
    <button class="absolute top-2.5 right-2.5 text-xl cursor-pointer bg-none" on:click={close}>✖</button>
    <div class="flex justify-between pb-4">
      <h2 class="text-3xl text-white w-[350px]">{teamdata.Teamname}</h2>
      <h3 class="text-2xl mr-4">Points: {teamdata.Points}</h3>
    </div>
    <table class="styled-table w-full mb-4 table-fixed">
      <thead class="text-custom-200 text-xl border-b border-custom-200">
        <tr>
          <th class="pl-4 text-left w-1/2">Name</th>
          <th class="pl-4 text-left w-1/2">Nickname</th>
        </tr>
      </thead>
      <tbody class="text-gray-400 text-base">
        {#each [...teamdata.Members].sort((a, b) => (a.ID === teamdata.TeamLeader ? -1 : b.ID === teamdata.TeamLeader ? 1 : 0)) as member}
          <tr class="border-b border-custom-100">
            {#if member.ID == teamdata.TeamLeader}
              <td class="pl-4 pt-2 align-top">{member.ID} <span class="text-custom-200 text-xl">&#x265B;</span></td> 
            {:else}
              <td class="pl-4 pt-2 align-top">{member.ID}</td>
            {/if}
            <td class="pl-4 pt-2 align-top">{member.Nickname}</td>
          </tr>
        {/each}
      </tbody>
    </table>
    {#if !isExpired}
      <div class="flex flex-row mt-4 justify-around pt-4 border-t border-custom-200">
        <form class="flex flex-row">
          {#if data.username == teamdata.TeamLeader}
            <input class="bg-custom-100 border-2 border-custom-200 rounded-2xl px-2 py-1 text-xl w-full" type="password" placeholder="Password" bind:value={password} required on:input={() => errorMessage = ""}>
            <button class="text-custom-200 border-2 border-custom-200 rounded-2xl px-2 py-1 text-xl w-1/3 ml-4" on:click={deleteTeam}>Delete</button>
          {:else if teamdata.Members.some(member => member.ID === data.username)}
            <input class="bg-custom-100 border-2 border-custom-200 rounded-2xl px-2 py-1 text-xl w-full invisible" type="password" placeholder="Password" bind:value={password} required on:input={() => errorMessage = ""}>
            <button class="text-custom-200 border-2 border-custom-200 rounded-2xl px-2 py-1 text-xl w-1/3 ml-4" type="submit" on:click={leaveTeam}>Leave</button>
          {:else if teamdata.Members.length < 4}
            <input class="bg-custom-100 border-2 border-custom-200 rounded-2xl px-2 py-1 text-xl w-full" type="password" placeholder="Password" bind:value={password} required on:input={() => errorMessage = ""}>
            <button class="text-custom-200 border-2 border-custom-200 rounded-2xl ml-4 px-2 py-1 text-xl w-1/3 text-center" type="submit" on:click={joinTeam}>Join</button>
          {/if}
        </form>
      </div>
      {#if errorMessage}
          <p class=" text-Hard text-lg font-bold">{errorMessage}</p>
      {/if}
    {/if}
  </div>
{/if}