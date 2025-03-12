<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  onMount(() => {
      interval = setInterval(nextSlide, 10000);
      return () => clearInterval(interval);
  });
</script>
<div class=" w-full mb-4">
  <div class="col-span-1 flex items-center justify-center h-80 w-full">
    <img alt="Project logo" src={'/images/3_banken_bg.png'} class="w-full h-80" />
  </div>
  <h1 class="text-custom-200 text-4xl font-bold px-4 text-center float-none mt-4">Management</h1>
  <div class="mb-12 mx-4 md:!mx-48 mt-8">
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
        The battleground for all cybersecurity enthusiasts! Whether you're an experienced hacker or just beginning your journey into hacking, this platform is designed to challenge your skills, expand your technical knowledge, and push you to think like a true security.
      </p>
    </div>
  </div>
  <hr class="border-t-2 border-custom-200 opacity-80 pt-8 w-auto mx-4 md:!mx-24">
  <h1 class="text-custom-200 text-4xl font-bold px-4 text-center float-none">Team Platform</h1>
  <div class="flex flex-row mb-12 mx-4 md:!mx-48 mt-8">
    <div class="flex items-center justify-center">
      <div class=" w-32 h-40 bg-white mt-2 mx-12" />
    </div>
    <div class="flex flex-col items-center justify-center">
      <h2 class="text-white text-2xl font-bold px-4 text-center float-none">Pinter Elias - Teamleader</h2>
      <h2 class="text-gray-200 text-xl font-bold px-4 mb-2 text-center float-none">Backend</h2>
      <p class="text-justify text-gray-400 mx-12">
        Dies ist ein Beispieltext, der um zwei Bilder fließt. Das erste Bild befindet sich in der oberen rechten Ecke, während das zweite Bild in der unteren linken Ecke ist. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non urna vitae massa dapibus congue.
        The battleground for all cybersecurity enthusiasts! Whether you're an experienced hacker or just beginning your journey into hacking, this platform is designed to challenge your skills, expand your.
        The battleground for all cybersecurity enthusiasts! Whether you're an experienced hacker or just beginning your journey into hacking, this platform is designed to challenge your skills, expand your technical knowledge, and push you to think like a true security.
      </p>
    </div>
  </div>
  <div class="flex flex-row mb-12 mx-4 md:!mx-48 mt-8">
    <div class="flex flex-col items-center justify-center">
      <h2 class="text-white text-2xl font-bold px-4 text-center float-none">Huber Julian</h2>
      <h2 class="text-gray-200 text-xl font-bold px-4 mb-2 text-center float-none">Anti-Cheat</h2>
      <p class="text-justify text-gray-400 mx-12">
        Dies ist ein Beispieltext, der um zwei Bilder fließt. Das erste Bild befindet sich in der oberen rechten Ecke, während das zweite Bild in der unteren linken Ecke ist. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non urna vitae massa dapibus congue.
        The battleground for all cybersecurity enthusiasts! Whether you're an experienced hacker or just beginning your journey into hacking, this platform is designed to challenge your skills, expand your.
        The battleground for all cybersecurity enthusiasts! Whether you're an experienced hacker or just beginning your journey into hacking, this platform is designed to challenge your skills, expand your technical knowledge, and push you to think like a true security.
      </p>
    </div>
    <div class="flex items-center justify-center">
      <div class=" w-32 h-40 bg-white mt-2 mx-12" />
    </div>
  </div>
  <div class="flex flex-row mb-12 mx-4 md:!mx-48 mt-8">
    <div class="flex items-center justify-center">
      <div class=" w-32 h-40 bg-white mt-2 mx-12" />
    </div>
    <div class="flex flex-col items-center justify-center">
      <h2 class="text-white text-2xl font-bold px-4 text-center float-none">Sturm Leon</h2>
      <h2 class="text-gray-200 text-xl font-bold px-4 mb-2 text-center float-none">Frontend</h2>
      <p class="text-justify text-gray-400 mx-12">
        Dies ist ein Beispieltext, der um zwei Bilder fließt. Das erste Bild befindet sich in der oberen rechten Ecke, während das zweite Bild in der unteren linken Ecke ist. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non urna vitae massa dapibus congue.
        The battleground for all cybersecurity enthusiasts! Whether you're an experienced hacker or just beginning your journey into hacking, this platform is designed to challenge your skills, expand your.
        The battleground for all cybersecurity enthusiasts! Whether you're an experienced hacker or just beginning your journey into hacking, this platform is designed to challenge your skills, expand your technical knowledge, and push you to think like a true security.
      </p>
    </div>
  </div>
  <div class="flex flex-row mb-12 mx-4 md:!mx-48 mt-8">
    <div class="flex flex-col items-center justify-center">
      <h2 class="text-white text-2xl font-bold px-4 text-center float-none">Ploner Fabian - Projectleader</h2>
      <h2 class="text-gray-200 text-xl font-bold px-4 mb-2 text-center float-none">Cluster</h2>
      <p class="text-justify text-gray-400 mx-12">
        Dies ist ein Beispieltext, der um zwei Bilder fließt. Das erste Bild befindet sich in der oberen rechten Ecke, während das zweite Bild in der unteren linken Ecke ist. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non urna vitae massa dapibus congue.
        The battleground for all cybersecurity enthusiasts! Whether you're an experienced hacker or just beginning your journey into hacking, this platform is designed to challenge your skills, expand your.
        The battleground for all cybersecurity enthusiasts! Whether you're an experienced hacker or just beginning your journey into hacking, this platform is designed to challenge your skills, expand your technical knowledge, and push you to think like a true security.
      </p>
    </div>
    <div class="flex items-center justify-center">
      <div class=" w-32 h-40 bg-white mt-2 mx-12" />
    </div>
  </div>

  <hr class="border-t-2 border-custom-200 opacity-80 pt-8 w-auto mx-4 md:!mx-24">
  <h1 class="text-custom-200 text-4xl font-bold px-4 text-center float-none">Team Challenges</h1>
  <div class="flex flex-row mb-12 mx-4 md:!mx-48 mt-8">
    <div class="flex items-center justify-center">
      <div class=" w-32 h-40 bg-white mt-2 mx-12" />
    </div>
    <div class="flex flex-col items-center justify-center">
      <h2 class="text-white text-2xl font-bold px-4 text-center float-none">Brown Ilaria - Teamleader</h2>
      <h2 class="text-gray-200 text-xl font-bold px-4 mb-2 text-center float-none">OSINT</h2>
      <p class="text-justify text-gray-400 mx-12">
        Dies ist ein Beispieltext, der um zwei Bilder fließt. Das erste Bild befindet sich in der oberen rechten Ecke, während das zweite Bild in der unteren linken Ecke ist. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non urna vitae massa dapibus congue.
        The battleground for all cybersecurity enthusiasts! Whether you're an experienced hacker or just beginning your journey into hacking, this platform is designed to challenge your skills, expand your.
        The battleground for all cybersecurity enthusiasts! Whether you're an experienced hacker or just beginning your journey into hacking, this platform is designed to challenge your skills, expand your technical knowledge, and push you to think like a true security.
      </p>
    </div>
  </div>
  <div class="flex flex-row mb-12 mx-4 md:!mx-48 mt-8">
    <div class="flex flex-col items-center justify-center">
      <h2 class="text-white text-2xl font-bold px-4 text-center float-none">Romauch Daniel</h2>
      <h2 class="text-gray-200 text-xl font-bold px-4 mb-2 text-center float-none">OTHERS</h2>
      <p class="text-justify text-gray-400 mx-12">
        Dies ist ein Beispieltext, der um zwei Bilder fließt. Das erste Bild befindet sich in der oberen rechten Ecke, während das zweite Bild in der unteren linken Ecke ist. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non urna vitae massa dapibus congue.
        The battleground for all cybersecurity enthusiasts! Whether you're an experienced hacker or just beginning your journey into hacking, this platform is designed to challenge your skills, expand your.
        The battleground for all cybersecurity enthusiasts! Whether you're an experienced hacker or just beginning your journey into hacking, this platform is designed to challenge your skills, expand your technical knowledge, and push you to think like a true security.
      </p>
    </div>
    <div class="flex items-center justify-center">
      <div class=" w-32 h-40 bg-white mt-2 mx-12" />
    </div>
  </div>
  <div class="flex flex-row mb-12 mx-4 md:!mx-48 mt-8">
    <div class="flex items-center justify-center">
      <div class=" w-32 h-40 bg-white mt-2 mx-12" />
    </div>
    <div class="flex flex-col items-center justify-center">
      <h2 class="text-white text-2xl font-bold px-4 text-center float-none">Flaschberger Florian</h2>
      <h2 class="text-gray-200 text-xl font-bold px-4 mb-2 text-center float-none">CRYPTOGRAPHY</h2>
      <p class="text-justify text-gray-400 mx-12">
        Dies ist ein Beispieltext, der um zwei Bilder fließt. Das erste Bild befindet sich in der oberen rechten Ecke, während das zweite Bild in der unteren linken Ecke ist. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non urna vitae massa dapibus congue.
        The battleground for all cybersecurity enthusiasts! Whether you're an experienced hacker or just beginning your journey into hacking, this platform is designed to challenge your skills, expand your.
        The battleground for all cybersecurity enthusiasts! Whether you're an experienced hacker or just beginning your journey into hacking, this platform is designed to challenge your skills, expand your technical knowledge, and push you to think like a true security.
      </p>
    </div>
  </div>
  <div class="flex flex-row mb-12 mx-4 md:!mx-48 mt-8">
    <div class="flex flex-col items-center justify-center">
      <h2 class="text-white text-2xl font-bold px-4 text-center float-none">Kavalar Johannes</h2>
      <h2 class="text-gray-200 text-xl font-bold px-4 mb-2 text-center float-none">FORENSICS</h2>
      <p class="text-justify text-gray-400 mx-12">
        Dies ist ein Beispieltext, der um zwei Bilder fließt. Das erste Bild befindet sich in der oberen rechten Ecke, während das zweite Bild in der unteren linken Ecke ist. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non urna vitae massa dapibus congue.
        The battleground for all cybersecurity enthusiasts! Whether you're an experienced hacker or just beginning your journey into hacking, this platform is designed to challenge your skills, expand your.
        The battleground for all cybersecurity enthusiasts! Whether you're an experienced hacker or just beginning your journey into hacking, this platform is designed to challenge your skills, expand your technical knowledge, and push you to think like a true security.
      </p>
    </div>
    <div class="flex items-center justify-center">
      <div class=" w-32 h-40 bg-white mt-2 mx-12" />
    </div>
  </div>
  <div class="flex flex-row mb-12 mx-4 md:!mx-48 mt-8">
    <div class="flex items-center justify-center">
      <div class=" w-32 h-40 bg-white mt-2 mx-12" />
    </div>
    <div class="flex flex-col items-center justify-center">
      <h2 class="text-white text-2xl font-bold px-4 text-center float-none">Hafner Florian</h2>
      <h2 class="text-gray-200 text-xl font-bold px-4 mb-2 text-center float-none">STEGO</h2>
      <p class="text-justify text-gray-400 mx-12">
        Dies ist ein Beispieltext, der um zwei Bilder fließt. Das erste Bild befindet sich in der oberen rechten Ecke, während das zweite Bild in der unteren linken Ecke ist. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non urna vitae massa dapibus congue.
        The battleground for all cybersecurity enthusiasts! Whether you're an experienced hacker or just beginning your journey into hacking, this platform is designed to challenge your skills, expand your.
        The battleground for all cybersecurity enthusiasts! Whether you're an experienced hacker or just beginning your journey into hacking, this platform is designed to challenge your skills, expand your technical knowledge, and push you to think like a true security.
      </p>
    </div>
  </div>
</div>
<style>
</style>