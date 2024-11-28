import { json } from '@sveltejs/kit';
import {dev} from "$app/environment";


export async function POST({ cookies }) {
    cookies.delete('session', {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: !dev
    });
    return json({ success: true });
}
