<script>
  import { onMount, tick } from 'svelte';
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
  let shadow, color;


  async function getUser() {
    try {
      const response = await fetch(`/api/user/details?id=${data.username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "x-sveltekit-fetch": "true"
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP-Error! Status: ${response.status}`);
      }

      const userData = await response.json();
      console.log(userData);
      user = userData;
      Avatar = userData.user.Avatar;
      Nickname = userData.user.Nickname;
      Email = userData.user.Email;
      userID = userData.user.ID.split(",")[0];

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
          "x-sveltekit-fetch": "true" 

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

  function getShadowFilter() {
    if(Avatar == "Hero") {
      shadow = 'purple-shadow';
    } else if(Avatar == "Hacker") {
      shadow = 'orange-shadow';
    } else if(Avatar == "Queen") {
      shadow = 'purple-shadow';
    } else if(Avatar == "Anonymous") {
      shadow = 'green-shadow';
    } else if(Avatar == "Spy") {
      shadow = 'red-shadow';
    } else if(Avatar == "Warrior") {
      shadow = 'white-shadow';
    }
  }
  function getAvatarColor() {
    if(Avatar == "Hero") {
      color = '#B259F3';
    } else if(Avatar == "Hacker") {
      color = '#FF962E';
    } else if(Avatar == "Queen") {
      color = '#B259F3';
    } else if(Avatar == "Anonymous") {
      color = '#59F359';
    } else if(Avatar == "Spy") {
      color = '#F35977';
    } else if(Avatar == "Warrior") {
      color = '#A5A2A2';
    }else {
      color = '#FFFFFF';
    }
  }

  function getColor(placement) {
    if (placement === 1) return "#F3CC59";
    if (placement === 2) return "#D2EAFE";
    if (placement === 3) return "#A87A00";
    return "#FFFFFF";
  }

  function splitText(text, maxLength) {
    if (!text) return [];

    let words = text.split(" ");
    let lines = [];
    let currentLine = "";

    for (let word of words) {
      if ((currentLine + " " + word).trim().length > maxLength) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine += (currentLine.length > 0 ? " " : "") + word;
      }
    }
    if (currentLine.length > 0) {
      lines.push(currentLine);
    }
    return lines;
  }

  onMount(async () => {
    await getUser();
    if (Avatar) {
      const avatarPath = `/images/${Avatar}.png`;
      const foundIndex = avatars.indexOf(avatarPath);
      if (foundIndex !== -1) {
        currentIndex = foundIndex;
      }
      getShadowFilter();
      getAvatarColor();
    }
  });
</script>

