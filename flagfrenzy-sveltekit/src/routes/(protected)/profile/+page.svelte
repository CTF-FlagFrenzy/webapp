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
  let user;


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
      user = userData;
      console.log(user);
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

<h1 class="text-custom-200 text-2xl font-serif font-bold pt-4 px-4 text-center">Profile Settings</h1>
<form on:submit|preventDefault={updateUser} class="px-4 pb-4">
  <div class="gap-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
    <div class="relative w-full flex justify-center">
      <div class="relative w-4/5">
        <img src={avatars[currentIndex]} alt="Avatar Vorschau" class="w-full border-2 border-custom-200 rounded-2xl" />
        <button type="button"
          class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70"
          on:click={() => selectAvatar((currentIndex - 1 + avatars.length) % avatars.length)}>
          &lt;
        </button>
        <button type="button"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70"
          on:click={() => selectAvatar((currentIndex + 1) % avatars.length)}>
          &gt;
        </button>
      </div>
    </div>
    <div class="flex flex-col justify-center items-center text-center h-full">
      <h1 class="text-custom-200 text-2xl font-serif font-bold pb-2">Nickname</h1>
      <input class="bg-custom-100 border-2 border-custom-200 rounded-3xl px-2 py-1 mb-4 text-xl text-white w-5/6 md:w-2/3 lg:w-3/6" type="text" placeholder="Enter Nickname" bind:value={Nickname} />

      <h1 class="text-custom-200 text-2xl font-serif font-bold pb-2">Name & Class</h1>
      <input class="bg-custom-100 border-2 border-custom-200 rounded-3xl px-2 py-1 mb-4 text-xl text-gray-400 w-5/6 md:w-2/3 lg:w-3/6" type="text" value={user?.ID} readonly />

      <h1 class="text-custom-200 text-2xl font-serif font-bold pb-2">Email</h1>
      <input class="bg-custom-100 border-2 border-custom-200 rounded-3xl px-2 py-1 mb-4 text-xl text-gray-400 w-5/6 md:w-2/3 lg:w-3/6" type="email" value={user?.Email} readonly />

      <h1 class="text-custom-200 text-2xl font-serif font-bold pb-2">Points</h1>
      <input class="bg-custom-100 border-2 border-custom-200 rounded-3xl px-2 py-1 mb-8 text-xl text-gray-400 w-5/6 md:w-2/3 lg:w-3/6" type="text" value={user?.Points} readonly />

      <button class="text-custom-200 border-2 border-custom-200 rounded-2xl px-2 py-1 text-2xl w-5/6 md:w-2/3 lg:w-3/6" type="submit">Save Changes</button>
    </div>
  </div>
</form>