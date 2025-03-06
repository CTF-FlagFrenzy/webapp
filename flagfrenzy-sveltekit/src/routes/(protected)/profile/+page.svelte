<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  export let data;
  let Avatar, Nickname, Email, userID = '';
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
      console.log(userData);
      user = userData;
      Avatar = userData.Avatar;
      Nickname = userData.Nickname;
      Email = userData.Email;
      userID = userData.ID;

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

<h1 class="text-custom-200 text-4xl font-serif font-bold pt-4 px-4 text-center mb-4">Profile</h1>
<svg width="100%" height="100%" viewBox="0 0 200 120">
  <defs>
    <filter id="hard-shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#F35977" flood-opacity="1"/>
    </filter>
  </defs>

  <!-- Ellipse mit Schatten -->
  <ellipse cx="100" cy="50" rx="80" ry="40" fill="#151a22" transform="rotate(20, 100, 50)" filter="url(#hard-shadow)"/>

  <text x="50" y="20" font-size="8" font-weight="bold" fill="#F3CC59" text-anchor="middle">#1</text>
  <text x="50" y="27" font-size="6" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Cyber Cookies</text>

  <!-- Avatar-Bild perfekt in der Ellipse -->
  <foreignObject x="20" y="10" width="160" height="80">
    <div xmlns="http://www.w3.org/1999/xhtml" class="relative w-full h-full flex items-center justify-center">
      <img src="{avatars[currentIndex]}" alt="Avatar Vorschau" class="w-auto h-auto max-w-[80%] max-h-[80%] rounded-full"/>
      
      <!-- Links platzierter Button -->
      <button type="button" style="font-size: 6px;"
          class="absolute left-[50px] top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-[6px] h-[6px] flex items-center justify-center"
          on:click={() => selectAvatar((currentIndex - 1 + avatars.length) % avatars.length)}>
          &lt;
      </button>
      <!-- Rechts platzierter Button -->
      <button type="button" style="font-size: 6px;"
          class="absolute right-[50px] top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-[6px] h-[6px] flex items-center justify-center"
          on:click={() => selectAvatar((currentIndex + 1) % avatars.length)}>
          &gt;
      </button>
    </div>
  </foreignObject>

  <text x="155" y="5" font-size="4" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Nickname</text>
  <foreignObject x="140" y="6" width="30" height="6">
    <div xmlns="http://www.w3.org/1999/xhtml" class="w-full h-full flex items-center justify-center">
      <input type="text" class="bg-transparent text-white text-center border-[0.5px] border-white rounded-3xl w-auto h-auto outline-none" 
             style="font-size: 3px;" 
             placeholder="Enter Nickname" bind:value={Nickname} />
    </div>
  </foreignObject>

  <text x="35" y="80" font-size="4" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Email</text>
  <foreignObject x="20" y="81" width="40" height="6">
    <div xmlns="http://www.w3.org/1999/xhtml" class="w-full h-full flex items-center justify-center">
      <input type="text" class="bg-transparent text-white text-center border-[0.5px] border-white rounded-3xl w-full h-auto outline-none" 
             style="font-size: 3px;" 
            bind:value={Email} readonly />
    </div>
  </foreignObject>

  <text x="15" y="60" font-size="4" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Name & Class</text>
  <foreignObject x="0" y="61" width="40" height="6">
    <div xmlns="http://www.w3.org/1999/xhtml" class="w-full h-full flex items-center justify-center">
      <input type="text" class="bg-transparent text-white text-center border-[0.5px] border-white rounded-3xl w-full h-auto outline-none" 
             style="font-size: 3px;" 
            bind:value={userID} readonly />
    </div>
  </foreignObject>

  <!-- Punkte-Anzeige -->
  <text x="150" y="75" font-size="8" font-weight="bold" fill="#FFFFFF" >{user?.Points}</text>
</svg>

<form on:submit|preventDefault={updateUser} class="px-4 pb-4">
  <div class="gap-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
    <div class="flex flex-col justify-center items-center text-center h-full">
      <h1 class="text-custom-200 text-2xl font-serif font-bold pb-2">Nickname</h1>
      <input class="bg-custom-100 border-2 border-custom-200 rounded-3xl px-2 py-1 mb-4 text-xl text-white w-5/6 md:w-2/3 lg:w-3/6" type="text" placeholder="Enter Nickname" bind:value={Nickname} />

      <h1 class="text-custom-200 text-2xl font-serif font-bold pb-2">Name & Class</h1>
      <input class="bg-custom-100 border-2 border-custom-200 rounded-3xl px-2 py-1 mb-4 text-xl text-gray-400 w-5/6 md:w-2/3 lg:w-3/6" type="text" value={user?.ID} readonly />

      <h1 class="text-custom-200 text-2xl font-serif font-bold pb-2">Email</h1>
      <input class="bg-custom-100 border-2 border-custom-200 rounded-3xl px-2 py-1 mb-4 text-xl text-gray-400 w-5/6 md:w-2/3 lg:w-3/6" type="email" value={user?.Email} readonly />
      <button class="text-custom-200 border-2 border-custom-200 rounded-2xl px-2 py-1 text-2xl w-5/6 md:w-2/3 lg:w-3/6" type="submit">Save Changes</button>
    </div>
  </div>
</form>