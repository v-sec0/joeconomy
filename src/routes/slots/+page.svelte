<script>
    export let form
</script>

<h1>Slots</h1>
<form method="POST" action="?/slots">
    <label for="joes">How many Joes would you like to bet:</label><br>
    <input type="text" id="joes" name="joes"><br>
    <input type="submit" value="Spin">
</form>

{#if form?.result}
    {#each form.result as _, symbol}
        <p>{form.result[symbol]}</p>
    {/each}
{/if}
{#if form?.message}
    <p>{form.message}</p>
{/if}

<h3>Key:</h3>
<ul>
    <li>🍉 X 1</li>
    <li>🍋 X 2</li>
    <li>🍒 X 10</li>
    <li>🔔 X 100</li>
    <li>7️⃣ X 1000</li>
</ul>


