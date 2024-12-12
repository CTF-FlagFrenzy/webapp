<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    let teamname = '';
    let password = '';
    export let data;
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
  
        console.log(response);
  
  
      } catch (error) {
        console.error("Fehler beim Fetchen:", error);
      } 
    } 
    async function joinTeam() {
      try {
        const response = await fetch("/api/user/team?id=${data.username}", {
          method: "PUT",
          body: JSON.stringify({
            Teamname: teamname,
            Password: password
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          }
        });
  
        console.log(response);
  
  
      } catch (error) {
        console.error("Fehler beim Fetchen:", error);
      } 
    } 


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
        <button type="submit">Add Team</button>

    </form>
  <div>
  <p>Team</p>
  </div>
  
  <style>
    h2 {
        text-align: center;
    }
    input {
      background: black
    }
  </style>