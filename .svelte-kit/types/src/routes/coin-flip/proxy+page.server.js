// @ts-nocheck
import { redirect } from '@sveltejs/kit'

let userID = '';

export async function load({ locals }) {
    if (locals.session.user.userID === '') {
        redirect (302, "/login")
    } else {
        userID = locals.session.user.userID;
    }
}

/** */
export const actions = {
    "coin-flip": async ({ request, fetch}) => {
        const requestData = await request.formData();
        let fetchOpts = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({game: "coin", guess: requestData.get("side"), bet: requestData.get("joes"), userID: userID})
        }

        const response = await fetch("/api/game", fetchOpts);
        let data = await response.json();
        return {
            message: data.message,
            joes: data.joes
        };
    }
}