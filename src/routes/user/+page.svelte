<script>
    export let data
</script>

<h1>All Users</h1>
{#if data}
    {#each data.links as link}
        <a href="{link}">{data.usernames[data.links.indexOf(link)]}</a><br>
    {/each}
{/if}

