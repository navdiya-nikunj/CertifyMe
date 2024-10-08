const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
require("./src/db/mongoose");
const port = process.env.PORT;

app.use(express.static('../frontend/dist'))
app.use(
  cors({
    origin: `https://www.certifyme.club`,
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.listen(port, () => {
  console.log("Server is on at port", port, "!!!");
});

module.exports = app;
