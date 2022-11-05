const mongoose = require("mongoose");

const config = require("config");
const uri = config.get("uri");

mongoose.set("useCreateIndex", true);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Now connected to MongoDB!"))
  .catch((err) => console.error("Something went wrong", err));

module.exports = mongoose;
