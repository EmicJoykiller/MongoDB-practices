/* create and drop databases  */

use("libraryDB");
db.books.insertOne({
  title: "Gone with the wind",
});

use("libraryDB");
db.books.find();

use("libraryDB");
db.books.insertOne({
  title: "Gone with the wind",
});
db.books.find();

/* drop collection */

use("libraryDB");
db.books.drop();

/*recreate collection books and authors */

use("libraryDB");
db.books.insertOne({
  title: "Gone with the wind",
});

db.authors.insertOne({
  a_name: "jsjsj",
  DOB: "jan 1",
});
db.authors.find();

/*1.4, inserting a 2nd document into the books collection. this time we will supply an ID field */
use("libraryDB");
db.books.insertOne({ _id: 2345, title: "Lord of the rings", pub_year: 1954 });

/*Bulk inserting documents */

use("vehicleDB");
db.cars.insertMany([
  {
    brand: "toyota",
    model: "corolla",
    ndoors: 2,
  },
  {
    brand: "ford",
    model: "mmustang",
    ndoors: 4,
  },
]);

db.cars.find();

/*deleting specific document */
use("vehicleDB");
db.cars.deleteOne({ brand: "toyota" });

/*updating document:
replaceOne()
updateMany()
update Modifiers: with '$inc', '$set', '$unset' */

//replaceOne: to replace a specific existing document with a new one

use("libraryDB");
db.authors.replaceOne(
  {
    a_name: "jsjsj",
    DOB: "jan 1",
  },
  {
    a_name: "jsjsj",
    DOB: "jan 1",
    award_name: "pulitzer prize",
    year: 1999,
    current_city: "new york",
  }
);

//updateMany()
use("libraryDB");
db.authors.updateMany({ a_name: "jsjsj" }, { $set: { current_city: "rome" } });

// update mpodifires
/*if we want to update the values of a specific whithin a document
we can use update modifires to alter add or remove a key's value 

1- update() with '$inc': increament values by a specified ampunt


2- update() with $set : up[date a specified field without replacing the entire document
if the key provided does not match it will crrat it
the $set operator can be used to up[date an emmbeded document


3-update() with $unset: remove a key from the document
*/

use("blogDB");

db.analytics.insertMany([
  {
    url: "www.blogspot.com/blog1",
    pageviews: 52,
    likes: 4,
    comments: 1,
    b_author: "John Smith",
  },
  {
    url: "www.blogspot.com/blog2",
    pageviews: 1030,
    likes: 180,
    comments: 7,
    b_author: "Anne Marie",
  },
  {
    url: "www.blogspot.com/blog3",
    pageviews: 30,
    likes: 5,
    comments: 3,
    b_author: "Fred Jones",
  },
  {
    url: "www.blogspot.com/blog4",
    pageviews: 5,
    likes: 1,
    comments: 0,
    b_author: "Anne Marie",
  },
]);

db.posts.insertMany([
  {
    title: "On Golden Pond",
    url: "www.blogspot.com/blog2",
    content:
      "In the film, Norman (Henry Fonda) is a curmudgeon with an estranged " +
      "relationship with his daughter Chelsea (Jane Fonda). At Golden Pond, " +
      "he and his wife nevertheless agree to care for Billy, the son of Chelsea's " +
      "new boyfriend, and a most unexpected relationship blooms.",
    author: {
      a_name: "Anne Marie",
      a_email: "am@gmail.com",
      a_city: "Springfield",
    },
  },
]);

db.analytics.find();

//

use("blogDB");
db.analytics.update(
  { url: "www.blogspot.com/blog2" },
  { $inc: { pageviews: 1 } }
);
db.analytics.find({ url: "www.blogspot.com/blog2" });

//

use("blogDB");
db.analytics.update(
  { url: "www.blogspot.com/blog4" },
  { $set: { pageviews: 20 } }
);
db.analytics.find({ url: "www.blogspot.com/blog4" });

// for anne marie 2nd blog add a homepage field with a value of /index.html
use("blogDB");
db.analytics.update(
  { url: "www.blogspot.com/blog4" },
  { $set: { homepage: "/index.html" } }
);
db.analytics.find({ url: "www.blogspot.com/blog4" });

//change the name if the author of the blog on golden pond to anne marie davis

use("blogDB");
db.posts.update(
  { title: "On Golden Pond" },
  { $set: { "author.a_name": "Anne Marie Davis" } }
);

