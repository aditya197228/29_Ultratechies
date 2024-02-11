const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const MONGO_URL ="mongodb://127.0.0.1:27017/PetLife";
main()
.then(() => {// the main and then function bascically conferm a statement
    console.log("conected to DB");
})
.catch((err) => {
    console.log(err);
});
async function main() {
    await mongoose.connect(MONGO_URL);// conecting mongo db data base using mongoose This basically confer the connection to database
}
const initDB = async() => {
    await Listing.deleteMany({});//deleting existing data in data base
    await Listing.insertMany(initData.data);//inserting data
    console.log("data was intialized");
};

initDB();