<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let challenges = [];
  let error = null;

  async function loadChallenges() {
      const response = await fetch('/api/challenges');
      challenges = await response.json();

  }

  onMount(loadChallenges);

</script>
  
  <div>
  <p>Challenges</p>
  </div>
  <div>
    <h1>Challenges List</h1>
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
            {#each challenges as challenge}
                <tr>
                    <td>{challenge.ChallengeName}</td> 
                    <td>{challenge.Categorie}</td> 
                    <td>{challenge.Difficulty}</td> 
                    <td>{challenge.Description}</td> 
                   
                </tr>
            {/each}
        </tbody>
    </table>
</div>
  <style>
    h2 {
        text-align: center;
    }
  </style>