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
    <h1>OTHERS</h1>
</div>
{#each Object.keys(challengesByCategory) as category}
<h2>{category}</h2>
{#each challengesByCategory[category] as challenge}
    <div class="card">
        <h2>{challenge.ChallengeName}</h2>
        <h3>Difficulty:</h3>
        <p>{challenge.Difficulty}</p>
        <h3>Description:</h3>
        <p>{challenge.Description}</p>
    </div>
{/each}
{/each}
  <style>
    h1 {
        color: #F3CC59;
        font-size: 30px;
        padding-left: 1em;
        font-family: 'STIX Two Text', serif;
        font-weight: 700;
    }
    .card {
        background-color: #40424B;
        color:white;
        width: 20em
    }
  </style>

