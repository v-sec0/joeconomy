import {connectToDB} from "$lib/db.js";
import {json} from "@sveltejs/kit";
import bcrypt from 'bcrypt';


export async function POST({ request }) {
	const data = await request.json();

	let pageUsername = data.username;
	const db = await connectToDB();
	const users = db.collection("users");

	let username = "";
	let joes = "";
	let inventory = "";

	let user = await users.findOne({username: pageUsername});


	if(user){
		username = user.username;
		joes = user.joes;
		inventory = user.inventory;
	}
	else{
		username = "User not found";
	}

	return json({ success: true, username: username, joes: joes, inventory: inventory});
}