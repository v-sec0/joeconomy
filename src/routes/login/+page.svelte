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
        <div class="divider">
            <span>Or continue with</span>
        </div>
        <button class="google-button">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
        </button>
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