const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const config = require("config");
const uri = config.get("uri");

const sess = {
  secret: "keyboard cat",
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored (true -> create)
  store: new MongoStore({
    url: uri,
  }),
  cookie: {
    maxAge: 14 * 24 * 60 * 60 * 1000,
  },
};

module.exports = session(sess);
