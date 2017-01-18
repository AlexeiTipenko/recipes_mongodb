/*
Name: Alexei Tipenko (100995947)
Date: Friday, December 9th, 2016

* Developed in MacOS *
* Tested with Chrome browser *

Program: This is a database-backed web app that uses Node.js,
	 Express, Pug, and Mongo. The app is for dispaying
	 and updating recipes using Pug templating in the front end
	 and MongoDB for storage on the back end.
*/

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
const ROOT = "./public_html";

// create http server
app.set('views', './views');
app.set('view engine', 'pug');



app.use(function(req, res, next) {
	console.log(req.method + " request for " + req.url);
	next();
});


//Serving the main page
app.get(['/','/home','/index.html','/index'], function(req,res){
	res.render('index');
});

//Sending an object containing the recipe list
app.get("/recipes", function(req,res){
	//connect to the db
	MongoClient.connect("mongodb://localhost:27017/recipeDB", function(err,db){
		if(err) res.sendStatus(500);

		else{
			var recipeList = [];																							//empty list of recipes
			var collection = db.collection("Recipes");
			var cursor = collection.find();
			cursor.each(function(err,doc){

				if(err){
					res.sendStatus(500);
					db.close();
				}

				else if(doc == null ){																					//If document is null
					res.send({names : recipeList});																	//return the list of recipes
					db.close();
				}

				else {																													//If document isn't empty yet
					recipeList.push(doc.name);																			//add document name to the list
				}
			});
		}
	});
});


//Sending a specific recipe
app.get("/recipe/:name", function(req,res){
	//connect to the db
	MongoClient.connect("mongodb://localhost:27017/recipeDB", function(err,db){
		if(err){
			console.log("Could not connect to recipeDB.");
			res.sendStatus(500);
			db.close();
		}else{

			var recipeQuery = req.params.name;
			var collection = db.collection("Recipes");

			db.collection("Recipes").findOne({name:recipeQuery}, function(err, doc){	//return a single recipe doc

				if(err){
					console.log("Error: ",err);
					res.sendStatus(404);
				}
				else{
					res.send(doc);
					db.close();
				}
			});
		}
	});
});

//Body parser
app.use("/recipe", bodyParser.urlencoded({extended:true}));


//Insert or update recipe into mongo database
app.post("/recipe", function(req,res){
	//connect to the db
	MongoClient.connect("mongodb://localhost:27017/recipeDB",function(err,db){
		if(err){
			console.log("Could not connect to recipeDB.");
			res.sendStatus(500);
			db.close();
		}else{

			var collection = db.collection("Recipes");

			if(req.body.name === "") {				//if name is empty
				res.sendStatus(400);
				db.close();
			}

			else {
				collection.update({name:req.body.name}, req.body, {upsert: true}, function(err, result){
				//if file exists, update it. eitherwise, make new file 'req.body'
					if (err) {
						console.log("Insert failed: ",err);
						res.sendStatus(500);
					}
					else res.sendStatus(200);
					db.close();
				});
			}
		}
	});
});

app.use(express.static(ROOT));

app.all("*", function(req, res) {
	res.sendStatus(404);
});

//Listening on port 2406
app.listen(2406, function() {console.log("Server listening on port 2406");});
