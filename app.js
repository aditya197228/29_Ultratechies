const express = require("express");// acquired express
const app = express();
const mongoose = require("mongoose");// acquired mongoose
const Listings = require("./models/listing.js");
const MONGO_URL ="mongodb://127.0.0.1:27017/PetLife"
const path = require("path");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");//Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it
const ejsMate = require("ejs-mate");//it bascially help us to create multiple templetes
main()
.then(() => {// the main and then function bascically conferm a statement
    console.log("conected to DB")
})
.catch((err) => {
    console.log(err);
});
async function main() {
    await mongoose.connect(MONGO_URL);// conecting mongo db data base using mongoose This basically confer the connection to database
}
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.get("/",(req, res) => {// handels get request 
app.engine('ejs',ejsMate);//

    res.send("Hi i am root");
});

app.get("/listings",async (req,res) => {
    const allListings = await Listings.find({});
        //res.render("/listings/index.ejs",{allListings});
        res.render("listings/index", { allListings });

    });
     //new route
    app.get("/listings/new",(req,res) =>{
    res.render("listings/new.ejs");
    });
    //show Route
    app.get("/listings/:id", async(req, res) => {// get request on "/listings/:id"
        let {id}= req.params;
       const listing = await Listings.findById(id);//This line uses Mongoose's findById method to query the database for a listing with the specified ID.
       res.render("listings/show", { listing });
    });
   //create Route
   app.post("/listings",async(req, res) => { //async function is used because we will make changes in data base 
    //let {title,description,image,location,country} = req.body;
   const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

//edit route
app.get("/listings/:id/edit",async(req, res) =>{
    let {id}= req.params;
    const listing = await Listings.findById(id);
    res.render("listings/edit.ejs",{listing});
});

//update route-> this route will implement the edits
app.put("/listings/:id",async(req, res) => {
    let {id} = req.params;// extracting id
    await Listing.findByIdAndUpdate(id, {...req.body.listing});// this is basically a javascript object which we are deconstructing and updating value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    res.redirect("/listings");
});
//delete Route
app.delete("/listings/:id",async(req,res) =>{
let {id} = req.params;
let deletedListing = await Listings.findByIdAndDelete(id);//findByIdAndDelete is method of moongose to take data in form of id and delete it
console.log(deletedListing);//execute the listings
res.redirect("/listings");// after deleting it redirect you to /listings
});

// Test listing route
// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title :"Tomy",
//         description:"fluffy hair",
//         location : "kolkata",
//         country : "india",
//     });
//     await sampleListing.save();// saving data in database
//     console.log("sample was saved");
//     res.send("successful testing");
// });

app.listen(8080, () => {
    console.log("server is listening to port 8080");// server created at port 8080
});

