////////////////////////////////////////////////////
const Message = require("../models/messModel");
const _ = require("lodash");
var moment = require("moment");
moment().format("LL");

////////////////////////////////////////////////////
exports.postMessSend = async (req, res) => {
  let message = new Message(req.body);

  await message.save();

  res.send("Հաղորդագրությունը հաջողությամբ ուղարկվեց։");
};

////////////////////////////////////////////////////
exports.delMessage = async (req, res) => {
  let mess = await Message.findByIdAndRemove(req.body.messId.trim());

  res.send("ok");
};

////////////////////////////////////////////////////
exports.readMessage = async (req, res) => {
  moment.locale("hy-am");
  let messages = await Message.find();

  for (var i = 0; i < messages.length; i++) {
    let title =
      messages[i].username +
      " - ( " +
      moment(messages[i].created).format("LLL") +
      " )";
    messages[i].username = title;
    console.log(title);
  }

  res.render("mess", {
    messages: messages,
  });
};
