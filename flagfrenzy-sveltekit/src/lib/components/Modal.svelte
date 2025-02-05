<script>
  import { createEventDispatcher } from 'svelte';
  
  
  export let isOpen = false;
  export let data;
  let flagToSubmit;
  export let user;
  let hints = {};
  let canSubmit;
  let allFlags;
  let flagStatus;
  let submitFailed = false;

  const dispatch = createEventDispatcher();

  function close() {
    dispatch('close');
  }
  async function loadHints() {
      try {
        const response = await fetch(`/api/challenges/hints?id=${data.ID}`);
        if (!response.ok) throw new Error("Failed to load challenges");
  
        
        hints = await response.json();
        console.log(hints);
      } catch (err) {
        error = err.message;
      }
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
    loadHints(); 
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
    let solved = 0;
    if (flagStatus.status === "successful") {
      solved = 1;
      close();
      submitFailed = false;
    } else {
      flagToSubmit = "";
      submitFailed = true;
    }
    try {
      const response = await fetch(`/api/user_made_challenges?id=${user.ID}&challenge_id=${data.ID}`, {
        method: "PUT",
        body: JSON.stringify({
          Solved: solved
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
     async function loadFlags() {
      try {
        const response = await fetch(`/api/anti-cheat`, {
          method: "GET",
      
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          }
     });
    allFlags = await response.json();
    console.log(allFlags);
      if (!response.ok) {
        throw new Error("Flags konnten nicht geladen werden.");
      }
    } catch (error) {
      console.log(error.message || "Es ist ein unbekannter Fehler aufgetreten.");
    }
  }

 async function submitButton() {
    try {
      const response = await fetch("/api/anti-cheat", {
        method: "POST",
        body: JSON.stringify({
          ChallengeID: data.ID,
          UserID: user.ID,
          Flag: flagToSubmit
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        }
      });
      flagStatus = await response.json();
      console.log(flagStatus);
      if (!response.ok) {
        throw new Error("Flag konnte nicht abgegeben werden.");
      }
      submitChallenge();
    } catch (error) {
      console.log(error.message || "Es ist ein unbekannter Fehler aufgetreten.");
    }
  }

  async function submit() {
    if (data.IsStatic) {
      submitStatic();
    } else {
      submitButton();
    }
  }

  async function submitStatic() {
    try {
      const response = await fetch("/api/anti-cheat/static_flags", {
        method: "POST",
        body: JSON.stringify({
          ChallengeID: data.ID, 
          user_id: user.ID,
          Flag: flagToSubmit
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        }
      });
      flagStatus = await response.json();
      console.log(flagStatus);
      if (!response.ok) {
        throw new Error(".");
      }
      submitChallenge();
    } catch (error) {
      console.log(error.message || "Es ist ein unbekannter Fehler aufgetreten.");
    }
  }

  function colorPicker(difficulty) {
    if(data.Solved) {
      return 'Default';
    } else {
      return difficulty;
    }}
  
  async function updatePoints() {
    try {
      const response = await fetch("/api/user/points", {
        method: "PUT",
        body: JSON.stringify({
          UserID: user.ID,
          Points: data.Points
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        }
      });
      console.log( await response.json())

      if (!response.ok) {
        throw new Error(".");
      }
    } catch (error) {
      console.log(error.message || "Es ist ein unbekannter Fehler aufgetreten.");

    }
  }
</script>

{#if isOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="fixed inset-0 bg-black bg-opacity-75 z-10" on:click={close} tabindex="0" role="button" ></div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="fixed inset-0 bg-black bg-opacity-75 z-10" on:click={close} tabindex="0" role="button" ></div>
  <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-lg z-20 max-h-3/5 max-w-2xl w-11/12 bg-custom-110 card-{submitFailed ? 'Hard' : colorPicker(data.Difficulty)} text-white">
    <button class="absolute top-2.5 right-2.5 text-xl cursor-pointer bg-none" on:click={close}>✖</button>
    <div class="flex justify-between pb-4">
      <h2 class="text-3xl" class:text-EasyPastel={data.Difficulty === 'Easy'}
      class:text-Medium={data.Difficulty === 'Medium'}
      class:text-Hard={data.Difficulty === 'Hard'}
      class:text-Expert={data.Difficulty === 'Expert'}>{data.ChallengeName}</h2>
      <h3 class="text-2xl mr-4">Difficulty: <span class:text-Easy={data.Difficulty === 'Easy'}
        class:text-Medium={data.Difficulty === 'Medium'}
        class:text-Hard={data.Difficulty === 'Hard'}
        class:text-Expert={data.Difficulty === 'Expert'}>{data.Difficulty}</span></h3>
    </div>
    <h3 class="text-2xl">Description:</h3>
    <p class=" text-gray-400 pb-2">{data.Description}</p>
    <h3 class="text-2xl pt-2 border-t border-custom-200">Hint:</h3>
    <p class="text-lg">{hints.Hint1}</p>
    <p class="text-lg">{hints.Hint2}</p>
    <p class="text-lg pb-2">{hints.Hint3}</p>
    <div class="flex justify-between items-center gap-2 mt-auto pt-4 border-t border-custom-200">

      {#if data.Solved}
        <div class="flex justify-center items-center w-full">
          <p class="text-custom-200 text-xl">Solved</p>
        </div>
      {:else}
        <input class="bg-custom-100 border-2 w-2/3 rounded-full px-2 py-1 text-base transition-all duration-300 outline-none {submitFailed ? 'border-red-500' : 'border-custom-200'}" type="text" bind:value={flagToSubmit} placeholder='Enter Flag: FF&#123;...&#125;' on:input={() => submitFailed = false} on:keydown={(event) => { if (event.key === 'Enter') submit(); }}>
        <button class="text-custom-200 border-2 border-custom-200 rounded-full px-2 py-1 text-base w-1/3" on:click={submit}>Submit</button>
        <button class="text-custom-200 border-2 border-custom-200 rounded-full px-2 py-1 text-base w-1/3" on:click={startChallenge}>Start</button>
      {/if}
    </div>
  </div>
{/if}

<style lang="postcss">
</style>