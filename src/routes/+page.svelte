<script lang="ts">
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';

    export let data;

    let message = '';
    let joesEarned = 0;
    let error = '';

    async function getIncome(type: string) {
        try {
            const response = await fetch(`/api/income/${type}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });
            const result = await response.json();

            if (response.ok) {
                message = result.message;
                joesEarned = result.joesEarned;
                data.user.joes = result.joes;
                error = '';
            } else {
                error = result.error || 'An unknown error occurred';
                message = '';
                joesEarned = 0;
            }
        } catch (err) {
            console.error(`Error getting ${type} income:`, err);
            error = `Error occurred while trying to ${type}`;
            message = '';
            joesEarned = 0;
        }
    }

    function handleLogout() {
        return async ({ result }) => {
            if (result.type === 'redirect') {
                goto(result.location);
            }
        };
    }
</script>

<div class="dashboard">
    <nav>
        <div class="nav-content">
            <span class="dashboard-title">Dashboard</span>
            <div class="user-info">
                <span class="joes-count">Joes: {data.user.joes}</span>
                <span class="welcome-message">Welcome, {data.user.name}</span>
                <form action="?/logout" method="POST" use:enhance={handleLogout}>
                    <button type="submit" class="logout-button">Logout</button>
                </form>
            </div>
        </div>
    </nav>

    <main>
        <div class="income-container">
            <h1>Earn Income</h1>
            <p class="instruction">Choose how you want to earn joes:</p>
            <div class="button-container">
                <button class="action-button work-button" on:click={() => getIncome('work')}>
                    Work
                </button>
                <button class="action-button crime-button" on:click={() => getIncome('crime')}>
                    Crime
                </button>
            </div>
            {#if message}
                <div class="result-message success">
                    <p class="result-title"><strong>Result:</strong></p>
                    <p>{message}</p>
                    <p class="joes-earned">You earned {joesEarned} joes!</p>
                </div>
            {/if}
            {#if error}
                <div class="result-message error">
                    <p class="result-title"><strong>Error:</strong></p>
                    <p>{error}</p>
                </div>
            {/if}
        </div>
    </main>
</div>

<style>
    .dashboard {
        font-family: 'Arial', sans-serif;
        min-height: 100vh;
        background-color: #f0f0f0;
        display: flex;
        flex-direction: column;
    }

    nav {
        background-color: #2c3e50;
        color: white;
        padding: 1rem 0;
    }

    .nav-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .dashboard-title {
        font-size: 1.5rem;
        font-weight: bold;
    }

    .user-info {
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }

    .joes-count {
        font-weight: bold;
        color: #f1c40f;
    }

    .welcome-message {
        font-style: italic;
    }

    .logout-button {
        background-color: #e74c3c;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .logout-button:hover {
        background-color: #c0392b;
    }

    main {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2rem;
    }

    .income-container {
        background-color: white;
        border-radius: 0.5rem;
        padding: 2rem;
        max-width: 500px;
        width: 100%;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    h1 {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 1rem;
        text-align: center;
        color: #2c3e50;
    }

    .instruction {
        text-align: center;
        margin-bottom: 1.5rem;
        color: #7f8c8d;
    }

    .button-container {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }

    .action-button {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 0.25rem;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 1rem;
    }

    .work-button {
        background-color: #3498db;
        color: white;
    }

    .work-button:hover {
        background-color: #2980b9;
        transform: translateY(-2px);
    }

    .crime-button {
        background-color: #e74c3c;
        color: white;
    }

    .crime-button:hover {
        background-color: #c0392b;
        transform: translateY(-2px);
    }

    .result-message {
        border-radius: 0.25rem;
        padding: 1rem;
        text-align: center;
        margin-top: 1rem;
    }

    .result-title {
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
    }

    .result-message.success {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }

    .result-message.error {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }

    .joes-earned {
        font-weight: bold;
        color: #27ae60;
        margin-top: 0.5rem;
    }
</style>

