const mongo = require("mongoose");

const connectDB = async () => {
  try {
    const opt = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongo.connect(process.env.DB_URl, opt);
    console.log("connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
