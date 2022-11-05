////////////////////////////////////////////////////
const Item = require("../models/itemModel");

////////////////////////////////////////////////////
exports.paymentCheckout = async (req, res, next) => {
  req.session.payDetails = JSON.stringify(req.body.pay_Details);

  for (let i = 0; i < req.body.pay_Details.items.length; i++) {
    let item = await Item.findOne({
      itemName: req.body.pay_Details.items[i].name,
    });

    if (item) {
      if (+item.itemQty < +req.body.pay_Details.items[i].quantity) {
        return res
          .status(400)
          .send(
            item.itemName +
              " անունով ապրանքից պահեստում մնացել է " +
              item.itemQty +
              " հատ։"
          );
      }
      item.itemQty = +item.itemQty - +req.body.pay_Details.items[i].quantity;
      await item.save();
    } else {
      res.status(400).send("Նման ապրանք չկա։");
    }
  }

  res.send(
    "Ստուգման փուլն հաջողությամբ ավարտվեց։ Կարող եք կատարել փոխանցումը PayPal համակարգով։"
  );
};
