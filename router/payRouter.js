////////////////////////////////////////////////////
var express = require("express");
var router = express.Router();
const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "Aa-Nmzy2wKLnSWIWxsUM6ypUY-nX6SubdQ-QqyK_sVvqbZN9EkpYEy7ws71jpmL1sNqN1GkfrmBUCgWq",
  client_secret:
    "ECftHqxFsM6c1RPM75aw9XvN6jwugdXIyB7SLq9E9LPMrPiZm_a8VojEPthQH03bMXnLmGGvnrWYjrUa",
});

////////////////////////////////////////////////////
router.get("/", (req, res) => {
  console.log("--->>>   ", req.headers.host);
  res.render("payment");
});

////////////////////////////////////////////////////
router.post("/pay", (req, res) => {
  const return_url = req.headers.origin + "/paypal/success";
  const cancel_url = req.headers.origin + "/paypal/cancel";

  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: return_url,
      cancel_url: cancel_url,
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "Red Sox Hat",
              price: "18.00",
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: "18.00",
        },
        description: "Hat for the best team ever",
      },
    ],
  };

  create_payment_json.transactions[0].item_list.items = JSON.parse(
    req.session.payDetails
  ).items;
  create_payment_json.transactions[0].amount = JSON.parse(
    req.session.payDetails
  ).amount;
  create_payment_json.transactions[0].description = req.body.description;

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
});

////////////////////////////////////////////////////
router.get("/success", (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: "28",
        },
      },
    ],
  };

  execute_payment_json.transactions[0].amount = JSON.parse(
    req.session.payDetails
  ).amount;

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        console.log(JSON.stringify(payment));
        res.send("Success");
      }
    }
  );
});

////////////////////////////////////////////////////
router.get("/cancel", (req, res) => res.send("Cancelled"));

////////////////////////////////////////////////////
module.exports = router;
