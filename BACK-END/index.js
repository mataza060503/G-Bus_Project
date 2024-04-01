// npm install express
// npm install express-fileupload
// npm install mongodb
// npm i --save-dev nodemon
// npm i --save-dev morgan
// npm i body-parser
// npm i cors

const express = require('express');
const app = express();
const port = 3000;
const morgan=require("morgan")
app.use(morgan("combined"))
const bodyParser=require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const cors=require("cors");
app.use(cors({
  origin: "http://localhost:4200",
  credentials: true
}))

const { MongoClient, ObjectId } = require('mongodb');
client = new MongoClient("mongodb://127.0.0.1:27017");
client.connect();
database = client.db("G-Bus");
const routeCollection = database.collection("Route");

app.get("/route",cors(), async (req, res) => {
  data = await routeCollection.find({}).toArray()
  res.send(data)
})
app.get("/promotion",cors(), async (req, res)=> {
  data = await database.collection("Promotion").find({}).toArray()
  res.send(data)
})
app.get("/partnerPromotion", cors(), async (req,res)=> {
  data = await database.collection("PartnerPromotion").find({}).toArray()
  res.send(data)
})
app.get("/feedback",cors(), async (req,res) => {
  data = await database.collection("Feedback").find({}).toArray()
  res.send(data)
})

app.listen(port,()=>{
  console.log(`My Server listening on port ${port}`)
})