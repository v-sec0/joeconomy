import { json } from '@sveltejs/kit';
import { connectToDB } from "$lib/db.js";
import { ObjectId } from "mongodb";

export async function PUT({ params, locals }) {
	const { type } = params;
	
	if (!locals.user) {
		return json({ error: "User not authenticated" }, { status: 401 });
	}
	
	try {
		const db = await connectToDB();
		const users = db.collection("users");
		
		const userID = ObjectId.createFromHexString(locals.user);
		
		let message = "";
		const joesEarned = 5; // Fixed amount for now
		
		switch (type) {
			case "work":
				message = "You worked hard and earned some joes!";
				break;
			case "crime":
				message = "You committed a crime and got away with some joes!";
				break;
			default:
				return json({ error: "Invalid income type" }, { status: 400 });
		}
		
		// Update user's joes in the database
		const result = await users.findOneAndUpdate(
			{ _id: userID },
			{ $inc: { joes: joesEarned } },
			{ returnDocument: 'after' }
		);
		
		if (!result) {
			return json({ error: "User not found" }, { status: 404 });
		}
		
		return json({
			message: message,
			joes: result.joes,
			joesEarned: joesEarned
		});
		
	} catch (error) {
		console.error("Error processing income:", error);
		return json({ error: "Internal server error" }, { status: 500 });
	}
}

