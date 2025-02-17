<script>
  import { createEventDispatcher } from 'svelte';
  
  export let isOpen = false;
  export let teamname;
  export let data;
  let password;
  let error = null;
  let refreshInterval;
  let errorMessage;

  const dispatch = createEventDispatcher();

  function close() {
    dispatch('close');
  }

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
      await joinTeam()
      close()
    } catch (error) {
      errorMessage = error.message || "Es ist ein unbekannter Fehler aufgetreten.";
    } 
  }

  $: if (isOpen) {
    // checkChainCondition();

    refreshInterval = setInterval(() => {
      // checkIfStarted();
    }, 5000);
  } else {
    clearInterval(refreshInterval);
  }

</script>

{#if isOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="fixed inset-0 bg-black bg-opacity-75 z-10" on:click={close} tabindex="0" role="button" ></div>
  <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-lg z-20 max-h-3/5 max-w-2xl w-11/12 bg-custom-110 card-Default text-white">
    <button class="absolute top-2.5 right-2.5 text-xl cursor-pointer bg-none" on:click={close}>✖</button>
    <div class="flex justify-between pb-4">
      <h2 class="text-3xl">Create a Team</h2>
    </div>
    <div class="flex flex-col justify-center items-center">
        <form class="py-4">
          <input class="bg-custom-100 border-2 border-custom-200 rounded-2xl px-2 py-1 text-xl w-full" type="text" placeholder="Team name" bind:value={teamname} required>
          <input class="bg-custom-100 border-2 border-custom-200 rounded-2xl px-2 py-1 mt-2 text-xl w-full" type="password" placeholder="Password" bind:value={password} required>
        </form>
        <button class="text-custom-200 border-2 border-custom-200 rounded-2xl px-2 py-1 text-xl w-1/3 text-center" type="submit" on:click={addTeam}>Create</button>
        {#if errorMessage}
          <p class=" text-Hard text-lg font-bold">{errorMessage}</p>
        {/if}
    </div>
  </div>
{/if}