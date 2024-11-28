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
    "roulette": async ({ request, fetch}) => {
        const requestData = await request.formData();

        let type = requestData.get("type");
        let guessValue;

        if(type == "color"){
            guessValue = requestData.get("color");
        }
        else if(type == "odd-even"){
            guessValue = requestData.get("oddEven");
        }
        else{
            guessValue = requestData.get("number");
        }

        let fetchOpts = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({game: "roulette", guess: type, guessValue: guessValue, bet: requestData.get("joes"), userID: userID})
        }

        const response = await fetch("/api/game", fetchOpts);
        let data = await response.json();
        return {
            message: data.message,
            joes: data.joes
        };
    }
}