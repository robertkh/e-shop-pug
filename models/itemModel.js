////////////////////////////////////////////////////
const mongoose = require("../config/mongoose");
var mongoosePaginate = require("mongoose-paginate");
const config = require("config");

////////////////////////////////////////////////////
const itemSchema = new mongoose.Schema({
  itemImg: {
    type: String,
  },
  itemName: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  itemQty: {
    type: String,
    required: true,
  },
  itemPrice: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

itemSchema.plugin(mongoosePaginate);

////////////////////////////////////////////////////
module.exports = mongoose.model("Item", itemSchema);
