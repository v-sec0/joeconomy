import type {Handle} from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '$env/static/private'


export const handle: Handle = async ({ event, resolve }) => {
    // Get token from request. Event represents the request
    const token = event.cookies.get('session_token');
    if (!token) {
        // If no token then user is not logged in
        // @ts-ignore
        event.locals.user = null;
    } else {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            event.locals.user = {
                // @ts-ignore
                username: decoded.username,
                // @ts-ignore
                id: decoded.id
            };
        } catch (err) {
            event.cookies.delete('session_token', {path: '/'})
            //@ts-ignore
            event.locals.user = null;
        }
    }

    return resolve(event);
};