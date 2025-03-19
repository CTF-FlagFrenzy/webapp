import { c as create_ssr_component, b as subscribe, d as add_attribute, f as each, e as escape } from './ssr-9Nf6mmsX.js';
import { w as writable } from './index2-Ckox3KIW.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $slides, $$unsubscribe_slides;
  let $currentSlide, $$unsubscribe_currentSlide;
  const slides = writable([
    {
      text: "A big shoutout to BPN for generously sponsoring the first-place prizes! Your contribution fuels the competitive spirit and rewards excellence, making the event even more exciting for all participants.",
      logo: "/images/bpn_logo.png",
      bg: "/images/bpn_bg.jpg",
      url: "https://www.bpn-group.com/de/"
    },
    {
      text: "Thank you to BARMHERZIGE BRÜDER IT-SERVICES for providing fantastic merchandise! Your support adds an extra layer of excitement, giving participants something to remember beyond the competition itself.",
      logo: "/images/Logo_BHB_IT-Services.png",
      bg: "/images/bhb_bg.png",
      url: "https://www.barmherzige-brueder.at/portal/itservices/home"
    },
    {
      text: "A special thanks to SPAR ICS for recognizing and supporting young talent by sponsoring the first-place prizes in the Junior category! Your contribution empowers the next generation of cybersecurity professionals.",
      logo: "/images/spar_ics_logo.png",
      bg: "/images/spar_ics_bg.jpg",
      url: "https://www.spar-ics.com"
    },
    {
      text: "Huge appreciation to NTS for rewarding the third-place team! Your generosity helps motivate participants and ensures that their hard work gets the recognition it deserves.",
      logo: "/images/Logo_NTS_Combo1_2017_RGB_White.png",
      bg: "/images/nts_bg.png",
      url: "https://www.nts.eu"
    },
    {
      text: "A huge thank you to 5 Minuten for spreading the word about our event through PR and social media! Your support helps us reach a wider audience and bring more visibility to the competition.",
      logo: "/images/logo_5_min.png",
      bg: "/images/5_min_bg.png",
      url: "https://www.5min.at/"
    },
    {
      text: "A heartfelt thank you to 3 Banken IT for supporting the second-place winners with amazing prizes! Your commitment to fostering cybersecurity talent makes a lasting impact on our participants’ journey.",
      logo: "/images/3_banken_logo.svg",
      bg: "/images/3_banken_bg.png",
      url: "https://www.3bankenit.at/"
    }
  ]);
  $$unsubscribe_slides = subscribe(slides, (value) => $slides = value);
  let currentSlide = writable(0);
  $$unsubscribe_currentSlide = subscribe(currentSlide, (value) => $currentSlide = value);
  $$unsubscribe_slides();
  $$unsubscribe_currentSlide();
  return `<div class="pt-8 w-full"><div class="gap-0 grid grid-cols-1 mx-8 mt-4 lg:grid-cols-3 lg:!gap-3.5 mb-14" data-svelte-h="svelte-jab9ie"><div class="col-span-1 flex items-center justify-center h-auto w-full"><img alt="Project logo"${add_attribute("src", "/images/Slogan.png", 0)} class="w-full sm:!w-1/2 lg:!w-full"></div> <div class="col-span-2 flex flex-col justify-center items-center"><h1 class="text-custom-200 text-center text-3xl mb-4">Welcome to FlagFrenzy</h1> <p class="text-white text-lg text-justify w-full px-4 md:w-3/4 md:!px-0">The battleground for all cybersecurity enthusiasts! Whether you’re an experienced hacker or just beginning your journey 
                into hacking, this platform is designed to challenge your skills, expand your technical knowledge and push you to think 
                like a true security professional. Compete in a variety of challenges, including Web-Challenges, Cryptography, Reversing, 
                Forensics, OSINT, Steganography and Others, as you race against fellow participants to capture flags and prove your expertise.</p> <br> <p class="text-white text-lg text-justify w-full px-4 md:w-3/4 md:!px-0">Success in this competition requires more than just technical skills—it’s about strategy, persistence, and teamwork. Each 
                flag you capture moves you up the leaderboard, but remember that fair play, integrity, and respect for the rules are just 
                as important as winning. Stay sharp, think outside the box, and most importantly, enjoy the thrill of the game. Are you 
                ready to take on the challenge? Let the FlagFrenzy begin!</p></div></div> <div class="relative w-full h-[600px] sm:!h-[400px] overflow-hidden mb-14 shadow-BackdropShadow5">${each($slides, (slide, i) => {
    return `<div class="${[
      "absolute grid grid-cols-1 lg:grid-cols-2 w-full h-full justify-between items-center p-5 transition-opacity duration-500 bg-cover bg-center",
      slide.bg === "/images/5_min_bg.png" ? "bg-top" : ""
    ].join(" ").trim()}" style="${"background-image: url(" + escape(slide.bg, true) + "); opacity: " + escape(i === $currentSlide ? 1 : 0, true) + ";"}"><div class="absolute inset-0 bg-custom-100 opacity-80"></div> <div class="relative z-10 text-lg font-bold text-white px-4 lg:!px-16 text-justify">${escape(slide.text)}</div> <a${add_attribute("href", slide.url, 0)} class="z-10 flex justify-center items-center w-full h-full"><img class="max-h-[80px]"${add_attribute("src", slide.logo, 0)} alt="Slide Logo"></a> </div>`;
  })} <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-3">${each($slides, (_, i) => {
    return `<div class="${"w-3 h-3 rounded-full bg-white opacity-50 cursor-pointer " + escape($currentSlide === i ? "opacity-100 bg-yellow-500" : "", true)}"></div>`;
  })}</div></div> <div class="mx-8 flex flex-col mb-8 sm:!mx-20 bg-custom-110 px-6 py-4 border-2 border-custom-200 rounded-xl shadow-BackdropShadow" data-svelte-h="svelte-188qan0"><h1 class="text-3xl text-center font-bold mb-4 text-white" id="Rules">RULES</h1> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 text-lg text-white list-none counter-reset-rules"><div class="pr-0 lg:!pr-6 lg:border-r border-custom-200"><li class="mb-2 counter-increment-rules before:content-[counter(rules)'.']"><b class="text-custom-200">No Platform Attacks:</b> Participants must not attempt to disrupt or attack the CTF platform infrastructure.</li> <li class="mb-2 text-gray-400 counter-increment-rules before:content-[counter(rules)'.']"><b class="text-custom-200">No Unauthorized Access:</b> Participants must not attempt to gain unauthorized access to any part of the system.</li> <li class="mb-2 counter-increment-rules before:content-[counter(rules)'.']"><b class="text-custom-200">Prohibition of Teaming:</b> Teaming up with others outside of the designated team structure is prohibited.</li> <li class="mb-2 text-gray-400 counter-increment-rules before:content-[counter(rules)'.']"><b class="text-custom-200">Flag Sharing Prohibited:</b> Sharing specific flag solutions with other teams is strictly prohibited.</li> <li class="mb-2 counter-increment-rules before:content-[counter(rules)'.']"><b class="text-custom-200">Respect Platform Integrity:</b> Participants must respect the integrity of the CTF platform and report vulnerabilities.</li></div> <div class="pl-0 lg:!pl-6"><li class="mb-2 text-gray-400 counter-increment-rules before:content-[counter(rules)'.']"><b class="text-custom-200">Compliance with Platform Usage Policies:</b> Participants must adhere to all platform usage policies.</li> <li class="mb-2 counter-increment-rules before:content-[counter(rules)'.']"><b class="text-custom-200">No Script Kiddie Behavior:</b> Participants should demonstrate a basic understanding of cybersecurity principles.</li> <li class="mb-2 text-gray-400 counter-increment-rules before:content-[counter(rules)'.']"><b class="text-custom-200">Responsible Disclosure:</b> Security vulnerabilities should be reported responsibly.</li> <li class="mb-2 counter-increment-rules before:content-[counter(rules)'.']"><b class="text-custom-200">Platform Abuse Reporting:</b> Report any platform abuse, suspicious behavior, or rule violations.</li> <li class="text-gray-400 counter-increment-rules before:content-[counter(rules)'.']"><b class="text-custom-200">Penalties for Violations:</b> Rule violations may lead to penalties such as disqualification.</li></div></div></div></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-RkSd_942.js.map
