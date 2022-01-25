const express = require("express");
const app =express();

const path = require('path');


//MONGOOSE GETTING STARTED
const mongoose = require('mongoose');
var bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/thisthis', {useNewUrlParser: true});
//const port = 8000;
const port = process.env.PORT || 8000

//DEFINE MONGOOSE SCHEMA 
const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    address: String
  });

  const Contact = mongoose.model('names', contactSchema);




//EXPRESS SPECIFIC STUF
app.use("/static", express.static("static"));
//app.use(express.urlencoded());//line is  so necessary

//PUG SPECIFIC STUF
app.set('view engine', 'pug');
app.set("views", path.join(__dirname, 'views'));

//body parser middle ware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//END POINT

app.get("/", (req, res)=>{
    const params={}
    res.status(200).render("home.pug", params);
})
app.get("/contact", (req, res)=>{
    const params={}
    res.status(200).render("contact.pug", params);
})


// app.post("/contact", (req, res)=>{
//     res.send("ADD")
// })
app.post("/contact", (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
    //res.status(200).render("home.pug", params);
})








//start the server
app.listen(port, ()=>{
    console.log(`the server successfully run at port ${port}`);
})