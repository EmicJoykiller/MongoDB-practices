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
use("blogDB");
db.analytics.find({ "url": "www.blogspot.com/blog2" });
db.analytics.find({"pageviews": 1031},{_id:1,pageviews:1});
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
use("blogDB");
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

//exist and null
//find all the food items that contain inventory 
use("HarryPotterDB");
db.FoodTrolley.find(
  {
    "Inventory": {"$exists": true}
  },
  {
    "FoodItem":1,
    "Inventory":1,
    "_id":0
  }
);

//find all the food items that does not contain inventory 

use("HarryPotterDB");
db.FoodTrolley.find(
  {
    "Inventory": null
  },
  {
    "FoodItem":1,
    "Inventory":1,
    "_id":0
  }
);

//list all the food conating frog where inventory is between 20 and 60

use("HarryPotterDB");
db.FoodTrolley.find(
  {
    "$and":[
      {"Inventory": {"$gt":20}},
      {"Inventory":{"$lt": 60}},
      {"FoodItem": /frog/i}
    ]
  },
  {
    "FoodItem":1,
    "Inventory":1,
    "_id":0
  }
);


/* Q1. Find all the Documents containing 'duplex' in the room name. 
Display only the room_name and the Price of the room.
Display the prices in descending order. */



use('sample_airbnb');
db.listingsAndReviews.aggregate([
  {$match:{"name": /duplex/i}},
  {$project: {"name": 1, "price":1}},
  {$sort:{"price":-1}}
])






















use('sample_airbnb');
db.listingsAndReviews.aggregate([
                                {"$match": {"name": /duplex/i} },
                                {"$project": {"name":1, "price": 1}},
                                {"$sort": {"price": -1}}
                                ])










/* Q2. How many listings contain the word 'duplex' in the room name? */


Select countryname, count(countryname) as num_emps_per_country
from emp 
group by countryname;


use('sample_airbnb');
db.listingsAndReviews.aggregate([
                                {"$match": {"name": /duplex/i} },
                                {"$group": {_id:"name", 
                                            count_of_duplex_rooms: {"$sum":1 } 
                                           }
                                },  /* contrast the use of field-path: '_id:"name" vs '_id:"$name"'' */
                                {"$project": {"name":1, "count_of_duplex_rooms": 1}}
                                 ])






select avg(salary)
from emp
where ....;
                   


/* Q3. For all the Documents containing 'duplex' in the room name, find the Avg price of such Duplex
listings. */
use('sample_airbnb');
db.listingsAndReviews.aggregate([
                                {"$match": {"name": /duplex/i} },
                                {"$group": {_id: "name", 
                                            calc_avgPrice: {"$avg": "$price"} 
                                           } 
                                },
                                {"$project": {"name":1, "calc_avgPrice": 1}}
                                ])

                          


/*
Q4. How many listings have the 'property_type' of 'House', and include “First aid kit" 
as one of the amenities?
*/
use('sample_airbnb');
db.listingsAndReviews.aggregate([
                                {"$match": {"$and": [ {"property_type": /house/i},   /* array */
                                                      {"amenities": /first aid kit/i}
                                                    ]
                                            } 
                                },
                                {"$group": {_id: "property_type", 
                                            count_of_such_listings:{"$sum": 1}            /* try: {"dollarcount": {} } */ 
                                            }
                                }
                                ])




/* Q5. Display all the listings that have “Free parking on premises”, “Air conditioning”, and “Wifi” 
as part of their amenities, and have at least 2 bedrooms */

/*use('sample_airbnb');
db.listingsAndReviews.find({"$and": [   
                                    {"amenities": {"$and": [ /Free parking on premises/i,
                                                            /Air conditioning/i,
                                                            /wifi/i
                                                            ]
                                                  } 
                                    },
                                    {"beds": {"$gte": 2} }
                                    ]
                           },
                           {_id: 0, name: 1, amenities:1, beds: 1 }
                           )
*/

