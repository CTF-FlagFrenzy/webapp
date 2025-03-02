<script>
  import { onMount } from 'svelte';
  import Footer from '$lib/components/Footer.svelte';
  import "../../app.css";
  import { page } from '$app/stores';
  import { fade, slide } from 'svelte/transition';

  $: currentPath = $page.url.pathname;
  let isOpen = false;
  let isOpen2 = false;
  export let data;
  let user;

  function toggleMenu() {
    isOpen = !isOpen;
  }
  function toggleMenu2() {
    isOpen2 = !isOpen2;
  }

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

    } catch (error) {
      console.error("Fehler beim Fetchen:", error);
    }
  }

  async function addUser() {
      try {
        const response = await fetch("/api/user/", {
          method: "POST",
          body: JSON.stringify({
            name: data.username,
            email: data.email,
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          }
        });
      } catch (error) {
        console.error("Fehler beim Fetchen:", error);
      } 
    } 

    onMount(async () => {
    await addUser(); 
    await getUser(); 
  });
</script>
  
<body class="bg-custom-100 h-auto text-white">
  <header class="bg-custom-110 text-custom-200 flex justify-between items-center p-4 z-40 shadow-BackdropShadow4 mb-1">
    <a href="/" on:click={() => (isOpen2 = false)}>
      <img alt="The project logo" src={'/images/logo.png'} class="w-60 h-auto object-contain" />
    </a>
    <nav class="hidden lg:flex gap-8 text-3xl">
      <a href="/challenges" on:click={() => (isOpen2 = false)} class:active-tab={currentPath === '/challenges'}>Challenges</a>
      <a href="/scoreboard" on:click={() => (isOpen2 = false)} class:active-tab={currentPath === '/scoreboard'}>Scoreboard</a>
      <a href="/team" on:click={() => (isOpen2 = false)} class:active-tab={currentPath === '/team'}>Team</a>
    </nav>
    {#if user}
      <button class="hidden lg:block text-custom-200 border-2 border-custom-200 rounded-full px-8 py-2 avatar-{user.Avatar} bg-no-repeat bg-center bg-cover w-16 h-16 mx-4" on:click={toggleMenu2}></button>
    {:else}
      <p>Loading user data...</p>
    {/if}
    <button on:click={toggleMenu} class="lg:hidden text-custom-200 focus:outline-none text-3xl">{isOpen ? '✖' : '☰'}</button>
  </header>
  {#if isOpen2}
    <nav class="hidden absolute right-0 items-center bg-custom-110 text-custom-200 p-4 z-10 space-y-4 md:block rounded-bl-lg shadow-BackdropShadow3">
      <a href="/profile" class="block text-2xl text-center" on:click={() => (isOpen2 = false)} class:active-tab={currentPath === '/profile'}>Profile</a>
      {#if data.adminUser && data.adminUser.includes(user.ID)}
        <a href="/admin" class="block text-2xl text-center" on:click={() => (isOpen2 = false)} class:active-tab={currentPath === '/admin'}>Admin</a>
      {/if}
      <button class="text-custom-200 px-4 pb-2 text-2xl block w-full text-center" on:click={()=>window.location.href="/logout"}>Logout</button>
    </nav>
  {/if}
  
  {#if isOpen}
  <div class="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
  <nav transition:fade={{ duration: 300 }} class="text-2xl fixed inset-0 z-50 flex flex-col items-center justify-center bg-custom-100 text-custom-200 p-4 space-y-4 lg:hidden">
    <button on:click={toggleMenu} class="fixed top-4 right-4 lg:hidden text-custom-200 focus:outline-none text-3xl z-60">✖</button>

    <a href="/" on:click={() => (isOpen = false)} class:active-tab={currentPath === '/'}>Home</a>
    <a href="/challenges" on:click={() => (isOpen = false)} class:active-tab={currentPath === '/challenges'}>Challenges</a>
    <a href="/scoreboard" on:click={() => (isOpen = false)} class:active-tab={currentPath === '/scoreboard'}>Scoreboard</a>
    <a href="/team" on:click={() => (isOpen = false)} class:active-tab={currentPath === '/team'}>Team</a>
    <a href="/profile" on:click={() => (isOpen = false)} class:active-tab={currentPath === '/profile'}>Profile</a>
    
    {#if data.adminUser && data.adminUser.includes(user.ID)}
      <a href="/admin" on:click={() => (isOpen = false)} class:active-tab={currentPath === '/admin'}>Admin</a>
    {/if}
    
    <a href="/logout" on:click={() => (isOpen = false)} class:active-tab={currentPath === '/logout'}>Logout</a>
  </nav>
{/if}

  <main class="h-auto text-white">
    <slot />
  </main>
  
  <Footer />
</body>
<style>
  .active-tab {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
</style>