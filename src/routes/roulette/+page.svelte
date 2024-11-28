<script>
    export let form

    let selectedType = 'color';
    let selectedColor = 'red';
    let selectedOddEven = 'odd';
    let numberValue = '';
    
    const colors = ['red', 'black'];
    const oddEven = ['odd', 'even'];
    const types = ['color', 'odd-even', 'number'];
</script>

<h1>Roulette</h1>
<form method="POST" action="?/roulette">
    <!-- Type Selection -->
    {#each types as type}
      <label>
        <input
          type="radio"
          name="type"
          value={type}
          bind:group={selectedType}
          required
        />
        {type}
      </label>
    {/each}
    <br>
    <!-- Dynamic Controls -->
    {#if selectedType === 'color'}
      {#each colors as color}
        <label>
          <input
            type="radio"
            name="color"
            value={color}
            bind:group={selectedColor}
            required
          />
          {color}
        </label>
      {/each}
    {:else if selectedType === 'odd-even'}
      {#each oddEven as choice}
        <label>
          <input
            type="radio"
            name="oddEven"
            value={choice}
            bind:group={selectedOddEven}
            required
          />
          {choice}
        </label>
      {/each}
    {:else if selectedType === 'number'}
      <label>
        <input
          name="number"
          type="number"
          bind:value={numberValue}
          placeholder="Enter a number"
          required
        />
      </label>
    {/if}
    <br>
    <label for="joes">How many Joes would you like to bet:</label><br>
    <input type="text" id="joes" name="joes"><br>
    <br>
    <button type="submit" class="primary">Spin!</button>
  </form>

{#if form?.message}
    <p>{form.message}</p>
{/if}

