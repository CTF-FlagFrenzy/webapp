<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
</script>

<div class=" grid grid-cols-1 mx-8 my-4 lg:grid-cols-2 gap-3.5">
    <div class="flex items-center justify-center h-auto w-full">
        <img alt="The project logo" src={'/images/Slogan.png'} class="object-contain" />
    </div>
    <div class=" flex flex-col justify-center">
        <h1 class="text-custom-200 text-center text-3xl mb-4">Welcome to FlagFrenzy</h1>
        <p class="text-white text-lg text-center">
            The battleground for all cybersecurity enthusiasts! Whether you’re an experienced hacker or just beginning your journey 
            into hacking, this platform is designed to challenge your skills, expand your technical knowledge and push you to think 
            like a true security professional. Compete in a variety of challenges, including Web-Challenges, Cryptography, Reversing, 
            Forensics, OSINT, Steganography and Others, as you race against fellow participants to capture flags and prove your expertise.
        </p>
        <br/>
        <p class="text-white text-lg text-center">
            Success in this competition requires more than just technical skills—it’s about strategy, persistence, and teamwork. Each 
            flag you capture moves you up the leaderboard, but remember that fair play, integrity, and respect for the rules are just 
            as important as winning. Stay sharp, think outside the box, and most importantly, enjoy the thrill of the game. Are you 
            ready to take on the challenge? Let the FlagFrenzy begin!
        </p>
    </div>
</div>

<div class="flex flex-col mb-8 mx-8 bg-custom-110 px-6 py-4 border-2 border-custom-200 rounded-xl shadow-BackdropShadow">
    <h1 class="text-3xl text-center font-bold mb-4 text-custom-200"><span class="italic text-custom-200 opacity-80">#</span>RULES</h1>
    <ul class="list-inside list-decimal text-lg text-white">
        <li class="mb-2">
            <b class="text-custom-200">No Platform Attacks:</b> Participants must not attempt to disrupt or attack the CTF platform infrastructure
            in any way. This includes but is not limited to DDoS attacks, injection attacks, or any other malicious activities targeting the platform's servers or network.
        </li>
        <li class="mb-2 text-gray-400">
            <b class="text-custom-200">No Unauthorized Access:</b> Participants must not attempt to gain unauthorized access to any part of the
            CTF platform system, including backend servers, databases, or administrative interfaces. All access must be within the scope defined by the organizers.
        </li>
        <li class="mb-2">
            <b class="text-custom-200">Prohibition of Teaming:</b> Participants are prohibited from teaming up with individuals or groups outside
            of the designated team structure defined by the organizers. Collaboration should be limited to members of the same team during the competition.
        </li>
        <li class="mb-2 text-gray-400">
            <b class="text-custom-200">Flag Sharing Prohibited:</b> Sharing specific flag solutions or answers with participants from other teams
            during an active competition is strictly prohibited. Each team must solve challenges independently without outside assistance.
        </li>
        <li class="mb-2">
            <b class="text-custom-200">Respect Platform Integrity:</b> Participants must respect the integrity of the CTF platform by refraining
            from attempting to manipulate or exploit vulnerabilities within the platform itself. Any bugs or vulnerabilities discovered should be reported to the organizers immediately.
        </li>
        <li class="mb-2 text-gray-400">
            <b class="text-custom-200">Compliance with Platform Usage Policies:</b> Participants must adhere to all platform usage policies and
            guidelines established by the organizers. This includes rules regarding account usage, submission of flags and any other platform-specific regulations.
        </li>
        <li class="mb-2">
            <b class="text-custom-200">No Script Kiddie Behavior:</b> Participants are expected to demonstrate a basic understanding of cybersecurity
            principles and techniques. Script kiddie behavior, such as blindly running automated tools without understanding their implications, is discouraged.
        </li>
        <li class="mb-2 text-gray-400">
            <b class="text-custom-200">Responsible Disclosure:</b> If participants discover any security vulnerabilities or weaknesses within
            the CTF platform, they are encouraged to responsibly disclose these findings to the organizers rather than exploiting them for personal gain.
        </li>
        <li class="mb-2">
            <b class="text-custom-200">Platform Abuse Reporting:</b> Participants should report any instances of platform abuse, suspicious behavior,
            or rule violations to the organizers promptly. This helps maintain a fair and secure environment for all participants.
        </li>
        <li class="text-gray-400">
            <b class="text-custom-200">Penalties for Violations:</b> Violations of platform-specific rules may result in penalties such as point
            deductions, disqualification, or banning from future competitions, depending on the severity and frequency of the offense.
        </li>
    </ul>
</div>