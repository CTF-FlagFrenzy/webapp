<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  onMount(() => {
      interval = setInterval(nextSlide, 10000);
      return () => clearInterval(interval);
  });
</script>
<h1 class="text-white text-4xl font-bold pt-4 px-4 text-center mb-4">About Us</h1>
<div class=" w-full">
  <div class="col-span-1 flex items-center justify-center h-80 w-full">
    <img alt="Project logo" src={'/images/3_banken_bg.png'} class="w-full h-80" />
  </div>
  <div class="mb-14 mx-48 mt-8">
      <div class="mb-8">
        <div class="w-24 h-32 bg-white float-right ml-4"></div>
        <p class="text-justify">
          Dies ist ein Beispieltext, der um zwei Bilder fließt. Das erste Bild befindet sich in der oberen rechten Ecke, während das zweite Bild in der unteren linken Ecke ist. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non urna vitae massa dapibus congue.
          The battleground for all cybersecurity enthusiasts! Whether you're an experienced hacker or just beginning your journey into hacking, this platform is designed to challenge your skills, expand your technical knowledge, and push you to think like a true security professional.
          The battleground for all cybersecurity enthusiasts! Whether you're an experienced hacker or just beginning your journey into hacking, this platform is designed to challenge your skills, expand your technical knowledge, and push you to think like a true security.
        </p>
        <div class="w-24 h-32 bg-white float-left mr-4 mt-2"></div>
        <p class="text-justify">
          Dies ist ein Beispieltext, der um zwei Bilder fließt. Das erste Bild befindet sich in der oberen rechten Ecke, während das zweite Bild in der unteren linken Ecke ist. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non urna vitae massa dapibus congue.
          The battleground for all cybersecurity enthusiasts! Whether you're an experienced hacker or just beginning your journey into hacking, this platform is designed to challenge your skills, expand your.
        </p>
      </div>
      <h1 class="text-white text-4xl font-bold pt-4 px-4 text-center mb-4 float-none">About Us</h1>
  </div>
</div>
<style>
</style>