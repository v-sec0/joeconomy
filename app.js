require('dotenv').config();

// Const declarations
const bcrypt = require('bcrypt');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const uri = process.env.MONGODB_URI;
const port = process.env.PORT;

const saltRounds = 10;


// Express settings
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public/'));

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

//Register front end page
app.get("/register", async (req, res) =>{
	res.sendFile(__dirname + '/public/register.html');
});

//Back end link to actually processes registering
app.post("/register", async (req, res) =>{
	let username = req.body.username;
	let password = req.body.password;
	let passwordHash = "";
	let success = true;

	bcrypt.genSalt(saltRounds, (err, salt) => {
		if (err) {
			console.log("Salt error");
			success = false;
			return;
		}

		bcrypt.hash(password, salt, (err, hash) => {
			if (err) {
				console.log("Hash error");
				success = false;
				return;
			}
			passwordHash = hash;
		});
	});

	try {
		await client.connect();
		const database = client.db("joeconomy");
		const users = database.collection("users");

		const newUser = {
			username: username,
			password: passwordHash,
			joes: 500,
			robCooldown: null ,
			inventory: {}
		}

		const result = await users.insertOne(newUser);
		console.log(`A new user was created with the _id: ${result.insertedId}`);
	  } finally {
		await client.close();
	  }

	res.json({success: success});
});

//View a specific account
app.get("/account/{:id}", async (req, res) =>{
	res.json({test: "account reached " + req.params.id});
});


app.listen(port, () => console.log(`Server is running...on ${ port }` ));
