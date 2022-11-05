////////////////////////////////////////////////////
const Item = require("../models/itemModel");
const _ = require("lodash");

////////////////////////////////////////////////////
exports.addAndUpdate = async (req, res, next) => {
  req.body.itemPrice = req.body.itemPrice.toFixed(2);

  let item = await Item.findOne({
    itemName: req.body.itemName,
  });

  if (item) {
    item.itemName = req.body.itemName;
    item.itemQty = req.body.itemQty;
    item.itemPrice = req.body.itemPrice;
    await item.save();
    res.send("Ապրանքը հաջողությամբ վերախմբագրվեց։");
  } else {
    item = new Item(_.pick(req.body, ["itemName", "itemQty", "itemPrice"]));

    item.itemImg = item.itemName + ".jpg";
    await item.save();
    res.send("Դուք հաջողությամբ գրանցվեցիք նոր ապրանք։");
  }
};

////////////////////////////////////////////////////
exports.delItem = async (req, res, next) => {
  var doc = await Item.findOneAndDelete({
    itemName: req.body.itemName,
  });

  if (doc) {
    res.send("Ապրանքը հաջողությամբ հեռացվեց բազայից։");
  } else {
    console.log("error");
  }
};
