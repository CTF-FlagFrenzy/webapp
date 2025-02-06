<script>
  import { onMount, onDestroy } from 'svelte';
  import Card from '$lib/components/card.svelte';
  
  let challenges = {};
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
      const response = await fetch(`/api/user_made_challenges?id=${user.TeamsID}`);
      if (!response.ok) throw new Error("Failed to load user_made_challenges");

      user_made_challenges = await response.json();
      console.log(user_made_challenges)
    } catch (err) {
      error = err.message;
    }
  }
  async function loadChallenges() {
    try {
      const response = await fetch(`/api/challenges?id=${user.TeamsID}`);
      if (!response.ok) throw new Error("Failed to load challenges");

      const rawChallengesByCategory = await response.json();
      console.log(rawChallengesByCategory);

      // Map to track solved challenges by ID
      const solvedMap = {};
      Object.values(rawChallengesByCategory).flat().forEach(challenge => {
          solvedMap[challenge.ID] = challenge.Solved;
      });

      // Filter challenges based on `Chain` and `Solved` status
      challengesByCategory = {};
      for (const [category, challenges] of Object.entries(rawChallengesByCategory)) {
        challengesByCategory[category] = challenges.filter(challenge => {
          return (
            challenge.Chain === null || challenge.Chain === 0 ||
            (challenge.Chain in solvedMap && solvedMap[challenge.Chain]) // Dependency solved
          );
        });
      }
    } catch (err) {
      error = err.message;
    }
  }
  onMount(async () => {
    await getUser();
    loadChallenges(); // Initial load
    loadUsermadeChallenges();
    // Start interval to refresh data
    interval = setInterval(loadChallenges, 10000); // Refresh every 10 seconds

    return () => {
      clearInterval(interval); // Clean up interval when component is destroyed
    };
  });

  onDestroy(() => {
    if (interval) clearInterval(interval); // Ensure interval is cleared
  });
</script>
<div class="pt-8 w-full">
  {#each Object.keys(challengesByCategory) as category}
    <h1 class="text-whita text-5xl font-serif font-bold pt-4 pl-8 text-center">{category}</h1>
    
    <div class="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 w-full px-8 relative">
      <hr class="border-t-2 border-custom-200 opacity-80 my-4 sm:col-start-1 sm:col-end-3 sm:w-1/2 sm:mx-auto md:col-start-2 md:col-end-[-2] md:w-full">
    </div>

    <div class="place-items-center gap-3.5 px-8 py-4 mb-4 grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
      {#each challengesByCategory[category] as challenge}
        <div class="col-span-2">
          <Card challenge={challenge} user={user} />
        </div>
      {/each}
    </div>
  {/each}
</div>