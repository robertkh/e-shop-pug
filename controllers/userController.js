////////////////////////////////////////////////////
const User = require("../models/userModel");
const _ = require("lodash");
const bcrypt = require("bcrypt");

var jwt = require("jsonwebtoken");
const config = require("config");

////////////////////////////////////////////////////
exports.postUserSignup = async (req, res, next) => {
  console.log("--->>>  postUsersSignup invoked ");
  console.log("--->>> ", req.body);

  let user = await User.findOne({
    email: req.body.email,
  });
  if (user) {
    return res.status(400).send([
      {
        msg: "That user already exisits!",
      },
    ]);
  }

  //  user._id -ին ձևավորվում է այս քայլում։
  user = new User(_.pick(req.body, ["username", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  res.locals.uid = user._id;

  res.send(
    "Դուք հաջողությամբ գրանցվեցիք։ Ձեր հաշիվը ակտիվացնելու համար տես E-mail։"
  );

  next();
};

////////////////////////////////////////////////////
exports.getUserActive = async (req, res) => {
  let user = await User.findOne({
    _id: req.params.id,
  });

  if (!user) {
    return res.status(400).send([
      {
        msg: "No such user.",
      },
    ]);
  } else {
    user.isReged = true;
  }

  await user.save();

  res.end("You successfully activated your account");
};

////////////////////////////////////////////////////
exports.postUserLogin = async (req, res) => {
  let user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.status(400).send([
      {
        msg: "<strong>Email</strong> - Էլեկտրոնային հասցեն սխալ է։",
      },
    ]);
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send([
      {
        msg: "<strong>Password</strong> - Ծածկագիրը սխալ է",
      },
    ]);
  }

  if (!user.isReged) {
    return res.status(500).send([
      {
        msg: "Ձեր հաշիվը ակտիվ չէ։ Ստուգեք ձեր էլ-հասցեն։ ",
      },
    ]);
  }

  req.session.activeUserName = user.username;
  req.session.activeUserId = user.id;

  res.cookie("activeu", user.username, {
    maxAge: 14 * 24 * 60 * 60 * 1000,
  });

  res.cookie("activeid", user.id, {
    maxAge: 14 * 24 * 60 * 60 * 1000,
  });

  if (user.isAdmin) {
    const token = user.generateAuthToken();

    res.cookie("access_token", "Bearer " + token, {
      expires: new Date(Date.now() + 14 * 24 * 3600000),
      httpOnly: true,
    });
  }

  if (user.isAdmin) {
    res.send({
      name: user.username,
      id: user.id,
      dash: true,
    });
  } else {
    res.send({
      name: user.username,
      id: user.id,
      dash: false,
    });
  }
};

////////////////////////////////////////////////////
exports.getUsersLogout = async (req, res) => {
  if (req.session.activeUserName == undefined) {
    return res.status(400).send([
      {
        msg: "Ներկա պահին ակտիվ օգտատեր չկա։",
      },
    ]);
  }

  req.session.activeUserName = "";
  req.session.activeUserId = "";

  res.cookie("activeu", "");
  res.cookie("activeid", "guest");
  res.send("Հաջողությամբ ավարտեցիք սեանսը։");
};

////////////////////////////////////////////////////
exports.getNewPassword = async (req, res, next) => {
  let user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.status(400).send([
      {
        msg: "Նման Էլեկտրոնային հասցեով օգտատեր գոյություն չունի։",
      },
    ]);
  }

  res.locals.jwt = jwt.sign(
    {
      em: req.body.email,
      ps: req.body.password,
    },
    config.get("PrivateKey"),
    {
      expiresIn: "1h",
    }
  );

  res.send("Ծածկագրի փոփոխություններն ամրագրելու համար տես E-mail։");

  next();
};

////////////////////////////////////////////////////
exports.setNewPassword = async (req, res) => {
  console.log("--->>>   setNewPassword invoked ");

  const jwtToken = req.params.id;

  const decoded = jwt.verify(jwtToken, config.get("PrivateKey"));

  let user = await User.findOne({
    email: decoded.em,
  });

  if (!user) {
    return res.status(400).send([
      {
        msg: "Նման Էլեկտրոնային հասցեով օգտատեր գոյություն չունի։",
      },
    ]);
  }

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(decoded.ps, salt);

  user.password = password;

  await user.save();

  res.send("Ձեր ծածկագիրը հաջողությամբ փոփվեց։");
};
