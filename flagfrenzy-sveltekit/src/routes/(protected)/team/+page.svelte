<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    let teamname = '';
    let password = '';
    let teams;
    let teamMembers;
    export let data;
    async function joinTeam() {
      try {
        const response = await fetch(`/api/user/team?id=${data.username}`, {
          method: "PUT",
          body: JSON.stringify({
            Teamname: teamname,
            Password: password
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          }
        });
  
        console.log(response.text());
  
  
      } catch (error) {
        console.error("Fehler beim Fetchen:", error);
      } 
    } 
    async function addTeam() {
      try {
        const response = await fetch("/api/teams", {
          method: "POST",
          body: JSON.stringify({
            Teamname: teamname,
            Password: password
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          }
        });
        joinTeam()
        console.log(response);
  
  
      } catch (error) {
        console.error("Fehler beim Fetchen:", error);
      } 
    } 
    
  async function loadTeams() {
    try {
      const response = await fetch('/api/teams');
      if (!response.ok) throw new Error("Failed to load teams");

      teams = await response.json();
      console.log(teams)
    } catch (err) {
      error = err.message;
    }
  }
    async function loadTeamMember() {
    try {
      const response = await fetch(`/api/teams/members?user_id=${data.username}`);
      if (!response.ok) throw new Error("Failed to load teams");

      teamMembers = await response.json();
      console.log(teamMembers)
    } catch (err) {
      error = err.message;
    }
  }
      onMount(() => {
   loadTeams();
   loadTeamMember();
    
  });

</script>



<h1>Add New Team</h1>
<form on:submit|preventDefault={addTeam}>
    <label>
        Team name:
        <input type="text" bind:value={teamname} required>
    </label>
    <br>

    <label>
        Password:
        <input type="text" bind:value={password} required>
    </label>
    <br>
        <button type="submit">Join Team</button>

    </form>
  <div>
  <br>
  <h4>Teams</h4>
      {#if teams}
    <table class="styled-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {#each teams as team}
                    <tr>
                        <td>{team.ID}</td> 
                        <td>{team.Teamname}</td>
                
                    </tr>
                {/each}
            </tbody>
        </table>
          {:else}
    <p>Loading teams data...</p>
  {/if}
<br>
  <h4>TeamMembers <h4>
  {#if teamMembers}
    <table class="styled-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Nickname</th>
                </tr>
            </thead>
            <tbody>
                {#each teamMembers as member}
                    <tr>
                        <td>{member.ID}</td> 
                        <td>{member.Nickname}</td>
                
                    </tr>
                {/each}
            </tbody>
        </table>
          {:else}
    <p>Loading Members data...</p>
  {/if}
  </div>
  
  <style>
    h2 {
        text-align: center;
    }
    input {
      background: black
    }
  </style>