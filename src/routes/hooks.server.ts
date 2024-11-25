import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '$env/static/private';
import type {Handle} from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	console.log("Test")
	const session_token = event.cookies.get('session_token');

	if (session_token) {
		try {
			const decoded = jwt.verify(session_token, JWT_SECRET) as { user: string };
			event.locals.user = decoded.user;
		} catch (error) {
			console.error('Invalid token:', error);
			event.cookies.delete('session_token', { path: '/' });
			event.locals.user = '';
		}
	} else {
		event.locals.user = '';
	}

	return resolve(event);
};

