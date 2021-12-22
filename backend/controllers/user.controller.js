const db = require("../models");
const User = db.user;
const Game = db.games;

const bcrypt = require("bcrypt");

exports.create = async (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.status(400).send({
      message: `Please provide all information for creating a user account.`,
    });
    return;
  }

  let user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin ? true : false,
  };

  const alreadyExistingUserFound = await User.findOne({
    where: { username: user.username },
  });

  if (alreadyExistingUserFound) {
    res.send({
      message: `User with same username exist. Change username or did you mean to connect ?`,
    });
    return;
  }

  //user with same username not found. creation of new user.

  user.password = bcrypt.hashSync(user.password, 10);

  try {
    const userData = await User.create(user);
    res.send(userData);
    return;
  } catch (error) {
    res.status(500).send({
      message: error.message || `An error occured while creating a new user.`,
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const usersData = await User.findAll();
    res.send(usersData);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || `Some error occured while retrieving the users.`,
    });
  }
};

exports.findByUsername = async (req, res) => {
  if (!req.params.username) {
    res.status(400).send({ message: `No username given.` });
    return;
  }
  const username = req.params.username;

  try {
    const userData = await User.findOne({
      where: { username: username },
    });
    res.send(userData);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        `An error occured while finding user with name = ${username}`,
    });
  }
};

exports.update = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({ message: `No id selected.` });
    return;
  }
  const userId = req.params.id;

  try {
    const updateStatus = await User.update(req.body, { where: { id: userId } });
    if (updateStatus == 1)
      res.send({ message: `User was updated successfully.` });
    else
      res.send({
        message: `Cannot update user with id=${id}. Maybe user was not found`,
      });
  } catch (error) {
    res.status(500).send({
      message: error.message || `An error occured while updating the user.`,
    });
  }
};

exports.delete = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({ message: `No id selected.` });
    return;
  }

  const userId = req.params.id;

  try {
    const deleteStatus = await User.destroy({ where: { id: userId } });
    if (deleteStatus == 1) res.send({ message: `User deleted successfully.` });
    else
      res.send({
        message: `Cannot delete user with id = ${id}. Maybe user was not found.`,
      });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || `An error occured while deleting user with id = ${id}`,
    });
  }
};

exports.addAGame = async (req, res) => {
  if (!req.body.gameId || !req.body.userId) {
    res
      .status(400)
      .send({ message: `Please provide a game id and a user id.` });
    return;
  }
  try {
    let user = await User.findOne({ where: { id: req.body.userId } });
    await user.addGame(req.body.gameId);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || `An error occured while adding a game to the User.`,
    });
  }
};

exports.countMyGames = async (req, res) => {
  if (!req.query.userId) {
    res.status(400).send({ message: "No user provided!" });
    return;
  }
  try {
    const user = await User.findOne({ where: { id: req.query.userId } });
    const numberOfUserGames = await user.countGames();
    res.send({ numberOfUserGames: numberOfUserGames });
  } catch (error) {
    res.status(500).send({
      message: error.message || `An error occured while counting the games.`,
    });
  }
};

exports.getMyGames = async (req, res) => {
  if (!req.query.userId) {
    res.status(400).send({ message: "No user provided!" });
    return;
  }
  try {
    const user = await User.findOne({ where: { id: req.query.userId } });
    const myGames = await user.getGames();
    res.send({ myGames: myGames });
  } catch (error) {
    res.status(500).send({
      message: error.message || `An error occured while counting the games.`,
    });
  }
};

exports.removeAGame = async (req, res) => {
  if (!req.query.userId || !req.query.gameId) {
    res.status(400).send({ message: "No user or game provided!" });
    return;
  }
  try {
    const user = await User.findOne({ where: { id: req.query.userId } });
    const game = await Game.findOne({ where: { id: req.query.gameId } });
    await user.removeGame(game);
    res.send({ message: "Successfully removed" });
  } catch (error) {
    res.status(500).send({
      message: error.message || `An error occured while counting the games.`,
    });
  }
};
