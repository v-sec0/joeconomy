import {connectToDB} from "$lib/db.js";
import {json} from "@sveltejs/kit";
import {ObjectId} from "mongodb"


export async function POST({ request }) {
	const data = await request.json();
	let game = data.game;
	let guess = data.guess;
	let bet = data.bet;
	let userID = data.userID;

	let message = "";
	let joes = 0;

	switch(game){
		case "coin":
			[message, joes] = await coin(bet, guess, userID);
			break;
		default:
			console.log("ERROR: GAME NOT FOUND");
	}

	

	return json({ success: true, message: message, joes: joes});
}

async function coin(bet, guess, ID){
	const db = await connectToDB();
	const users = db.collection("users");
	ID = new ObjectId(ID);

	let result = "";
	let netGain = 0;
	//Generate a random number between 0 and 1
	let randomResult = Math.floor(Math.random() * 2);

	//Classify result as heads or tails
	if(randomResult == 0){
		result = "Heads"
	}
	else{
		result = "Tails"
	}

	//Find out if the user won
	if(result == "Heads" && guess == "heads"){
		netGain = bet * 2;
	}
	else if(result == "Tails" && guess == "tails"){
		netGain = bet * 2;
	}
	else{
		netGain = 0 - bet;
	}
	await users.updateOne({_id: ID}, { $inc: { joes: netGain } });
	return [result, netGain];
}