import { json, redirect } from '@sveltejs/kit';

export const actions = {
	login: async ({ request, fetch }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');
		
		let fetchOpts = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({username, password})
		}
		
		const response = await fetch("/api/login", fetchOpts);
		const responseData = await response.json();
		
		if (responseData.success) {
			redirect(302, "/");
			event.cookies.set("username", username);
		} else {
			return responseData;
		}
		
	},
	register: async ({ request, fetch }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');
		
		let fetchOpts = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({username, password})
		}
		
		const response = await fetch("/api/register", fetchOpts);
		const responseData = await response.json();
		
		return responseData;
	}
};