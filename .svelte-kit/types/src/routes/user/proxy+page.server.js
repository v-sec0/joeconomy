// @ts-nocheck
/** @param {Parameters<import('./$types').PageLoad>[0]} event */
export async function load({ params, fetch }) {
    const response = await fetch("/api/allUsers");
    let data = await response.json();
    return {
        usernames: data.usernames,
        links: data.links
    };
}