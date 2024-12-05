<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    export let data;
</script>

<p>{data.username}, {data.email}, {data.givenname}, {data.surname}</p>