<script>
  import { onMount } from 'svelte';
  import Logo from '$lib/images/logo.png';
  import Footer from '$lib/components/Footer.svelte';
  import "../../app.css";
  let isOpen = false;
  export let data;

  function toggleMenu() {
    isOpen = !isOpen;
  }
  async function addEvent() {
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
  
        console.log(response);
  
       
      } catch (error) {
        console.error("Fehler beim Fetchen:", error);
      } 
    } 

    onMount(() => {
    addEvent();
  });
</script>
  
<body class="bg-custom-100 h-auto text-white">
  <header class="bg-custom-110 text-custom-200 shadow-lg flex justify-between items-center p-4">
    <a href="/" >
      <img alt="The project logo" src={Logo} class="w-60 h-auto object-contain" />
    </a>
  
    <nav class="hidden md:flex gap-8 text-3xl">
      <a href="/challenges">Challenges</a>
      <a href="/scoreboard">Scoreboard</a>
      <a href="/team">Team</a>
    </nav>
    <button class="hidden md:block text-custom-200 border-2 border-custom-200 rounded-full px-4 py-2 text-lg"on:click={()=>window.location.href="/logout"}>Logout</button>

    <button on:click={toggleMenu} class="md:hidden text-custom-200 focus:outline-none text-3xl">{isOpen ? '✖' : '☰'}</button>
  </header>
  
  {#if isOpen}
    <nav class="flex flex-col items-center bg-custom-110 text-custom-200 p-4 space-y-4 md:hidden">
      <a href="/challenges" on:click={() => (isOpen = false)}>Challenges</a>
      <a href="/scoreboard" on:click={() => (isOpen = false)}>Scoreboard</a>
      <a href="/team" on:click={() => (isOpen = false)}>Team</a>
      <button class="text-custom-200 border-2 border-custom-200 rounded-full px-4 py-2 text-lg co"on:click={()=>window.location.href="/logout"}>Logout</button>
    </nav>
  {/if}

  <main class="h-auto">
    <slot />
  </main>
  
  <Footer />
</body>