<script>
  import { onMount } from 'svelte';
  import Card from '$lib/components/card.svelte';

  let challenges = [];
  let error = null;

  async function loadChallenges() {
    const response = await fetch('/api/challenges');
    challenges = await response.json();
  }
  onMount(loadChallenges);
</script>

<h1 class="text-custom-200 text-2xl font-serif font-bold pt-4 pl-4">OTHERS</h1>
<div class="place-items-center gap-3.5 px-8 py-4 mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {#each challenges as challenge}
      <Card challenge={challenge} />
  {/each}
</div>

<h1 class="text-custom-200 text-2xl font-serif font-bold pt-4 pl-4">STEGO</h1>
<div class="place-items-center gap-3.5 px-8 py-4 mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {#each challenges as challenge}
      <Card challenge={challenge} />
  {/each}
</div>