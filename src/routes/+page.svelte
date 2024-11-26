<script>
    export let data
</script>
<h1>Welcome</h1>
{#if data}
    <p>Hello, {data.username}</p>
{/if}