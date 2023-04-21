// this is a javascript file
const express = require("express");
const app = express();
// this is a javascript file
const mongoose = require("mongoose");
const Food = require("./modules/food");
const cors = require("cors");

//CORS enables us to fetch localhost8000 from localhost19006
app.use(cors());

 mongoose.connect("mongodb+srv://ckurihara25:Abcd2155@cluster1.fqwupbi.mongodb.net/?retryWrites=true&w=majority");
 let db = mongoose.connection;
 
 // Check connection
 db.once("open", function () {
   console.log("Connected to MongoDB");
 });
 
 // Check for DB errors
 db.on("error", function (err) {
   console.log("DB Error");
 });
 


 app.use("/", async function (req, res) {
  let foods = await Food.find({});
    if (!foods) {
      res.send("No food found")
    } else {
      res.send(foods);
}});


// listen on port 8000
app.listen(8000, () => {
 console.log("Server is listening on port 8000");
});

//"npm start dev" to run this file