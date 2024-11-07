<script>
	import Logo from '$lib/images/logo.png';
</script>

<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet"/>
<body>
    <header>
        <img alt="The project logo" src={Logo} />
        <nav>
            <a href="/challenges">Challenges</a>
            <a href="/scoreboard">Scoreboard</a>
            <a href="/team">Team</a>
        </nav>
        <button>Login</button>
    </header>
    
    <main>
        <slot />
    </main>
</body>

<style>
    header {
        background-color: #40424B;
        display: flex;
        justify-content: space-between;
        padding: 1% 1% 1% 1%;
        color: #F3CC59;
    }
    header img {
        max-width: 20%;
        height: auto;
        object-fit: contain;
    }
    nav {
        display: flex;
        align-items: center;
        gap: 30%;
        font-size: 200%;
        max-width: 20%;
        height: auto;
    }
    header button {
        color: #F3CC59;
        border-style: solid;
        border-width: 3px;
        border-radius: 30px;
        border-color: #F3CC59;
        font-size: 200%;
        max-width: 20%;
        height: auto;
        padding: 0% 2% 0% 2%;
    }
    body {
        background-color: #333640;
        height: 100%;
    }
</style>
