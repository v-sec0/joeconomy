<script>
    import { goto } from '$app/navigation';
    import {redirect} from "@sveltejs/kit";

    export let data

    async function handleLogout() {
        const response = await fetch('/api/logout', { method: 'POST' });
        if (response.ok) {
            window.location.href = "/";
        } else {
            console.error('Logout failed');
        }
    }
</script>

<h1>Welcome to Joeconomy</h1>

<p>Username {data.user.username}</p>
<p>Joes: {data.user.joes}</p>
<button on:click={handleLogout}>Logout</button>