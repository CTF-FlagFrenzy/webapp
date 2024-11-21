<script>
  import { createEventDispatcher } from 'svelte';
  
  export let isOpen = false;
  export let data;
  let flagToSubmit;

  const dispatch = createEventDispatcher();

  function close() {
    dispatch('close');
  }
</script>

{#if isOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="fixed inset-0 bg-black bg-opacity-75 z-10" on:click={close} tabindex="0" role="button" ></div>
  <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-lg z-20 max-h-3/5 max-w-2xl w-11/12 bg-custom-110 shadow-button-{data.Difficulty} text-white">
    <button class="absolute top-2.5 right-2.5 text-xl cursor-pointer bg-none" on:click={close}>✖</button>
    <div class="flex justify-between">
      <h2 class="text-3xl">{data.ChallengeName}</h2>
      <h3 class="text-2xl mr-4">Difficulty: <span class="text-{data.Difficulty}">{data.Difficulty}</span></h3>
    </div>
    <h3 class="text-2xl">Description:</h3>
    <p class=" text-lg">{data.Description}</p>
    <h3 class="text-2xl">Hint:</h3>
    <p class=" text-lg">{data.Hint1}</p>
    <p class=" text-lg">{data.Hint2}</p>
    <p class=" text-lg">{data.Hint3}</p>
    <div class="flex justify-between items-center mt-auto pt-4 border-t border-custom-200">
      <input class="bg-custom-100 border-2 border-custom-200 rounded-full px-2 py-1 text-base" type="text" bind:value={flagToSubmit} placeholder="Enter Flag">
      <button class="text-custom-200 border-2 border-custom-200 rounded-full px-2 py-1 text-base">Submit</button>
      <button class="text-custom-200 border-2 border-custom-200 rounded-full px-2 py-1 text-base">Deploy</button>
      <button class="text-custom-200 border-2 border-custom-200 rounded-full px-2 py-1 text-base">Get Hint</button>
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