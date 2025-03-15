<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  const slides1 = writable([
    {
      text: "My name is Elias Pinter and I was the team leader of the Platform team and responsible for the backend of the web app. I learned a lot about the possibilities of ORMs. I like very much to work with APIs and databases. The backend is one of the most important things because it communicates with the cluster and the GUI. As team leader, I was responsible for the successful completion of the Platform, which includes the cluster, backend, anti-cheat and GUI. I wish you good luck!",
      img: "/images/Pinter.jpg",
      heading: "Pinter Elias - Team leader",
      role: "Backend"
    },
    {
      text: "Dies ist ein Beispieltext, der um zwei Bilder fließt. Das erste Bild befindet sich in der oberen rechten Ecke, während das zweite Bild in der unteren linken Ecke ist. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non urna vitae massa dapibus congue. The battleground for all cybersecurity enthusiasts! Whether you're an experienced hacker or just beginning your journey into hacking, this platform is designed to challenge your skills, expand your technical knowledge, and push you to think like a true security professional. The battleground for all cybersecurity enthusiasts!",
      img: "/images/Huber.jpg",
      heading: "Huber Julian",
      role: "Anti-Cheat"
    },
    {
      text: "Dies ist ein Beispieltext, der um zwei Bilder fließt. Das erste Bild befindet sich in der oberen rechten Ecke, während das zweite Bild in der unteren linken Ecke ist. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non urna vitae massa dapibus congue. The battleground for all cybersecurity enthusiasts! Whether you're an experienced hacker or just beginning your journey into hacking, this platform is designed to challenge your skills, expand your technical knowledge, and push you to think like a true security professional. The battleground for all cybersecurity enthusiasts!",
      img: "/images/Sturm.jpg",
      heading: "Sturm Leon",
      role: "Frontend"
    },
    {
      text: "Dies ist ein Beispieltext, der um zwei Bilder fließt. Das erste Bild befindet sich in der oberen rechten Ecke, während das zweite Bild in der unteren linken Ecke ist. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non urna vitae massa dapibus congue. The battleground for all cybersecurity enthusiasts! Whether you're an experienced hacker or just beginning your journey into hacking, this platform is designed to challenge your skills, expand your technical knowledge, and push you to think like a true security professional. The battleground for all cybersecurity enthusiasts!",
      img: "/images/Ploner.jpg",
      heading: "Ploner Fabian - Projectleader",
      role: "Cluster"
    }
  ]);
  let currentSlide1 = writable(0);
  let interval;
  
  const nextSlide1 = () => {
    currentSlide1.update(n => (n + 1) % 4);
  };

  const slides2 = writable([
    {
      text: "My role in this project was that of the deputy project manager and the team leader of the Challenges team. I was also responsible for creating the challenges in the OSINT and Steganography categories. I especially enjoyed developing and testing these challenges, always keeping in mind that they were meant to engage and challenge the participants of the CTF event. It was exciting to figure out how to design tasks that were neither too easy nor too difficult. Along the way, I learned various new techniques that will definitely be useful in the future.",
      img: "/images/Brown.jpg",
      heading: "Brown Ilaria - Teamleader",
      role: "OSINT"
    },
    {
      text: "In the course of the school's annual TopHack event, I was able to participate in the project FlagFrenzy as a controller which resulted in learning to do management with Jira. Additionally, as part of the challenge team, I helped with the development of the challenges - especially in the categories “Others” and “Forensics”. Overall, it was a great honor for me to be part of such a great team and to prepare the CTF together with my colleagues.",
      img: "/images/Romauch.jpg",
      heading: "Romauch Daniel",
      role: "OTHERS"
    },
    {
      text: "Dies ist ein Beispieltext, der um zwei Bilder fließt. Das erste Bild befindet sich in der oberen rechten Ecke, während das zweite Bild in der unteren linken Ecke ist. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non urna vitae massa dapibus congue. The battleground for all cybersecurity enthusiasts! Whether you're an experienced hacker or just beginning your journey into hacking, this platform is designed to challenge your skills, expand your technical knowledge, and push you to think like a true security professional. The battleground for all cybersecurity enthusiasts!",
      img: "/images/Flaschberger.jpg",
      heading: "Flaschberger Florian",
      role: "REVERSE"
    },
    {
      text: "Dies ist ein Beispieltext, der um zwei Bilder fließt. Das erste Bild befindet sich in der oberen rechten Ecke, während das zweite Bild in der unteren linken Ecke ist. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non urna vitae massa dapibus congue. The battleground for all cybersecurity enthusiasts! Whether you're an experienced hacker or just beginning your journey into hacking, this platform is designed to challenge your skills, expand your technical knowledge, and push you to think like a true security professional. The battleground for all cybersecurity enthusiasts!",
      img: "/images/Kavalar.jpg",
      heading: "Kavalar Johannes",
      role: "CRYPTO"
    },
    {
      text: "Dies ist ein Beispieltext, der um zwei Bilder fließt. Das erste Bild befindet sich in der oberen rechten Ecke, während das zweite Bild in der unteren linken Ecke ist. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non urna vitae massa dapibus congue. The battleground for all cybersecurity enthusiasts! Whether you're an experienced hacker or just beginning your journey into hacking, this platform is designed to challenge your skills, expand your technical knowledge, and push you to think like a true security professional. The battleground for all cybersecurity enthusiasts!",
      img: "/images/Hafner.jpg",
      heading: "Hafner Florian",
      role: "FORENSICS"
    }
  ]);
  let currentSlide2 = writable(0);
  let interval2;
  
  const nextSlide2 = () => {
    currentSlide2.update(n => (n + 1) % 5);
  };

  onMount(() => {
      interval = setInterval(nextSlide1, 10000);
      interval2 = setInterval(nextSlide2, 10000);
      return () => clearInterval(interval);
  });
