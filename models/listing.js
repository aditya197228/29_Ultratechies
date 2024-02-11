const mongoose = require("mongoose");
const Schema = mongoose.Schema; //A schema in Mongoose defines the structure of documents within a collection in a MongoDB database.
// also now schema is initlized as data base you can use it
const ListingSchema = new Schema({
    title: {
        type : String,
        required: true,
    },
    description : String,
    image : {
     type : String,
     set: (v) => v ==="https://unsplash.com/photos/dog-running-on-beach-during-daytime-yihlaRCCvd4" ? "default link" 
     : v,//ternary operator
    },
    breed : String,
    location : String,
    country : String,
});

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;