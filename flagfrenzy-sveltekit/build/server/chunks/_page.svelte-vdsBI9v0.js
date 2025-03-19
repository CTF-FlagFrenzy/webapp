import { c as create_ssr_component, b as subscribe, d as add_attribute, f as each, e as escape } from './ssr-9Nf6mmsX.js';
import { w as writable } from './index2-Ckox3KIW.js';

const css = {
  code: 'blockquote.svelte-ephsrr{position:relative;padding:0.5em 2em 0.5em 3em}blockquote.svelte-ephsrr:before{font-family:Georgia, serif;position:absolute;font-size:5em;line-height:1;top:0;left:0;color:#F3CC59;content:"\\201C"}blockquote.svelte-ephsrr:after{font-family:Georgia, serif;position:absolute;float:right;font-size:5em;line-height:1;right:0;color:#F3CC59;bottom:-0.5em;content:"\\201D"}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $slides1, $$unsubscribe_slides1;
  let $currentSlide1, $$unsubscribe_currentSlide1;
  let $slides2, $$unsubscribe_slides2;
  let $currentSlide2, $$unsubscribe_currentSlide2;
  const slides1 = writable([
    {
      text: "My name is Elias Pinter and I was the team leader of the Platform team and responsible for the backend of the web app. I learned a lot about the possibilities of ORMs. I like very much to work with APIs and databases. The backend is one of the most important things because it communicates with the cluster and the GUI. As team leader, I was responsible for the successful completion of the Platform, which includes the cluster, backend, anti-cheat and GUI. I wish you good luck!",
      img: "/images/Pinter.jpg",
      heading: "Pinter Elias - Team leader",
      role: "Backend"
    },
    {
      text: "As part of the development team, I focused on implementing the anti-cheat functionality for our platform. My main tasks included creating mechanisms to validate flag submissions, detect shared flags, and apply penalties for incorrect submissions. What I enjoyed the most was designing the logic to calculate points based on submission time and handling various edge cases. Through this project, I learned a lot about secure coding practices and the importance of robust validation in maintaining the integrity of a competitive environment.",
      img: "/images/Huber.jpg",
      heading: "Huber Julian",
      role: "Anti-Cheat"
    },
    {
      text: "As part of the development team, I was responsible for the frontend of the web app. Throughout this project, I learned how to effectively use Tailwind CSS for styling and how to work with SVGs to create dynamic and visually appealing UI elements. One of the most exciting aspects of this experience was translating design concepts into an interactive and responsive interface. This project gave me valuable insights into modern frontend development and the importance of user experience in web applications.",
      img: "/images/Sturm.jpg",
      heading: "Sturm Leon",
      role: "Frontend"
    },
    {
      text: "I conducted the management of the cluster through the utilization of a local private Docker registry, employing HTTPS for storing and organizing all challenges. Initially, I attempted to deploy them with Docker Swarm, however, I soon discovered that this wasn‘t an option due to the fact that Swarm doesn‘t support rootless Docker. This necessitated my transition to K3s, a process that proved to be both time-consuming and daunting. Despite the challenges encountered, I ultimately completed the process. Reflecting upon it, I recognize the invaluable opportunity to expand my skillset and accumulate knowledge.",
      img: "/images/Ploner.jpg",
      heading: "Ploner Fabian - Project Manager",
      role: "Cluster"
    }
  ]);
  $$unsubscribe_slides1 = subscribe(slides1, (value) => $slides1 = value);
  let currentSlide1 = writable(0);
  $$unsubscribe_currentSlide1 = subscribe(currentSlide1, (value) => $currentSlide1 = value);
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
      text: `I'm a passionate cybersecurity enthusiast who excels in solving complex challenges. My best achievement was successfully completing the "Hidden Job" challenge, where I combined web analysis, reverse engineering, and physical awareness to uncover hidden flags. Through this experience, I learned the importance of meticulous analysis and the value of exploring every detail. I utilized various tools and techniques, including web tools and URL hopping, to achieve my goals. This challenge honed my skills and deepened my understanding of cybersecurity principles.`,
      img: "/images/Flaschberger.jpg",
      heading: "Flaschberger Florian",
      role: "REVERSE"
    },
    {
      text: "I was part of the challenges team, responsible for cryptography and reverse engineering challenges, as well as quality management. It was exciting to come up with interesting challenges and turn those ideas into playable tasks. The added complexity of incorporating dynamic flags in every challenge was a great way to test my problem-solving skills. Through this project, I learned a lot about dividing work efficiently and handling unfamiliar systems. It was a valuable experience that improved both my technical and teamwork skills.",
      img: "/images/Kavalar.jpg",
      heading: "Kavalar Johannes",
      role: "CRYPTO"
    },
    {
      text: "Better late than never! I joined the team mid development and contributed three of the challenges in that time since. I very much liked the development of the challenges and the overall progress of this project. Because I joined late, I couldn’t contribute more challenges, nevertheless I learned a lot about how CTF challenges are built. Lastly, I learned how to become a member of an established team in timely fashion. Have fun and succeed with the challenges!",
      img: "/images/Hafner.jpg",
      heading: "Hafner Florian",
      role: "FORENSICS"
    }
  ]);
  $$unsubscribe_slides2 = subscribe(slides2, (value) => $slides2 = value);
  let currentSlide2 = writable(0);
  $$unsubscribe_currentSlide2 = subscribe(currentSlide2, (value) => $currentSlide2 = value);
  $$result.css.add(css);
  $$unsubscribe_slides1();
  $$unsubscribe_currentSlide1();
  $$unsubscribe_slides2();
  $$unsubscribe_currentSlide2();
  return `<div class="w-full mb-4"><div class="col-span-1 flex items-center justify-center h-[18rem] md:!h-[28rem] w-full" data-svelte-h="svelte-1306whq"><img alt="Project team"${add_attribute("src", "/images/team.jpg", 0)} class="w-full h-[18rem] md:!h-[28rem] object-cover object-top shadow-BackdropShadow4"></div> <h1 class="text-custom-200 text-4xl font-bold px-4 text-center mt-8" data-svelte-h="svelte-15dodkr">Management</h1> <div class="flex flex-col lg:!flex-row mx-4 md:!mx-36 mt-4 items-center" data-svelte-h="svelte-140qphe"><div class="flex flex-row mb-4 gap-4"><div><img alt="Project supervisor"${add_attribute("src", "/images/Rabensteiner.jpg", 0)} class="w-[10rem] h-[16rem] object-cover object-top mt-2 max-w-none"> <h3 class="text-center w-[10rem] break-words text-lg">Prof. Rabensteiner Reiner</h3></div> <div><img alt="Projectleader"${add_attribute("src", "/images/Ploner.jpg", 0)} class="w-[10rem] h-[16rem] object-cover object-top mt-2 max-w-none"> <h3 class="text-center w-[10rem] break-words text-lg">Ploner<br>Fabian</h3></div></div> <p class="text-justify mx-4 lg:!mx-12">The project, under the management of PLONER Fabian and the supervision of RABENSTEINER Reiner, progressed with strong leadership and clear direction. While initial internal conflicts arose, they were quickly resolved through firm yet respectful project management, fostering a focused and cooperative team dynamic. Communication, structured from the project manager through the team leader to team members, worked efficiently for the most part. However, good management alone is not enough—motivated and committed team members played a crucial role in the project’s success. Once aligned, the team worked together perfectly, ensuring smooth execution and problem-solving. From a management perspective, the project was nearly flawless, with only minor errors, demonstrating the importance of both strong leadership and a dedicated, well-coordinated team.</p></div> <hr class="border-t-2 border-custom-200 opacity-80 pt-8 w-auto mx-4 md:!mx-24 mt-4"> <h1 class="text-custom-200 text-4xl font-bold px-4 text-center mb-4 " data-svelte-h="svelte-1kat9rw">Team Platform</h1> <div class="relative w-full h-[920px] md:!h-[660px] lg:!h-[500px] overflow-hidden mb-14 shadow-BackdropShadow5 hidden lg:!block">${each($slides1, (slide, i) => {
    return `<div class="flex flex-col mb-12 !mx-4 lg:!mx-48 lg:!flex-row h-full justify-center" style="${"opacity: " + escape(i === $currentSlide1 ? 1 : 0, true) + "; display: " + escape(i === $currentSlide1 ? "" : "none", true) + ";"}"><div class="flex flex-col items-center justify-center"><h2 class="text-white text-2xl font-bold px-4 text-center float-none">${escape(slide.heading)}</h2> <h2 class="text-gray-200 text-xl font-bold px-4 mb-2 text-center float-none">${escape(slide.role)}</h2> <blockquote class="text-gray-400 text-base text-justify md:!mx-12 svelte-ephsrr">${escape(slide.text)}</blockquote></div> <div class="flex items-center justify-center"><img alt="Teamleader"${add_attribute("src", slide.img, 0)} class="w-[10rem] h-[16rem] object-cover object-top mt-2 max-w-none"></div> </div>`;
  })} <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-3">${each($slides1, (_, i) => {
    return `<div class="${"w-3 h-3 rounded-full bg-white opacity-50 cursor-pointer " + escape($currentSlide1 === i ? "opacity-100 bg-yellow-500" : "", true)}"></div>`;
  })}</div></div> <div class="relative w-full h-[920px] md:!h-[660px] lg:!h-[500px] overflow-hidden mb-14 shadow-BackdropShadow5 lg:!hidden">${each($slides1, (slide, i) => {
    return `<div class="flex flex-col mb-12 !mx-4 lg:!mx-48 lg:!flex-row h-full justify-center" style="${"opacity: " + escape(i === $currentSlide1 ? 1 : 0, true) + "; display: " + escape(i === $currentSlide1 ? "" : "none", true) + ";"}"><div class="flex items-center justify-center"><img alt="Teamleader"${add_attribute("src", slide.img, 0)} class="w-[10rem] h-[16rem] object-cover object-top mt-2 max-w-none"></div> <div class="flex flex-col items-center justify-center"><h2 class="text-white text-2xl font-bold px-4 text-center float-none">${escape(slide.heading)}</h2> <h2 class="text-gray-200 text-xl font-bold px-4 mb-2 text-center float-none">${escape(slide.role)}</h2> <blockquote class="text-gray-400 text-base text-justify svelte-ephsrr">${escape(slide.text)}</blockquote></div> </div>`;
  })} <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-3">${each($slides1, (_, i) => {
    return `<div class="${"w-3 h-3 rounded-full bg-white opacity-50 cursor-pointer " + escape($currentSlide1 === i ? "opacity-100 bg-yellow-500" : "", true)}"></div>`;
  })}</div></div> <hr class="border-t-2 border-custom-200 opacity-80 pt-8 w-auto mx-4 md:!mx-24 mt-4"> <h1 class="text-custom-200 text-4xl font-bold px-4 text-center mb-4 " data-svelte-h="svelte-wxp3wv">Team Challenges</h1> <div class="relative w-full h-[920px] md:!h-[660px] lg:!h-[500px] overflow-hidden mb-14 shadow-BackdropShadow5">${each($slides2, (slide, i) => {
    return `<div class="flex flex-col mb-12 !mx-4 lg:!mx-48 lg:!flex-row h-full justify-center" style="${"opacity: " + escape(i === $currentSlide2 ? 1 : 0, true) + "; display: " + escape(i === $currentSlide2 ? "" : "none", true) + ";"}"><div class="flex items-center justify-center"><img alt="Teamleader"${add_attribute("src", slide.img, 0)} class="w-[10rem] h-[16rem] object-cover object-top mt-2 max-w-none"></div> <div class="flex flex-col items-center justify-center"><h2 class="text-white text-2xl font-bold px-4 text-center float-none">${escape(slide.heading)}</h2> <h2 class="text-gray-200 text-xl font-bold px-4 mb-2 text-center float-none">${escape(slide.role)}</h2> <blockquote class="text-gray-400 text-base text-justify md:!mx-12 svelte-ephsrr">${escape(slide.text)}</blockquote></div> </div>`;
  })} <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-3">${each($slides2, (_, i) => {
    return `<div class="${"w-3 h-3 rounded-full bg-white opacity-50 cursor-pointer " + escape($currentSlide2 === i ? "opacity-100 bg-yellow-500" : "", true)}"></div>`;
  })}</div></div> </div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-vdsBI9v0.js.map
