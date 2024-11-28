import { connectToDB } from "$lib/db.js";
import { json } from "@sveltejs/kit";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "$env/static/private";

export async function POST({ request }) {
	const data = await request.json();
	const db = await connectToDB();
	const users = db.collection("users");

	let username = data.username;
	let password = data.password;
	if (!username || !password) {
		return json({success: false, message: "No username/password provided."}, { status: 400 });
	}

	let dbAccount = await users.findOne({username: username});
	if (!dbAccount) {
		return json({success: false, message: "Invalid username or password."}, { status: 401 });
	}

	let result = await bcrypt.compare(password, dbAccount.password)
	if (result) {
		const token = jwt.sign(
			{
				userID: dbAccount._id.toString(),
				username: dbAccount.username
			},
			JWT_SECRET,
			{ expiresIn: '30d' }
		);

		return json({
			success: true,
			message: "Authenticated successfully.",
			token: token
		});
	} else {
		return json({success: false, message: "Invalid username or password."}, { status: 401 });
	}
}

