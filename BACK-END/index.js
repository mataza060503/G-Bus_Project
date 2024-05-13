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

app.get("/ticket/:id",cors(), async (req,res) => {
  const ticketId = req.params.id
  const data = await database.collection("Tickets").find({_id: new ObjectId(ticketId)}).toArray()
  res.send(data[0])
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

//** POST UNPAID TICKET */
app.post("/getOrder",cors(), async (req,res) => {
  const accountId = req.body.accountId
  const status = req.body.status
  const data = await database.collection("Order").find({CustomerId: accountId ,Status: status}).sort({BookedTime: -1}).toArray()
  res.send(data)
})

app.get("/getOrder/:orderId",cors(), async (req,res) => {
  const orderId = req.params.orderId
  const data = await database.collection("Order").find({_id: new ObjectId(orderId)}).toArray()
  res.send(data[0])
})

app.post("/getBookedTicket", cors(), async (req, res) => {
  const ticketId = req.body.ticketId;

  // Validate ticketId - Check if it is a string and a 24-character hex string
  if (typeof ticketId !== 'string' || !ticketId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send({
          message: "Invalid ticketId. Must be a 24 character hex string."
      });
  }

  try {
      const data = await database.collection("BookedTickets").find({_id: new ObjectId(ticketId)}).toArray();
      if (data.length === 0) {
          return res.status(404).send({
              message: "Ticket not found."
          });
      }
      res.send(data[0]);
  } catch (error) {
      console.error('Failed to fetch ticket data:', error);
      res.status(500).send({
          message: "Internal server error."
      });
  }
});

app.get("/voucher",cors(), async (req,res) => {
  const data = await database.collection("Vouchers").find({}).sort({}).toArray()
  res.send(data)
})

app.patch("/order",cors(), async (req,res) => {
  const orderId = req.body.orderId
  const status = req.body.status
  const result = await database.collection("Order").updateOne(
    { _id: new ObjectId(orderId) },
    { $set: { Status: status } }
  );
  if (result.modifiedCount > 0) {
    res.send("The order was updated successfully")
  } else {
    res.send("Not thing was updated")
  }
})

///** INVOICE *///
app.get("/invoice/:id", cors(), async (req, res) => {
  const invoiceId = req.params.id
  const data = await database.collection("Invoice").find({_id: new ObjectId(invoiceId)}).toArray()
  res.send(data[0])
})

app.post("/invoice/:id", cors(), async (req,res)=> {
  var invoice = req.body
  invoice._id = new ObjectId()
  const orderId = req.params.id
  const data = await database.collection("Invoice").insertOne(invoice)
  await database.collection("Order").updateOne(
    {_id: new ObjectId(orderId)},
    { $set: {TransactionNumber: data.insertedId}}
  )
  res.send(data.insertedId.toString())
})

app.patch("/invoice", cors(), async (req, res) => {
  const orderId = req.body.orderId
  const invoiceId = req.body.invoiceId
  const status = req.body.status

  if (status === "successful") {
    const invoiceResult = await database.collection("Invoice").updateOne(
      {_id: new ObjectId(invoiceId)},
      {$set: {paymentStatus: "Successful"}}
    )
    const orderResult = await database.collection("Order").updateOne(
      {_id: new ObjectId(orderId)},
      {$set: {Status: "Paid"}}
    )
    if (invoiceResult.modifiedCount > 0 && orderResult.modifiedCount > 0) {
      res.send("successful")
    } else {
      res.send(invoiceId)
    }
  } else {
    const invoiceResult = await database.collection("Invoice").updateOne(
      {_id: new ObjectId(invoiceId)},
      {$set: {paymentStatus: "Unsuccessful"}}
    )
    if (invoiceResult.modifiedCount > 0) {
      res.send("unsuccessful")
    } else {
      res.send("not thing is updated")
    }
  }
})

///* ACCOUNT *///
app.post("/account", cors(), async (req, res) => {
  const account = req.body
  const data = await database.collection("Account").insertOne(account)
  res.send(data.insertedId)
})
app.get("/checkAccount/:phoneNumber", cors(), async (req, res) => {
  const phoneNumber = req.params.phoneNumber
  const data = await database.collection("Account").find({phoneNumber: phoneNumber}).toArray()
  if (data.length > 0) {
    res.send(true)
  } else {
    res.send(false)
  } 
})
app.post("/checkPassword", cors(), async (req, res) => {
  const password = req.body.password
  const data = await database.collection("Account").find({password: password}).toArray()
  if (data.length > 0) {
    res.send(data[0].userId)
  } else {
    res.send("fail")
  }
})

app.patch("/password", cors(), async (req, res) => {
  const phoneNumber = req.body.phoneNumber
  const password = req.body.password
  const data = await database.collection("Account").updateOne(
    {phoneNumber: phoneNumber},
    {$set: {password: password}}
  )
  const result = await database.collection("Account").find({phoneNumber: phoneNumber}).toArray()
  if (data.length > 0) {
    res.send(data[0].userId)
  } else {
    res.send("fail")
  }
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