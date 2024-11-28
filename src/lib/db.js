import { MONGODB_URI } from '$env/static/private'
import { MongoClient, ServerApiVersion }  from 'mongodb';
const uri = MONGODB_URI;

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	}
});

export async function connectToDB() {
	// Test connection
	await client.connect();
	await client.db("joeconomy").command({ping: 1});

	// After testing establish database variable
	return (client.db("joeconomy"));
	
}

export async function closeDB() {
	await client.close();
}

