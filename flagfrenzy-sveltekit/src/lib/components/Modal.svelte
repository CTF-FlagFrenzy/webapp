<script>
  import { createEventDispatcher } from 'svelte';
  import { onMount, onDestroy } from 'svelte';
  import { tick } from 'svelte'; // Import tick to ensure DOM updates are complete

  export let isOpen = false;
  export let data;
  let flagToSubmit;
  let hintUsed = false;
  export let user;
  let canSubmit;

  const dispatch = createEventDispatcher();

  function close() {
    dispatch('close');
  }

async function checkChainCondition() {
    console.log(data.Chain);
    if (!data.Chain) {
      canSubmit = true;
      console.log(canSubmit);
      return;
    }
    try {
        const teamResponse = await fetch(`/api/user_made_challenges/challenge?id=${user.TeamsID}&challenge_id=${data.Chain}`);
        if (teamResponse.ok) {
          const teamChallenge = await teamResponse.json();
          canSubmit = teamChallenge.solved;
        } else {
          canSubmit = false;
        }
    } catch (error) {
      console.error("Error checking chain condition:", error);
      canSubmit = false;
    }
  }

  $: if (isOpen) {
    // Call the function to check conditions when modal opens
    checkChainCondition();
  }

  async function hintCount() {
    if (hintUsed) {
      console.log("Hint already used for this modal session.");
      return;
    }
    
    try {
      const response = await fetch(`/api/challenges/hintcount?challenge_id=${data.ID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        }
      });
      
      if (!response.ok) {
        throw new Error("Hint wurde bereits benutzt.");
      }

      hintUsed = true;
      console.log("Hint used successfully.");
    } catch (error) {
      console.log(error.message || "Es ist ein Fehler aufgetreten.");
    }
  }

  async function startChallenge() {
    try {
      const response = await fetch("/api/user_made_challenges", {
        method: "POST",
        body: JSON.stringify({
          Challenges_ID: data.ID,
          User_ID: user.ID
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        }
      });
      checkChainCondition();
      if (!response.ok) {
        throw new Error("Challenge konnte nicht gestartet werden.");
      }
    } catch (error) {
      console.log(error.message || "Es ist ein unbekannter Fehler aufgetreten.");
    }
  }
  async function submitChallenge() {
    try {
      const response = await fetch(`/api/user_made_challenges?id=${user.ID}&challenge_id=${data.ID}`, {
        method: "PUT",
        body: JSON.stringify({
          Solved: 1
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        }
      });
    
      if (!response.ok) {
        throw new Error("Challenge konnte nicht gestartet werden.");
      }
    } catch (error) {
      console.log(error.message || "Es ist ein unbekannter Fehler aufgetreten.");
    }
  }
     async function SubmitButton() {
      try {
        const response = await fetch(`/api/submit_flag?id=${user.username}&challenge_id=${data.ID}`, {
          method: "GET",
          body: JSON.stringify({
            Solved: 1
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          }
        });

     async function SubmitButton() {
    try {
      const response = await fetch('/api/submit_flags', {
        method: "POST",
        body: JSON.stringify({
          id: user.username,
          challenge_id: data.ID,
          Solved: 1
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        }
      });

      if (!response.ok) {
        throw new Error("Flag konnte nicht eingereicht werden.");
      }
    } catch (error) {
      console.log(error.message || "Es ist ein unbekannter Fehler aufgetreten.");
    }
  }

        if (!response.ok) {
          throw new Error("Challenge konnte nicht gestartet werden. ");
        }
      } catch (error) {
        console.log(error.message || "Es ist ein unbekannter Fehler aufgetreten.");
      } 
    } 
</script>

{#if isOpen}
  <div class="fixed inset-0 bg-black bg-opacity-75 z-10" on:click={close} tabindex="0" role="button"></div>
  <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-lg z-20 max-h-3/5 max-w-2xl w-11/12 bg-custom-110 shadow-button-{data.Difficulty} text-white">
    <button class="absolute top-2.5 right-2.5 text-xl cursor-pointer bg-none" on:click={close}>✖</button>
    <div class="flex justify-between">
      <h2 class="text-3xl">{data.ChallengeName}</h2>
      <h3 class="text-2xl mr-4">Difficulty: <span class="text-{data.Difficulty}">{data.Difficulty}</span></h3>
    </div>
    <h3 class="text-2xl">Description:</h3>
    <p class="text-lg">{data.Description}</p>
    <h3 class="text-2xl">Hint:</h3>
    <p class="text-lg">{data.Hint1}</p>
    <p class="text-lg">{data.Hint2}</p>
    <p class="text-lg">{data.Hint3}</p>
    <div class="flex justify-between items-center mt-auto pt-4 border-t border-custom-200">
      <input class="bg-custom-100 border-2 border-custom-200 rounded-full px-2 py-1 text-base" type="text" bind:value={flagToSubmit} placeholder="Enter Flag">
      {#if canSubmit}
        <button 
            class="text-custom-200 border-2 border-custom-200 rounded-full px-2 py-1 text-base" 
            on:click={submitChallenge}>
            Submit
        </button>
      {:else}
        <p>Du musst zuerst die Challenge davor abschließen!</p>
      {/if}
      <button class="text-custom-200 border-2 border-custom-200 rounded-full px-2 py-1 text-base" on:click={startChallenge}>Start</button>
      <button class="text-custom-200 border-2 border-custom-200 rounded-full px-2 py-1 text-base" on:click={hintCount} disabled={hintUsed}>{hintUsed ? "Hint Used" : "Get Hint"}</button>
    </div>
  </div>
{/if}

<style lang="postcss">
  .shadow-button-Easy {
    @apply shadow-EasyShadow;
  }
  .shadow-button-Medium {
    @apply shadow-MediumShadow;
  }
  .shadow-button-Hard {
    @apply shadow-HardShadow;
  }
  .shadow-button-Expert {
    @apply shadow-ExpertShadow;
  }
  .shadow-button-Default {
    @apply shadow-DefaultShadow;
  }
</style>