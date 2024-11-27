<script>
    export let form
</script>

<h1>Flip a Coin</h1>
<form method="POST" action="?/coin-flip">
    <input type="radio" id="heads" name="side" value="heads">
    <label for="heads">Heads</label><br>
    <input type="radio" id="tails" name="side" value="tails">
    <label for="tails">Tails</label><br>
    <label for="joes">How many Joes would you like to bet:</label><br>
    <input type="text" id="joes" name="joes"><br>
    <input type="submit" value="Submit">
</form>

{#if form?.message}
    <p>{form.message}</p>
{/if}
{#if form?.joes}
    {#if form.joes > 0}
        <p>You gained {form.joes} Joes</p>
    {:else if form.joes < 0}
        <p>You lost {form.joes} Joes</p>
    {:else}
        <p>No Joes were gained or lost</p>
    {/if}
{/if}

