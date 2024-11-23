require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public/'));
const uri = process.env.MONGODB_URI;
const port = 8000;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	}
});

async function run() {
	try {
		// Connect the client to the server	(optional starting in v4.7)
		await client.connect();
		// Send a ping to confirm a successful connection
		await client.db("joeconomy").command({ ping: 1 });
		console.log("Pinged your deployment. You successfully connected to MongoDB!");
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}
run().catch(console.dir);

//Home page
//Automatically sends to login if not logged in
app.get("/", async (req, res) =>{
	res.sendFile(__dirname + '/index.html');
});

//Log in front end page
app.get("/login", async (req, res) =>{
	res.json({test: "login reached"});
});

//Back end link to actually process logging in
app.post("/login", async (req, res) =>{
	res.json({test: "login reached"});
});

//View a specific account
app.get("/account?:id", async (req, res) =>{
	res.json({test: "account reached " + req.params.id});
});


app.listen(port, () => console.log(`Server is running...on ${ port }` ));
