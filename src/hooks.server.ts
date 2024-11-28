import {handleSession} from '$lib/session';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    event.locals.session = await handleSession(event);
    return await resolve(event);
}




