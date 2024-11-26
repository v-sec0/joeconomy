/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
    const response = await fetch("/api/allUsers");
    let data = await response.json();
    return {
        usernames: data.usernames,
        links: data.links
    };
}