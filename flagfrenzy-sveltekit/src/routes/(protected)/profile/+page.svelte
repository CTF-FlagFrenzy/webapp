<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    export let data;
    let Avatar, Nickname = '';
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

      Avatar = userData.Avatar;
      Nickname = userData.Nickname;

    } catch (error) {
      console.error("Fehler beim Fetchen:", error);
    }
  }
    async function updateUser() {
      try {
        const response = await fetch(`/api/user?id=${data.username}`, {
          method: "PUT",
          body: JSON.stringify({
            Nickname: Nickname,
            Avatar: Avatar
      
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          }  
      
        });
        if (!response.ok) {
          throw new Error("Team konnte nicht beigetreten werden. Bitte überprüfe Teamname und Passwort.");
        }

  
      } catch (error) {
        console.log(error)
      } 
    } 
    onMount(async () => {
    await getUser(); 
  });
</script>

<p class="text-center">{data.username}, {data.email}, {data.givenname}, {data.surname}</p>


<form on:submit|preventDefault={updateUser}>
                    <label for="Nickname">Nickname:</label>
                    <input type="text" id="Nickname" bind:value={Nickname} />

                    <label for="Avatar">Avatar:</label>
                    <input type="text" id="Avatar" bind:value={Avatar} />

                    <button type="submit">Save</button>
                  
                </form>

<style>
input{
  color: black;
}
</style>