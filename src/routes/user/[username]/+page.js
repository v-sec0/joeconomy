/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
    let fetchOpts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: params.username})
    }

    const response = await fetch("/api/user", fetchOpts);
    let userData = await response.json();
    return {
        username: userData.username,
        joes: userData.joes,
        inventory: userData.inventory
    };
}