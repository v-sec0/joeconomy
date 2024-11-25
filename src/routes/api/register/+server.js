import { connectToDB, closeDB } from "$lib/db.js";
import { json } from "@sveltejs/kit";
import bcrypt from 'bcrypt';


// This handles POST request
export async function POST({ request }) {
	const data = await request.json();
	const username = data.username;
	const password = data.password;
	const saltRounds = 10
	
	// Generate the salt
	let salt = await bcrypt.genSalt(saltRounds)
	
	// Hash the provided password
	let hash = await bcrypt.hash(password, salt)
	
	try {
		const db = await connectToDB();
		const users = await db.collection("users");
		
		const newUsrObj = {
			username: username,
			password: hash,
			joes: 500,
			robCooldown: null,
			inventory: {}
		}
		
		const result = await users.insertOne(newUsrObj);
		if (result) {
			console.log(`User with ID: ${result.insertedId} created`);
			return json({ success: true, message: "User created" });
		} else {
			return json({ success: false, message: "Something went wrong." });
		}
	} finally {
		await closeDB()
	}
}