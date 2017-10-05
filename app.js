var mongo = require("mongodb").MongoClient;
var prompt = require("prompt-sync")();
var url = "mongodb://localhost:27017/restaurant_db";

mongo.connect(url, function(err, db){
  var collection = db.collection('restaurants');

  function startChoice() {
	  var choose = prompt("***Press ENTER after finishing!!!***  What do you want to do to the restaurants database? Type select all, select one, insert one, update one, or delete one to continue: ");
		if(choose == 'select all'){
			selectAll();
		};
		if(choose == 'select one'){
			selectOne();
		};
		if(choose == 'insert one'){
			insertOne();
		};
		if(choose == 'update one'){
			updateOne();
		};
		if(choose == 'delete one'){
			deleteOne();
		};
	};

	startChoice();

  function selectAll() {
	  var allChoice = prompt("Type 'all' and press enter to display all restaurants' names: ");
	  if(allChoice == "all"){
	    collection.find().toArray(function(err, doc){
	    	console.log("The current restaurants database: ");
	      console.log(doc);
	    });
	  }
	  else {
	    console.log("Aw, you don't want to see the restaurants?");
	  }
	  startChoice();
	};

	function selectOne() {
		var nameChoice = prompt("Type the restaurant 'name' and press enter to display your desired restaurant: ");
		collection.find({name: nameChoice}).toArray(function(err, doc){
			console.log("Your selection: ");
			console.log(doc);
		});
		startChoice();
	};

	function insertOne() {
		var nameInsert = prompt("Type the restaurant name and press enter to add to the database: ");
		var addressInsert = prompt("Type the restaurant address and press enter to add to the database: ");
		var yelpInsert = prompt("Type the restaurant yelp and press enter to add to the database: ");
		collection.insert({name: nameInsert, address: addressInsert, yelp: yelpInsert});
		collection.find({name: nameInsert}).toArray(function(err, doc){
			console.log("Your new restaurant has been added: ");
			console.log(doc);
		});
		startChoice();
	};

	function updateOne() {
		var name = prompt("Type the restaurant name and press enter to update a restaurant: ");
		var updateType = prompt("What do you want to update? Enter name, address, or yelp: ");
		if(updateType == 'name'){
			var newName = prompt("Please enter the new name: ");
			collection.update(
				{name: name}, 
				{
					$set:{name: newName}
				}
			);
			collection.find({name: newName}).toArray(function(err, doc){
				console.log("")
				console.log(doc);
			});
		};
		if(updateType == 'address'){
			var newAddress = prompt("Please enter the new address: ");
			collection.update(
				{name: name}, 
				{
					$set:{address: newAddress}
				}
			);
			collection.find({name: name}).toArray(function(err, doc){
				console.log(doc);
			});
		};
		if(updateType == 'yelp'){
			var newYelp = prompt("Please enter the new yelp: ");
			collection.update(
				{name: name}, 
				{
					$set:{yelp: newYelp}
				}
			);
			collection.find({name: name}).toArray(function(err, doc){
				console.log(doc);
			});
		};
		startChoice();
	};

	function deleteOne () {
		var nameChoice = prompt("Please type the name of the restaurant you want to delete from the database: ");
		collection.remove({name: nameChoice});
		collection.find().toArray(function(err, doc){
			console.log(doc);
		});
		startChoice();
	};

	collection.find().toArray(function(err,doc){
		console.log("This is the current restaurants database! Have a nice day!")
		console.log(doc);
	});	
});