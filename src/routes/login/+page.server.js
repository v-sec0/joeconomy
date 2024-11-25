import jwt from 'jsonwebtoken';
import { JWT_SECRET, ENVIRON } from "$env/static/private";
import { redirect, fail } from "@sveltejs/kit";



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
				return fail(response.status, {message: errorData.message});
			}
			
			const responseData = await response.json();
			
			if (responseData.success) {
				const token = jwt.sign(
					{ username: username },
					JWT_SECRET,
					{ expiresIn: '30d' }
				);
				
				cookies.set('session_token', token, {
					httpOnly: true,
					path: '/',
					secure: ENVIRON === 'production',
					sameSite: 'strict',
					maxAge: 60 * 60 * 24 * 30
				});
				
				throw redirect(303, "/")
			} else {
				return fail(401, { message: 'Invalid credentials' });
			}
		} catch (error) {
			if (error.status === 303) {
				throw error;
			} else {
				console.log(`Login Error: ${error.message}`);
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
		} catch (error) {
			console.error('Registration error:', error);
			return fail(500, { message: 'An error occurred during registration' });
		}
	}
};