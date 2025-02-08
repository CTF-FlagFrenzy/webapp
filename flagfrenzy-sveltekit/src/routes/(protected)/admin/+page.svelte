<a href="http://localhost:8000/docs" target="_blank">Fast API</a>
<script>
    let allFlags;
    
 async function loadFlags() {
      try {
        const response = await fetch(`/api/anti-cheat`, {
          method: "GET",
      
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          }
     });
    allFlags = await response.json();
    console.log(allFlags);
      if (!response.ok) {
        throw new Error("Flags konnten nicht geladen werden.");
      }
    } catch (error) {
      console.log(error.message || "Es ist ein unbekannter Fehler aufgetreten.");
    }
  }

</script>
<style>
    a {
        color: white;
    }
</style>