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
	let result = "";

	switch(game){
		case "coin":
			[message, joes] = await coin(bet, guess, userID);
			break;
		case "slots":
			[message, joes, result] = await slots(bet, userID);
			break;
		default:
			console.log("ERROR: GAME NOT FOUND");
	}

	

	return json({ success: true, message: message, joes: joes, result: result});
}

//Flip a coin, win double if you guess right win none if you guess wrong
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

async function slots(bet, ID){
	const db = await connectToDB();
	const users = db.collection("users");
	ID = new ObjectId(ID);

	let message = "";
	let netGain = 0;
	let slots = [["", "", ""],["", "", ""],["", "", ""]]
	let matches = [];
	let jackpot = false;

	//Spin the slots
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3; j++){
			//Generate a random number for a symbol
			let symbolNum = Math.floor(Math.random() * 76);
			let symbolResult = "";

			//Assign the symbol
			if(symbolNum == 0){
				symbolResult = "7️⃣";
			}
			else if(symbolNum < 6){
				symbolResult = "🔔";
			}
			else if(symbolNum < 21){
				symbolResult = "🍒";
			}
			else if(symbolNum < 41){
				symbolResult = "🍋";
			}
			else{
				symbolResult = "🍉";
			}

			//Put in in the slots result
			slots[i][j] = symbolResult;
		}
	}

	//	Check every row for a match

	// Check horizontal rows
	for (let i = 0; i < 3; i++) {
		if (slots[i][0] === slots[i][1] && slots[i][1] === slots[i][2]) {
			matches.push(slots[i][0]);
		}
	}
	// Check vertical columns
	for (let j = 0; j < 3; j++) {
		if (slots[0][j] === slots[1][j] && slots[1][j] === slots[2][j]) {
			matches.push(slots[0][j]);
		}
	}
	// Check diagonal (top-left to bottom-right)
	if (slots[0][0] === slots[1][1] && slots[1][1] === slots[2][2]) {
		matches.push(slots[0][0]);
	}
	// Check diagonal (top-right to bottom-left)
	if (slots[0][2] === slots[1][1] && slots[1][1] === slots[2][0]) {
		matches.push(slots[0][2]);
	}

	//Reward user for matches
	if(matches.length == 0){
		netGain -= bet;
	}
	else{
		for(var i = 0; i < matches.length; i++){
			if(matches[i] == "7️⃣"){
				netGain += (bet * 1000);
				jackpot = true;
			}
			else if(matches[i] == "🔔"){
				netGain += (bet * 100);
			}
			else if(matches[i] == "🍒"){
				netGain += (bet * 10);
			}
			else if(matches[i] == "🍋"){
				netGain += (bet * 2);
			}
			else if(matches[i] == "🍉"){
				netGain += (bet * 1);
			}
		}
		netGain -= bet;
	}


	//Result message
	if(netGain >= 0){
		if(matches.length > 1){
			message = "You got " + matches.length + " matches and won " + netGain + " joes overall."
		}
		else{
			message = "You got 1 match and won " + netGain + " joes overall."
		}
	}
	else if(jackpot){
		message = "JACKPOT!!! YOU WON " + (netGain + bet) + " JOES!!!";
	}
	else{
		message = "It's a bust! You lost your bet of " + bet + " joes.";
	}

	await users.updateOne({_id: ID}, { $inc: { joes: netGain } });
	return [message, netGain, slots];
}