</script>
<div class=" w-full mb-4">
  <div class="col-span-1 flex items-center justify-center h-[18rem] md:!h-[28rem] w-full">
    <img alt="Project team" src={'/images/team.jpg'} class="w-full h-[18rem] md:!h-[28rem] object-cover object-top shadow-BackdropShadow4" />
  </div>
  <h1 class="text-custom-200 text-4xl font-bold px-4 text-center mt-4">Management</h1>
  <div class="flex flex-col lg:!flex-row mx-4 md:!mx-48 mt-4 items-center">
    <div class="flex flex-row mb-4 gap-4">
      <div>
        <img alt="Project supervisor" src={'/images/Rabensteiner.jpg'} class="w-[10rem] h-[16rem] object-cover object-top mt-2 max-w-none" />
        <h3 class="text-center w-[10rem] break-words text-xl">Rabensteiner Reiner</h3>
      </div>
      <div>
        <img alt="Projectleader" src={'/images/Ploner.jpg'} class="w-[10rem] h-[16rem] object-cover object-top mt-2 max-w-none" />
        <h3 class="text-center w-[10rem] break-words text-xl">Ploner<br>Fabian</h3>
      </div>
    </div>
    <p class="text-justify mx-4 lg:!mx-12">
      Dies ist ein Beispieltext, der um zwei Bilder fließt. Das erste Bild befindet sich in der oberen rechten Ecke, während das zweite Bild in der unteren linken Ecke ist. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non urna vitae massa dapibus congue. The battleground for all cybersecurity enthusiasts! Whether you're an experienced hacker or just beginning your journey into hacking, this platform is designed to challenge your skills, expand your technical knowledge, and push you to think like a true security professional. The battleground for all cybersecurity enthusiasts!
    </p>
  </div>


  <hr class="border-t-2 border-custom-200 opacity-80 pt-8 w-auto mx-4 md:!mx-24 mt-4">
  <h1 class="text-custom-200 text-4xl font-bold px-4 text-center mb-4 ">Team Platform</h1>
  <div class="relative w-full h-[920px] md:!h-[660px] lg:!h-[500px] overflow-hidden mb-14 shadow-BackdropShadow5">
    {#each $slides1 as slide, i}
      <div class="flex flex-col mb-12 !mx-4 lg:!mx-48 lg:!flex-row h-full justify-center" style="opacity: {i === $currentSlide1 ? 1 : 0}; display: {i === $currentSlide1 ? '' : 'none'};">
        <div class="flex items-center justify-center">
          <img alt="Teamleader" src={slide.img} class="w-[10rem] h-[16rem] object-cover object-top mt-2 max-w-none" />
        </div>
        <div class="flex flex-col items-center justify-center">
          <h2 class="text-white text-2xl font-bold px-4 text-center float-none">{slide.heading}</h2>
          <h2 class="text-gray-200 text-xl font-bold px-4 mb-2 text-center float-none">{slide.role}</h2>
          <blockquote class="text-gray-400 text-base text-justify md:!mx-12">{slide.text}</blockquote>
        </div>
      </div>
    {/each}

    <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-3">
        {#each $slides1 as _, i}
            <div class="w-3 h-3 rounded-full bg-white opacity-50 cursor-pointer { $currentSlide1 === i ? 'opacity-100 bg-yellow-500' : '' }" on:click={() => currentSlide1.set(i)}></div>
        {/each}
    </div>
  </div>


  <hr class="border-t-2 border-custom-200 opacity-80 pt-8 w-auto mx-4 md:!mx-24 mt-4">
  <h1 class="text-custom-200 text-4xl font-bold px-4 text-center mb-4 ">Team Challenges</h1>
  <div class="relative w-full h-[920px] md:!h-[660px] lg:!h-[500px] overflow-hidden mb-14 shadow-BackdropShadow5 hidden lg:!block">
    {#each $slides2 as slide, i}
      <div class="flex flex-col mb-12 !mx-4 lg:!mx-48 lg:!flex-row h-full justify-center" style="opacity: {i === $currentSlide2 ? 1 : 0}; display: {i === $currentSlide2 ? '' : 'none'};">
        <div class="flex flex-col items-center justify-center">
          <h2 class="text-white text-2xl font-bold px-4 text-center float-none">{slide.heading}</h2>
          <h2 class="text-gray-200 text-xl font-bold px-4 mb-2 text-center float-none">{slide.role}</h2>
          <blockquote class="text-gray-400 text-base text-justify md:!mx-12">{slide.text}</blockquote>
        </div>
        <div class="flex items-center justify-center">
          <img alt="Teamleader" src={slide.img} class="w-[10rem] h-[16rem] object-cover object-top mt-2 max-w-none" />
        </div>
      </div>
    {/each}

    <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-3">
        {#each $slides2 as _, i}
            <div class="w-3 h-3 rounded-full bg-white opacity-50 cursor-pointer { $currentSlide2 === i ? 'opacity-100 bg-yellow-500' : '' }" on:click={() => currentSlide2.set(i)}></div>
        {/each}
    </div>
  </div>

  <div class="relative w-full h-[920px] md:!h-[660px] lg:!h-[500px] overflow-hidden mb-14 shadow-BackdropShadow5 lg:!hidden">
    {#each $slides2 as slide, i}
      <div class="flex flex-col mb-12 !mx-4 lg:!mx-48 lg:!flex-row h-full justify-center" style="opacity: {i === $currentSlide2 ? 1 : 0}; display: {i === $currentSlide2 ? '' : 'none'};">
        <div class="flex items-center justify-center">
          <img alt="Teamleader" src={slide.img} class="w-[10rem] h-[16rem] object-cover object-top mt-2 max-w-none" />
        </div>
        <div class="flex flex-col items-center justify-center">
          <h2 class="text-white text-2xl font-bold px-4 text-center float-none">{slide.heading}</h2>
          <h2 class="text-gray-200 text-xl font-bold px-4 mb-2 text-center float-none">{slide.role}</h2>
          <blockquote class="text-gray-400 text-base text-justify">{slide.text}</blockquote>
        </div>
      </div>
    {/each}

    <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-3">
        {#each $slides2 as _, i}
            <div class="w-3 h-3 rounded-full bg-white opacity-50 cursor-pointer { $currentSlide2 === i ? 'opacity-100 bg-yellow-500' : '' }" on:click={() => currentSlide2.set(i)}></div>
        {/each}
    </div>
  </div>
</div>

<style>
  blockquote {
    position: relative;
    padding: 0.5em 2em 0.5em 3em;
  }
/* Thanks: http://callmenick.com/post/styling-blockquotes-with-css-pseudo-classes */
  blockquote:before {
    font-family: Georgia, serif;
    position: absolute;
    font-size: 5em;
    line-height: 1;
    top: 0;
    left: 0;
    color: #F3CC59;
    content: "\201C";
  }
  blockquote:after {
    font-family: Georgia, serif;
    position: absolute;
   /* display: block; don't use this, it raised the quote too high from the bottom - defeated line-height? */
    float:right;
    font-size:5em;
    line-height: 1;
    right:0;
    color: #F3CC59;
    bottom:-0.5em;
    content: "\201D";
  }
</style>