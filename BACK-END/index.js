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
  data = await database.collection("Feedback").find({Rating:5}).limit(3).toArray()
  res.send(data)
})
app.get("/feedbackId", cors(), async (req, res) => {
  const data = await database.collection("Feedback").find({}, { _id: 1 }).toArray();
  const ids = data.map(item => item._id);
  res.send(ids);
});
app.post("/ticket", cors(), async (req,res)=> {
  
  const DDateString = req.body.DDate
  const DLocation = req.body.DLocation
  const ALocation = req.body.ALocation
  const route = await database.collection("RouteWithPoints").find({DLocation: DLocation, ALocation: ALocation}).toArray()
  const routeID = route.map(r=> r._id)

  const rawTicket = await database.collection("Tickets").find({Route: routeID[0]+"", Date:DDateString}).toArray()
  
  var Ticket = rawTicket.map(Ticket => ({
    _id: Ticket._id,
    DTime: Ticket.DTime,
    ATime: Ticket.ATime,
    DOffice: Ticket.DOffice,
    AOffice: Ticket.AOffice,
    Date: Ticket.Date,
    Seat: Ticket.Seat,
    Route: Ticket.Route,
    Reviews: Ticket.Reviews,
    Amenities: Ticket.Amenities,
    Bus: Ticket.Bus,
    Price: Ticket.Price,
    Image: Ticket.Image,
    Driver: Ticket.Driver
  }))

  res.send(Ticket)
})

app.get("/allTicket", cors(), async (req,res)=> {
  const rawTicket = await database.collection("Tickets").find({}).toArray()
  
  var Ticket = rawTicket.map(Ticket => ({
    _id: Ticket._id,
    DTime: Ticket.DTime,
    ATime: Ticket.ATime,
    DOffice: Ticket.DOffice,
    AOffice: Ticket.AOffice,
    Date: Ticket.Date,
    Seat: Ticket.Seat,
    Route: Ticket.Route,
    Reviews: Ticket.Reviews,
    Amenities: Ticket.Amenities,
    Bus: Ticket.Bus,
    Price: Ticket.Price,
    Image: Ticket.Image,
    Driver: Ticket.Driver
  }))

  res.send(Ticket)
})

app.post("/bookedTicket", cors(), async (req,res)=> {
  const ticket = req.body
  const data = await database.collection("BookedTickets").insertOne(ticket)
  
  res.send(data.insertedId)
})
app.post("/order", cors(), async (req,res)=> {
  const ticket = req.body;
  const result = await database.collection("Order").insertOne(ticket);
  const insertedId = result.insertedId;
  await database.collection("Order").updateOne(
    { _id: insertedId },
    { $set: { TransactionNumber: generateTransactionNumber() } }
  );
  res.send({ insertedId });
});

app.post("/reviews",cors(), async (req,res)=> {
  const ids = req.body.Reviews
  const data = []
  for (let i = 0; i < ids.length; i++) {
    const element = ids[i];
    const review = await database.collection("Feedback").find({_id: new ObjectId(element)}).toArray()
    data.push(review[0])
  }
  res.send(data)
})
app.post("/amenities",cors(), async (req,res)=> {
  const ids = req.body.Amenities
  const data = []
  for (let i = 0; i < ids.length; i++) {
    const element = ids[i];
    const review = await database.collection("Amenities").find({_id: new ObjectId(element)}).toArray()
    data.push(review[0])
  }
  res.send(data)
})
app.post("/bus",cors(), async (req,res) => {
  const id = req.body.Bus
  const data = await database.collection("Bus").find({_id:new ObjectId(id)}).toArray()
  res.send(data[0])
})
app.post("/routeWithPoints",cors(), async (req,res) => {
  const id = req.body.Route
  const data = await database.collection("RouteWithPoints").find({_id: new ObjectId(id)}).toArray()
  res.send(data[0])
})

app.post("/routeId",cors(), async (req,res)=> {
  const DLocation = req.body.DLocation
  const ALocation = req.body.ALocation
  const route = await database.collection("RouteWithPoints").find({DLocation: DLocation, ALocation: ALocation}).toArray()
  const id = route.map(r=>r._id)
  res.send(id[0])
})

app.post("/driver",cors(), async (req,res) => {
  const ids = req.body.Driver
  var data = []
  for (let i = 0; i < ids.length; i++) {
    const element = ids[i];
    const review = await database.collection("Driver").find({_id: new ObjectId(element)}).toArray()
    data.push(review[0])
  }
  res.send(data)
})

///* ORTHER *///

// Function to generate a unique transaction number
function generateTransactionNumber() {
  // Generate a timestamp component (e.g., milliseconds since epoch)
  const timestamp = Date.now();

  // Generate a random component (e.g., random 4-digit number)
  const random = Math.floor(1000 + Math.random() * 9000);

  // Concatenate timestamp and random number to create the transaction number
  const transactionNumber = timestamp.toString() + random.toString();

  return transactionNumber;
}

app.listen(port,()=>{
  console.log(`My Server listening on port ${port}`)
})