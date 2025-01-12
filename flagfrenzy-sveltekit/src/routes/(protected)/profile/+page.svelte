<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  export let data;
  let Avatar, Nickname = '';
  let avatars = [
      '/images/Hero.png',
      '/images/Hacker.png',
      '/images/Anonymous.png',
      '/images/Queen.png',
      '/images/Spy.png',
      '/images/Warrior.png'
  ];
  let currentIndex = 0;


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
      location.reload();
    } catch (error) {
      console.log(error)
    } 
  }
  
  function selectAvatar(index) {
    currentIndex = index;
    const fullPath = avatars[currentIndex];
    Avatar = fullPath.replace('/images/', '').replace('.png', '');
  }

  onMount(async () => {
    await getUser();
    if (Avatar) {
      const avatarPath = `/images/${Avatar}.png`;
      const foundIndex = avatars.indexOf(avatarPath);
      if (foundIndex !== -1) {
        currentIndex = foundIndex;
      }
    }
  });
</script>

<h1 class="text-custom-200 text-2xl font-serif font-bold pt-4 px-4">Profile Settings</h1>
<form on:submit|preventDefault={updateUser} class="px-4 pb-4">
  <div class="gap-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
    <div class="slideshow relative w-full flex items-center justify-center">
      <button type="button" class="absolute left-1 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70" on:click={() => selectAvatar((currentIndex - 1 + avatars.length) % avatars.length)}>&lt;</button>
      <img src={avatars[currentIndex]} alt="Avatar Vorschau" class=" w-full border-2 border-custom-200 rounded-2xl" />
      <button type="button" class="absolute right-1 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70" on:click={() => selectAvatar((currentIndex + 1) % avatars.length)}>&gt;</button>
    </div>
    <div>
      <h1 class="text-custom-200 text-2xl font-serif font-bold pb-4">Nickname</h1>
      <input class="bg-custom-100 border-2 border-custom-200 rounded-3xl px-2 py-1 text-xl text-white" type="text" placeholder="Enter Nickname" bind:value={Nickname} />
    </div>
  </div>
  <div class="flex justify-center pt-4">
    <button class="text-custom-200 border-2 border-custom-200 rounded-2xl px-2 py-1 text-2xl w-1/3 md:w-1/5 lg:w-1/6" type="submit">Save Changes</button>
  </div>
</form>