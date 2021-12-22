const db = require("../models");
const Game = db.games;

exports.create = async (req, res) => {
  if (!req.body.name || !req.body.price || !req.body.category) {
    res
      .status(400)
      .send({ message: `Please provide a name, a price and a category.` });
    return;
  }
  try {
    const [game, created] = await Game.findOrCreate({
      where: {
        name: req.body.name,
        price: req.body.price,
        category_id: req.body.category,
      },
    });

    if (!created) {
      res.send({ message: `Game already exists.` });
      return;
    } else res.send({ message: `Game created successfully`, game });
  } catch (error) {
    res.status(500).send({
      message: error.message || `An error occured while creating the Game.`,
    });
  }
};

exports.findByName = async (req, res) => {
  if (!req.params.name) {
    res.status(400).send({ message: `No Game name given.` });
    return;
  }
  try {
    const GameData = await Game.findOne({
      where: { name: req.params.name },
    });
    res.send(GameData);
  } catch (error) {
    res.status(500).send({
      message: error.message || `An error occured while finding the Game.`,
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const games = await Game.findAll();
    res.send(games);
  } catch (error) {
    res.status(500).send({
      message: error.message || `An error occured while retrieving the games`,
    });
  }
};

exports.update = async (req, res) => {
  if (!req.body.id) {
    res.status(400).send({ message: `No Game selected` });
    return;
  }
  try {
    const updateStatus = await Game.update(req.body, {
      where: { id: req.body.id },
    });
    if (updateStatus == 1) {
      res.send({ message: `Game was updated successfully.` });
      return;
    }
    res.send({
      message: `Cannot update Game. Maybe Game was not found.`,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || `An error occured while updating the Game`,
    });
  }
};

exports.delete = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({ message: `No Game selected` });
    return;
  }
  try {
    const updateStatus = await Game.destroy({
      where: { id: req.params.id },
    });
    if (updateStatus == 1) {
      res.send({ message: `Game was deleted successfully.` });
      return;
    }
    res.send({
      message: `Cannot delete Game. Maybe Game was not found.`,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || `An error occured while deleting the Game`,
    });
  }
};
