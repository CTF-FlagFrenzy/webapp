<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let challengesByCategory = {}; // Object to hold challenges grouped by category
  let error = null;

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

  onMount(loadChallenges);
</script>

<div>
  <p>Challenges</p>
</div>

<div>
  <h1>Challenges List</h1>
  {#if error}
    <p class="error">{error}</p>
  {:else}
    {#each Object.keys(challengesByCategory) as category}
      <h2>{category}</h2>
      <table class="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Difficulty</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {#each challengesByCategory[category] as challenge}
            <tr>
              <td>{challenge.ChallengeName}</td>
              <td>{challenge.Categorie}</td>
              <td>{challenge.Difficulty}</td>
              <td>{challenge.Description}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/each}
  {/if}
</div>

<style>
  h2 {
    text-align: center;
  }
  .error {
    color: red;
    text-align: center;
  }
</style>