use('sample_airbnb');
db.listingsAndReviews.find({"$and": [   
                                    {"amenities": /Free parking on premises/i},
                                    {"amenities":  /Air conditioning/i},
                                    {"amenities":  /wifi/i},
                                    {"bedrooms": {"$gte": 2}}
                                    ]
                            } ,
                            {_id: 0, name: 1, amenities:1, bedrooms: 1 }
                         )


/* Q6. Display the names and the street_address of all listings 
where the first amenity is “Internet” */
use('sample_airbnb');
db.listingsAndReviews.find({"amenities.0": /internet/i },
                           {"_id":0, "name": 1, "address.street":1 }
                           )







/*Q7. Display the name and accomodation capacity, of the 5 listings with the biggest accomodation.
 */
use('sample_airbnb');
db.listingsAndReviews.aggregate({"$sort": {"accommodates": -1}},                         /*aggregate = used for pipelining in general, not just for grouping by*/
                                {"$limit":5},
                                {"$project": {"_id":0, "name": 1, "accommodates":1}}
                                );







                                
/* Q8. Display each distinct value of property_type, sorted in ascending alphabetical order.  */
use('sample_airbnb');




db.listingsAndReviews.aggregate([
                                {"$group": {_id: "$property_type"}},
                                {"$sort": {_id: 1}}
                                ] );


/* Q9.  How many listings exist, of type 'Bungalow'? */ 

use('sample_airbnb');
db.listingsAndReviews.aggregate(
                                [
                                {"$match": {"property_type": /bungalow/i}},
                                {"$group": {_id: "property_type", 
                                            count_of_bungalow_listings: {"$count": {}}
                                            }}
                                ]
                                );  
                                

/* Q10. Which property_type has the highest avg 'review_scores_rating'?  */






use('sample_airbnb');
db.listingsAndReviews.aggregate(
                                [
                                {"$group": {_id: "$property_type",
                                            avg_rating_for_this_proptype: {"$avg": "$review_scores.review_scores_rating"}
                                            }
                                },
                                {"$sort": {"avg_rating_for_this_proptype": -1}},
                                {"$limit": 1}
                                ]
                                );






/* 
Q11. How many listings have 30 amenities? */  
/* '$size' can only check for an ArraySize being an EXACT number; not a '$gt' or a '$lt' */

use('sample_airbnb');
db.listingsAndReviews.aggregate(
                                [
                                {"$match": {"amenities": {"$size": 30}
                                                          
                                           } 
                                } ,
                                {"$group": {_id: "amenities",
                                            countOfSuchListings: {"$count": {}}
                                           }  
                                }
                                ]
                                );





/* Q12: "$unwind": Display the author, and the date, of the most recent review for 'Ribeira Charming Duplex'  */






// Use the appropriate database
use('sample_airbnb'); 

// Aggregation query to find the latest review for the listing "Ribeira Charming Duplex"
db.listingsAndReviews.aggregate([
    { "$match": { "name": "Ribeira Charming Duplex" } },
    { "$unwind": "$reviews" },
    { "$project": { "reviews.date": 1, "reviews.reviewer_name": 1 } },
    { "$sort": { "reviews.date": -1 } },
    { "$limit": 1 }
]);

