import { dev } from '$app/environment';

export function createSession(event, token) {
    event.cookies.set('session', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: !dev,
        maxAge: 60 * 60 * 24 * 30 // 30 days
    });
}

export async function handleSession(event) {
    const token = event.cookies.get('session');

    if (!token) {
        return { user: null };
    }

    // Here you would typically validate the token
    // For now, we'll assume it's valid and contains the user info
    try {
        const user = JSON.parse(atob(token.split('.')[1]));
        return { user };
    } catch (err) {
        console.error('Error parsing session token:', err);
        return { user: null };
    }
}

