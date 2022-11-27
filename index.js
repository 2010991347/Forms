//Importing all the required libraries
var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const path = require("path");
const app = express()

//middlewares
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

//Establishing the connection with mongodb
mongoose.connect('mongodb://localhost:27017/mydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// creating database variables
var db = mongoose.connection;
var db1 = mongoose.connection;

// checking the result (optional) for your own convienence
db.on('error', () => console.log("Error in connecting to Database"));
db.once('open', () => console.log("Connected to Database"))
db1.on('error', () => console.log("Error in connecting to Database"));
db1.once('open', () => console.log("Connected to Database"))

//adding data to our database
app.post("/sign_up", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    var data = {
        "name": name,
        "email": email,
        "phno": phno,
        "password": password
    }
    console.log(data);

   //checking whether the data has already present in the database or not to avoid duplicacy
    db.collection("users").find({ "email": email, "phno": phno }).toArray(function (err, result) {
        if (err) throw err;
        
        if (result != 0) {
            console.log("copied data");
            return res.redirect('index.html')
           
        } else {
            console.log("added data");
            db.collection('users').insertOne(data, (err, collection) => {
                if (err) {
                    throw err;
                }
                console.log("Record inserted successfullyyy");
            });
            return res.redirect('signup_success.html')
        }
    });
    
   
})

app.post("/login_f", (req, res) => {

    var email = req.body.email;

    var password = req.body.password;

    var data1 = {

        "email": email,

        "password": password
    }
    
    //checking if the given credientials are present in our database or not 
    db1.collection("users").find({ "email": email, "password": password }).toArray(function (err, result) {
        if (err) throw err;
        
        if (result != 0) {
           
            return res.redirect('login_success.html')
        } else {
            console.log("invalid data");
            return res.redirect('signup_success.html')
           
        }
    });

   
})

//use to fetch the data
app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);


console.log("listening on port 3000");





























