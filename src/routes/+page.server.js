import { redirect } from '@sveltejs/kit';
import { connectToDB } from "$lib/db.js";
import { ObjectId } from "mongodb";

export async function load({ locals, cookies }) {
    if (!locals.session.user) {
        throw redirect(302, "/login");
    } else {
        // If user is verified
        const userData = locals.session.user;
        const db = await connectToDB();
        const user = await db.collection("users");
        
        // Connect and retrieve user information
        const userID = ObjectId.createFromHexString(userData.userID);
        const userAcc = await user.findOne({_id: userID});
        
        return {
            user: {
                id: userAcc._id.toString(),
                username: userAcc.username,
                joes: userAcc.joes
            }
        };
    }
}