<div class="flex flex-col justify-center items-center text-center mt-4">
  <svg width="95%" height="100%" viewBox="0 0 200 120" class="md:mx-4">
    <defs>
      <filter id="red-shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#F35977" flood-opacity="1"/>
      </filter>
      <filter id="green-shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#59F359" flood-opacity="1"/>
      </filter>
      <filter id="purple-shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#B259F3" flood-opacity="1"/>
      </filter>
      <filter id="orange-shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#FF962E" flood-opacity="1"/>
      </filter>
      <filter id="white-shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#A5A2A2" flood-opacity="1"/>
      </filter>
    </defs>

    <!-- Ellipse with shadow -->
    <ellipse cx="100" cy="50" rx="80" ry="40" fill="#151a22" transform="rotate(20, 100, 50)" filter="url(#{shadow})"/>
    <!-- Teamname and Place -->
    <text x="50" y="20" font-size="7" font-weight="bold" fill={getColor(user?.team_placement)} text-anchor="middle" class="fonts-test">#{user?.team_placement ?? ' -'}</text>
    <text x="50" y="27" font-size="6" font-weight="bold" fill="#9ca3af" text-anchor="middle" class="fonts-test">
      {#each splitText(user?.team_name ?? '-', 23) as line, i}
        <tspan x="50" dy="{i * 7}">{line}</tspan>
      {/each}
    </text>

    <!-- Avatar-Bild perfekt in der Ellipse -->
    <foreignObject x="20" y="10" width="160" height="80">
      <div xmlns="http://www.w3.org/1999/xhtml" class="relative w-full h-full flex items-center justify-center">
        <img src="{avatars[currentIndex]}" alt="Avatar Vorschau" class="w-auto h-auto max-w-[80%] max-h-[80%] rounded-full"/>
        
        <!-- Left Button -->
        <button type="button" style="font-size: 4px;"
            class="absolute left-[50px] top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-[6px] h-[6px] flex items-center justify-center"
            on:click={() => selectAvatar((currentIndex - 1 + avatars.length) % avatars.length)}>
            &lt;
        </button>
        <!-- Right Button -->
        <button type="button" style="font-size: 4px;"
            class="absolute right-[50px] top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-[6px] h-[6px] flex items-center justify-center"
            on:click={() => selectAvatar((currentIndex + 1) % avatars.length)}>
            &gt;
        </button>
      </div>
    </foreignObject>

    <!-- Nickname -->
    <text x="172" y="14" font-size="4" font-weight="bold" fill="#ffffff" text-anchor="middle" class="hidden md:block">Nickname</text>
    <foreignObject x="145" y="15" width="54" height="6">
      <div xmlns="http://www.w3.org/1999/xhtml" class="w-full h-full items-center justify-center hidden md:flex">
        <input type="text" class="bg-transparent text-white text-center font-normal w-full h-auto outline-none" 
              style="font-size: 3.5px;"
              placeholder="Enter Nickname" bind:value={Nickname} maxlength="30"/>
      </div>
    </foreignObject>
    <!-- Name -->
    <text x="25" y="71" font-size="4" font-weight="700" font-family="Roboto" fill="#9ca3af" text-anchor="middle" class="hidden md:block">Name</text>
    <text x="25" y="75" font-size="3.5" font-weight="400" font-family="Roboto" fill="#9ca3af" text-anchor="middle" class="hidden md:block">{userID}</text>
    <!-- Email -->
    <text x="35" y="90" font-size="4" font-weight="700" fill="#9ca3af" text-anchor="middle" class="hidden md:block">Email</text>
    <text x="35" y="94" font-size="3.5" font-weight="400" font-family="Roboto" fill="#9ca3af" text-anchor="middle" class="hidden md:block">{Email}</text>
    <!-- Points -->
    <text x="140" y="75" font-size="8" font-weight="bold" fill="#9ca3af" class="fonts-test">{user?.team_points ?? '-'}</text>

    <foreignObject x="85" y="100" width="30" height="10">
      <div xmlns="http://www.w3.org/1999/xhtml" class="w-full h-full items-center justify-center hidden md:flex">
        <button class="text-white border-[0.5px] rounded-2xl pt-[1px] text-[3.5px] font-normal w-full text-center" type="submit" on:click={updateUser} style="border-color: {color};">Save Changes</button>
      </div>
    </foreignObject>
  </svg>
</div>
<form on:submit|preventDefault={updateUser} class="px-4 pb-4">
  <div class="gap-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1">
    <div class="flex flex-col justify-center items-center text-center h-full">
      <h1 class="text-white text-2xl pb-2 font-bold md:hidden">Nickname</h1>
      <input class="bg-custom-100 border-2 border-custom-200 rounded-3xl px-2 py-1 mb-4 text-xl text-white w-5/6 md:w-2/3 lg:w-3/6 md:hidden" type="text" placeholder="Enter Nickname" bind:value={Nickname} maxlength="30"/>

      <h1 class="text-white text-2xl font-bold pb-2 md:hidden">Name</h1>
      <input class="bg-custom-100 border-2 border-custom-200 rounded-3xl px-2 py-1 mb-4 text-xl font-normal text-gray-400 w-5/6 md:w-2/3 lg:w-3/6 md:hidden" type="text" value={userID} readonly />

      <h1 class="text-white text-2xl font-bold pb-2 md:hidden">Email</h1>
      <input class="bg-custom-100 border-2 border-custom-200 rounded-3xl px-2 py-1 mb-4 text-xl text-gray-400 w-5/6 md:w-2/3 lg:w-3/6 md:hidden" type="email" value={Email} readonly />
      <button class="text-custom-200 border-2 border-custom-200 rounded-2xl px-2 py-1 text-2xl w-5/6 md:w-2/3 lg:w-3/6 md:hidden" type="submit">Save Changes</button>
    </div>
  </div>
</form>

<style>
  .fonts-test{
    font-family: "Caveat", cursive;
  }
</style>