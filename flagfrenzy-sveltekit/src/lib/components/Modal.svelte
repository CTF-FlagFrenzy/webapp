<script>
  import { createEventDispatcher } from 'svelte';
  
  export let isOpen = false;
  export let data;

  const dispatch = createEventDispatcher();

  function close() {
    dispatch('close');
  }
</script>

{#if isOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="fixed inset-0 bg-black bg-opacity-75 z-10" on:click={close} tabindex="0" role="button" ></div>
  <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-lg z-20 max-w-sm w-11/12 bg-custom-110 shadow-{data.Difficulty}Shadow text-white">
    <button class="absolute top-2.5 right-2.5 text-xl cursor-pointer bg-none" on:click={close}>✖</button>
    <h2>{data.ChallengeName}</h2>
    <h3>Difficulty: <span class="text-{data.Difficulty}">{data.Difficulty}</span></h3>
    <h3>Description:</h3>
    <p>{data.Description}</p>
    <div class="center">
      <input type="text">
    </div>
  </div>
{/if}