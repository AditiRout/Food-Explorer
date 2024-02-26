const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./Routes/v1/userRoutes");
const { notFound, errorHandler } = require("./Middlewares/errorMiddleware");
const { resolve, join } = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./Config/db");

dotenv.config();
const app = express();
// mongoose.connect(process.env.DB_URL, {
//    useNewUrlParser: true,
//    useUnifiedTopology: true
// }, () => {
//   console.log('Database connected');
// })
connectDB();
app.use(express.json()); // to accept json data
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
// app.get("/", (req, res) => {
//   res.send("API Running!");
// });

app.use("/api/user", userRoutes);
app.use(bodyParser.urlencoded({ extended: true }));

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log("started at the port");
  console.log(port);
});
