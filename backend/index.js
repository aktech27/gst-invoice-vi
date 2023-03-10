const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

require("./misc/errorHandler");
require("dotenv").config();
mongoose.set("strictQuery", true);

//Connect to database
mongoose
  .connect(process.env.DB_URI_TEST)
  .then(() => {
    console.log("Connect to DB");
  })
  .catch((e) => {
    handleError("Database Connection Error", __filename, e);
  });

const myFunc = async () => {};

//myFunc();

const app = express();

app.use(express.json());

//Routes
app.use("/api/beneficiary", require("./routes/beneficiaryRoutes"));
app.use("/api/product", require("./routes/productRoutes"));
app.use("/api/bill", require("./routes/billRoutes"));
app.use("/api/dc", require("./routes/dcRoutes"));

app.use(express.static("build"));

if (process.env.CONN !== "DEV") {
  console.log("running");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port:${process.env.PORT}`);
});
