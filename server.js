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

// Connecting Routes
app.use(morgan('tiny'));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/product", require("./routes/product"));

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
