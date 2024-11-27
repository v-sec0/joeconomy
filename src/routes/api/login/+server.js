import {connectToDB} from "$lib/db.js";
import {json} from "@sveltejs/kit";
import bcrypt from 'bcrypt';


export async function POST({ request }) {
	const data = await request.json();
	const db = await connectToDB();
	const users = db.collection("users");
	
	let username = data.username;
	let password = data.password;
	
	if (!username || !password) {
		return json({success: false, message: "No username/password provided."});
	}
	let dbAccount = await users.findOne({username: username});
	
	if (!dbAccount) {
		return json({success: false, message: "Bad username/password."});
	}
	let result = await bcrypt.compare(password, dbAccount.password)

	if (result) {
		return json({ success: true, message: "Authenticated successfully.", id: dbAccount._id });
	} else {
		return json({success: false, message: "Bad username/password."});
	}
}