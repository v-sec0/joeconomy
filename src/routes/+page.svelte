<script>
    export let data
</script>
<h1>Welcome</h1>
{#if data?.user}
    <p>Hello, {data.user}</p>
{/if}