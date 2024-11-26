<script>
    export let data
</script>

{#if data}
    <p>Username: {data.username}</p>
    <p>Joes: {data.joes}</p>
    <p>Inventory:</p>
    {#each Object.entries(data.inventory) as [item, quantity]}
        <p>{item}: {quantity}</p>
    {/each}
{/if}


<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background-color: #f3f4f6;
    }

    .card {
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 2rem;
        width: 100%;
        max-width: 400px;
    }

    .header {
        text-align: center;
        margin-bottom: 1.5rem;
    }

    h2 {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    p {
        color: #6b7280;
        font-size: 0.875rem;
    }

    .form-group {
        margin-bottom: 1rem;
    }

    label {
        display: block;
        font-size: 0.875rem;
        font-weight: 500;
        margin-bottom: 0.5rem;
    }

    input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        font-size: 1rem;
    }

    input:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .button-group {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }

    button, .secondary {
        flex: 1;
        padding: 0.5rem;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        text-align: center;
        text-decoration: none;
    }

    .primary {
        background-color: #3b82f6;
        color: white;
    }

    .primary:hover {
        background-color: #2563eb;
    }

    .secondary {
        background-color: white;
        color: #3b82f6;
        border: 1px solid #3b82f6;
    }

    .secondary:hover {
        background-color: #eff6ff;
    }

    .divider {
        display: flex;
        align-items: center;
        text-align: center;
        margin: 1rem 0;
    }

    .divider::before,
    .divider::after {
        content: '';
        flex: 1;
        border-bottom: 1px solid #d1d5db;
    }

    .divider span {
        padding: 0 0.5rem;
        color: #6b7280;
        font-size: 0.875rem;
    }

    .google-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        background-color: white;
        color: #374151;
        font-size: 1rem;
        cursor: pointer;
    }

    .google-button:hover {
        background-color: #f9fafb;
    }

    .google-button svg {
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 0.5rem;
    }
</style>