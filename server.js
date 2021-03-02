require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const morgan = require('morgan');
const path = require('path');

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/status", (req, res, next) => {
  res.send("Api running");
});

app.get("/test", (req, res, next) => {
  const testData = [{
    "id": 13860426,
    "lead_image": "https://target.scene7.com/is/image/Target/GUEST_44aeda52-8c28-4090-85f1-aef7307ee20e",
    "name": "The Big Lebowski (Blu-ray) (Widescreen)",
    "current_price": {
      "value": 13.49,
      "currency_code": "USD"
    }
  }, {
    "id": 13860428,
    "lead_image": "https://target.scene7.com/is/image/Target/GUEST_c94ed4d8-552f-47df-b636-5c2c423be19d",
    "name": "Creamy Peanut Butter 40oz",
    "current_price": {
      "value": 3.25,
      "currency_code": "USD"
    }
  }, {
    "id": 13860429,
    "lead_image": "https://target.scene7.com/is/image/Target/GUEST_c94ed4d8-552f-47df-b636-5c2c423be19d",
    "name": "Creamy Peanut Butter 40oz",
    "current_price": {
      "value": 3.25,
      "currency_code": "USD"
    }
  }, {
    "id": 13860427,
    "lead_image": "https://target.scene7.com/is/image/Target/GUEST_c94ed4d8-552f-47df-b636-5c2c423be19d",
    "name": "Creamy Peanut Butter 40oz",
    "current_price": {
      "value": 3.25,
      "currency_code": "USD"
    }
  }];
  res.status(200).json({ success: true, products: testData });
});

// Connecting Routes
app.use(morgan('tiny'));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

// Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// For Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
