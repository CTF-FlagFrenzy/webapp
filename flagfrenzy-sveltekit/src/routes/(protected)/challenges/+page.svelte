<script>
  import { onMount, onDestroy } from 'svelte';
  import Card from '$lib/components/card.svelte';

  let challengesByCategory = {}; // Object to hold challenges grouped by category
  let error = null;
  let interval;

  async function loadChallenges() {
    try {
      const response = await fetch('/api/challenges');
      if (!response.ok) throw new Error("Failed to load challenges");

      // Set the categorized response directly to challengesByCategory
      challengesByCategory = await response.json();
    } catch (err) {
      error = err.message;
    }
  }
  onMount(() => {
    loadChallenges(); // Initial load

    // Start interval to refresh data
    interval = setInterval(loadChallenges, 10000); // Refresh every 60 seconds

    return () => {
      clearInterval(interval); // Clean up interval when component is destroyed
    };
  });

  onDestroy(() => {
    if (interval) clearInterval(interval); // Ensure interval is cleared
  });
</script>

{#each Object.keys(challengesByCategory) as category}
  <h1 class="text-custom-200 text-2xl font-serif font-bold pt-4 pl-4">{category}</h1>
  <div class="place-items-center gap-3.5 px-8 py-4 mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {#each challengesByCategory[category] as challenge}
      <Card challenge={challenge} />
    {/each}
  </div>
{/each}