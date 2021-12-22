const bcrypt = require("bcrypt");

const db = require("../models");
const User = db.user;

exports.login = async (req, res) => {
  const email = req.body.email;
  const pwd = req.body.password;

  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: "Email AND password required." });
    return;
  }

  try {
    const userData = await User.findOne({
      where: { username: email },
    });
    if (!userData) {
      res.status(400).send({ message: "Invalid credentials" });
      return;
    }
    const goodPassword = bcrypt.compareSync(pwd, userData.password);
    if (!goodPassword) {
      res.status(400).send({ message: "Invalid credentials" });
      return;
    }
    res.send({ userData });
    return;
  } catch (error) {
    res.status(500).send({ message: "An error occured while login in" });
  }
};
