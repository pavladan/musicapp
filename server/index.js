const express = require("express");
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/db");
const app = express();
const musicRoutes = require("./api/routes/music")

mongoose
  .connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log({ database_error: err });
  });

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
// app.use('/uploads', express.static('uploads'))
app.use('/music', musicRoutes)
app.get("/", (req, res) => {
  res.json("Hola MENV devs... Assemble");
});
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
