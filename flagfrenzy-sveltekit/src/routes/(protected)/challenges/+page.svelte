<script>
    import { onMount, onDestroy } from 'svelte';
    import Card from '$lib/components/card.svelte';
  
    let challengesByCategory = {}; // Object to hold challenges grouped by category
    let error = null;
    let interval;
    export let data;
    let user = {};
    let user_made_challenges = {};
    async function getUser() {
      try {
        const response = await fetch(`/api/user/details?id=${data.username}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP-Error! Status: ${response.status}`);
        }
  
        const userData = await response.json();
        console.log(userData); 
  
        user = userData;
  
      } catch (error) {
        console.error("Fehler beim Fetchen:", error);
      }
    }
  
    async function loadUsermadeChallenges() {
      try {
        const response = await fetch(`/api/user_made_challenges?id=${data.username}`);
        if (!response.ok) throw new Error("Failed to load user_made_challenges");
  
        user_made_challenges = await response.json();
      } catch (err) {
        error = err.message;
      }
    }
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
      getUser();
      loadChallenges(); // Initial load
      loadUsermadeChallenges();
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
        <Card challenge={challenge} user={user} />
      {/each}
    </div>
  {/each}