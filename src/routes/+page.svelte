<script>
    export let data
</script>
<h1>Welcome</h1>
{#if data?.userID}
    <p>Hello, your user ID is: {data.userID}</p>
{/if}