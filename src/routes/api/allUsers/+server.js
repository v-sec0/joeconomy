import {connectToDB} from "$lib/db.js";
import {json} from "@sveltejs/kit";
import bcrypt from 'bcrypt';


export async function GET({ request }) {
	const db = await connectToDB();
	const users = db.collection("users");
	let links = [];

	let mongoQuery = await users.find().toArray();

	let allUsers = mongoQuery.map(user => user.username);
	allUsers.forEach((element) => links.push("/user/" + element));
	
	return json({ success: true, usernames: allUsers, links: links});
	
}