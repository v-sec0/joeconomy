<script>
    export let form
</script>

<div class="container">
    <div class="card">
        <div class="header">
            <h2>Login</h2>
            <p>Enter your credentials to access your account</p>
            {#if form?.message }
                <p>{form.message}</p>
            {/if}
        </div>
        <form method="POST" action="?/login">
            <div class="form-group">
                <label for="username">Username</label>
                <input
                        id="username"
                        type="text"
                        name="username"
                        required
                />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input
                        id="password"
                        type="password"
                        name="password"
                        required
                />
            </div>
            <div class="button-group">
                <button type="submit" class="primary">Log in</button>
                <button formaction="?/register" class="secondary">Sign up</button>
            </div>
        </form>
    </div>
</div>

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
</style>