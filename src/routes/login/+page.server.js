import { redirect, fail } from "@sveltejs/kit";
import { createSession } from "$lib/session.js";

export const actions = {
	login: async ({ request, fetch, cookies }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		if (!username || !password) {
			return fail(400, { message: 'Username and password are required' });
		}

		try {
			const response = await fetch("/api/login", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password })
			});

			if (!response.ok) {
				const errorData = await response.json();
				return fail(response.status, { message: errorData.message });
			}

			const responseData = await response.json();
			if (responseData.success) {
				// Create session using the token from the API response
				createSession({ cookies }, responseData.token);

				throw redirect(303, "/")
			} else {
				return fail(401, { message: 'Invalid credentials' });
			}
		} catch (err) {
			if (err.status === 303) {
				throw err;
			} else {
				console.error(`Login Error: ${err.message}`);
				return fail(500, { message: 'An error occurred during login' });
			}
		}
	},

	register: async ({ request, fetch }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		if (!username || !password) {
			return fail(400, { message: 'Username and password are required' });
		}

		try {
			const response = await fetch("/api/register", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password })
			});

			const responseData = await response.json();

			if (responseData.success) {
				return { success: true, message: 'Registration successful' };
			} else {
				return fail(400, { message: responseData.message || 'Registration failed' });
			}
		} catch (err) {
			console.error('Registration error:', err);
			return fail(500, { message: 'An error occurred during registration' });
		}
	}
};

