<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    export let data;
</script>

<p class="text-center">{data.username}, {data.email}, {data.givenname}, {data.surname}</p>