db.posts.find({ title: "On Golden Pond" });

/////////////////// Harry Potter database
/*
1.find()
2.wildcards
3.comparators (includes IN, NOT IN)
4.BETWEEN
5.$EXIST
6.NULL
7.$IN
8.$NIN
9.$AND
10.$OR
*/

use("HarryPotterDB");
db.FoodTrolley.insertMany([
  {
    _id: 1,
    FoodItem: "Chocolate Frogs",
    Description:
      "literally chocolate shaped like a frog that jumps around - comes with a wizard card",
    Price: 1.2,
    Inventory: 56,
  },
  {
    _id: 2,
    FoodItem: "Bertie Bots Every Flavour Beans",
    Description: "Basic jelly beans made to taste like just about anything",
    Price: 12.5,
    Flavours: [
      "Pear",
      "Peppermint",
      "Rocky Road",
      "Salt",
      "Soap",
      "Toothpaste",
      "Vanilla",
      "Watermelon",
    ],
  },
  {
    _id: 3,
    FoodItem: "Pumpkins Pasties",
    Description: "Pastries made to taste like pumpkins",
    Price: 1.8,
    Inventory: 14,
  },
  {
    _id: 4,
    FoodItem: "Cauldron Cakes",
    Description: "Cauldron shaped licorice flavoured sweets",
    Price: 1.3,
  },
  { _id: 5, FoodItem: "Licorice Wands", Price: 0.9, Colour: "Black" },
  {
    _id: 6,
    FoodItem: "Mice Dumplings",
    Price: 15,
    Colour: "Black",
    Inventory: 21,
  },
]);

use("HarryPotterDB");
db.FoodTrolley.find();

// dropping collections

use("HarryPotterDB");
db.FoodTrolley.drop();

/*
find()
if a blank qurry document is specified ('{}'), all the documents or rows will be selected 
for fields set to, 1= shows a key; 0 does not show a key
'_id; is included in the returned document by default and will explicitly have to be set to '0' if needed
*/

/*
display all the fooditems present in the collection
only fields 'FoodItem' should be visible
*/

use("HarryPotterDB");
db.FoodTrolley.find({}, { FoodItem: 1, _id: 0 });

// display all the info relate to Chocolate Frogs

use("HarryPotterDB");
db.FoodTrolley.find({
  FoodItem: "Chocolate Frogs",
});

/*
wildcards
pattern matching
comparison
- $gt
- $gte
- $lt
- $lte
- $ne
- $eq
- $in
- $nin
- $exists and NULL
*/

// return all the food items containing the word 'Frog', only return the filed fooditem

use("HarryPotterDB");
db.FoodTrolley.find(
  { FoodItem: { $regex: "frog", $options: "i" } },
  {
    FoodItem: 1,
    _id: 0,
  }
);

// another way to do this
use("HarryPotterDB");
db.FoodTrolley.find(
  { FoodItem: /frog/i },
  {
    FoodItem: 1,
    _id: 0,
  }
);

//list all foods where inventory is more than 20, only display the fooditem

use("HarryPotterDB");
db.FoodTrolley.find({ Inventory: { $gt: 20 } }, { FoodItem: 1, _id: 0 });

//find all the food items whose inventory is between 12 and 60

use("HarryPotterDB");
db.FoodTrolley.find(
  { Inventory: { $gte: 12 }, Inventory: { $lte: 60 } },
  { FoodItem: 1, _id: 0 }
);

//IN or multiple od conditions

//find all the food items whose name contains either the word 'frog' or the word 'bean'

use("HarryPotterDB");
db.FoodTrolley.find(
  {
    FoodItem: { $in: [/frog/i, /bean/i] },
  },
  { FoodItem: 1, _id: 0 }
);

//another way
use("HarryPotterDB");
db.FoodTrolley.find(
  {
    $or: [{ FoodItem: /frog/i }, { FoodItem: /bean/i }],
  },
  {
    FoodItem: 1,
    _id: 0,
  }
);

// find all the food items contaning 10,20,14 items

use("HarryPotterDB");
db.FoodTrolley.find(
  {
    "Inventory": {"$in":[10,20,14]}
  },
  {
    "FoodItem":1,
    "_id":0
  }
);

//find all the food items not containing 14 items

use("HarryPotterDB");
db.FoodTrolley.find(
  {
    "Inventory": {"$nin": [14]}
  },
  {
    "FoodItem":1,
    "_id":0
  }
);