// Example document from the `listingsAndReviews` collection
use('sample_airbnb'); 
db.listingsAndReviews.insertOne({
    "_id": "10006546",
    "listing_url": "https://www.airbnb.com/rooms/10006546",
    "name": "Ribeira Charming Duplex",
    "summary": "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
    "interaction": "Cot - 10 € / night Dog - € 7,5 / night",
    "house_rules": "Make the house your home...",
    "property_type": "House",
    "room_type": "Entire home/apt",
    "bed_type": "Real Bed",
    "minimum_nights": "2",
    "maximum_nights": "30",
    "cancellation_policy": "moderate",
    "last_scraped": { "$date": { "$numberLong": "1550293200000" } },
    "calendar_last_scraped": { "$date": { "$numberLong": "1550293200000" } },
    "first_review": { "$date": { "$numberLong": "1451797200000" } },
    "last_review": { "$date": { "$numberLong": "1547960400000" } },
    "accommodates": { "$numberInt": "8" },
    "bedrooms": { "$numberInt": "3" },
    "beds": { "$numberInt": "5" },
    "number_of_reviews": { "$numberInt": "51" },
    "bathrooms": { "$numberDecimal": "1.0" },
    "amenities": [
        "TV",
        "Cable TV",
        "Wifi",
        "Kitchen",
        "Paid parking off premises",
        "Smoking allowed",
        "Pets allowed",
        "Buzzer/wireless intercom",
        "Heating",
        "Family/kid friendly",
        "Washer",
        "First aid kit",
        "Fire extinguisher",
        "Essentials",
        "Hangers",
        "Hair dryer",
        "Iron",
        "Pack ’n Play/travel crib",
        "Room-darkening shades",
        "Hot water",
        "Bed linens",
        "Extra pillows and blankets",
        "Microwave",
        "Coffee maker",
        "Refrigerator",
        "Dishwasher",
        "Dishes and silverware",
        "Cooking basics",
        "Oven",
        "Stove",
        "Cleaning before checkout",
        "Waterfront"
    ],
    "price": { "$numberDecimal": "80.00" },
    "security_deposit": { "$numberDecimal": "200.00" },
    "cleaning_fee": { "$numberDecimal": "35.00" },
    "extra_people": { "$numberDecimal": "15.00" },
    "guests_included": { "$numberDecimal": "6" },
    "images": {
        "thumbnail_url": "",
        "medium_url": "",
        "picture_url": "https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large",
        "xl_picture_url": ""
    },
    "host": {
        "host_id": "51399391",
        "host_url": "https://www.airbnb.com/users/show/51399391",
        "host_name": "Ana&Gonçalo",
        "host_location": "Porto, Porto District, Portugal",
        "host_about": "Gostamos de passear, de viajar, de conhecer pessoas e locais novos, gostamos de desporto e animais! Vivemos na cidade mais linda do mundo!!!",
        "host_response_time": "within an hour",
        "host_thumbnail_url": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
        "host_picture_url": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_x_medium",
        "host_response_rate": { "$numberInt": "100" },
        "host_is_superhost": false,
        "host_has_profile_pic": true,
        "host_identity_verified": true,
        "host_listings_count": { "$numberInt": "3" },
        "host_total_listings_count": { "$numberInt": "3" },
        "host_verifications": [
            "email",
            "phone",
            "reviews",
            "jumio",
            "offline_government_id",
            "government_id"
        ]
    },
    "address": {
        "street": "Porto, Porto, Portugal",
        "government_area": "Cedofeita, Ildefonso, Sé, Miragaia, Nicolau, Vitória",
        "market": "Porto",
        "country": "Portugal",
        "country_code": "PT",
        "location": {
            "type": "Point",
            "coordinates": [
                { "$numberDouble": "-8.61308" },
                { "$numberDouble": "41.1413" }
            ],
            "is_location_exact": false
        }
    },
    "availability": {
        "availability_30": { "$numberInt": "28" },
        "availability_60": { "$numberInt": "47" },
        "availability_90": { "$numberInt": "74" },
        "availability_365": { "$numberInt": "239" }
    },
    "review_scores": {
        "review_scores_accuracy": { "$numberInt": "9" },
        "review_scores_cleanliness": { "$numberInt": "9" },
        "review_scores_checkin": { "$numberInt": "10" },
        "review_scores_communication": { "$numberInt": "10" },
        "review_scores_location": { "$numberInt": "10" },
        "review_scores_value": { "$numberInt": "9" },
        "review_scores_rating": { "$numberInt": "89" }
    },
    "reviews": [
        {
            "_id": "362865132",
            "date": { "$date": { "$numberLong": "1545886800000" } },
            "reviewer_name": "Thomas",
            "comments": "Very helpful hosts. Cooked traditional..."
        },
        {
            "_id": "364728730",
            "date": { "$date": { "$numberLong": "1546232400000" } },
            "reviewer_name": "Mr",
            "comments": "Ana & Goncalo were great on communication..."
        },
        {
            "_id": "403055315",
            "date": { "$date": { "$numberLong": "1547960400000" } },
            "reviewer_name": "Milo",
            "comments": "The house was extremely well located..."
        }
    ]
});
