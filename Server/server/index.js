const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");


const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(cors())


app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/review', require('./routes/reviews'));
app.use('/api/filters', require('./routes/filters'));
app.use('/api/order', require('./routes/order'));
app.use('/api/restaurants', require('./routes/restaurants'));
app.use('/api/food_item' , require('./routes/food_item'));
app.use('/api/cart', require('./routes/cart'));

// For applying a store registration 
app.use('/api/applyRegisterStore', require('./routes/apply_register_store'));
// career page
app.use('/api/career', require('./routes/career'));


app.use('/api/onlinePayment', require('./routes/onlinePayment'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder   
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));
 
  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});