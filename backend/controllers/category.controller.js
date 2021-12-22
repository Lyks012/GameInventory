const db = require("../models");
const Category = db.category;

exports.create = async (req, res) => {
  if (!req.body.name) {
    res
      .status(400)
      .send({ message: `Please provide a name for the category.` });
    return;
  }
  try {
    const [category, created] = await Category.findOrCreate({
      where: { name: req.body.name },
    });

    if (!created) {
      res.send({ message: `Category already exists.` });
      return;
    } else res.send({ message: `Category created successfully`, category });
  } catch (error) {
    res.status(500).send({
      message: error.message || `An error occured while creating the category.`,
    });
  }
};

exports.findByName = async (req, res) => {
  if (!req.params.name) {
    res.status(400).send({ message: `No category name given.` });
    return;
  }
  try {
    const categoryData = await Category.findOne({
      where: { name: req.params.name },
    });
    res.send(categoryData);
  } catch (error) {
    res.status(500).send({
      message: error.message || `An error occured while finding the category.`,
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    // const categories = await Category.findAll({ include: [db.games] });
    const categories = await Category.findAll();
    res.send(categories);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || `An error occured while retrieving the categories`,
    });
  }
};

exports.update = async (req, res) => {
  if (!req.body.id) {
    res.status(400).send({ message: `No category selected` });
    return;
  }
  try {
    const updateStatus = await Category.update(req.body, {
      where: { id: req.body.id },
    });
    if (updateStatus == 1) {
      res.send({ message: `Category was updated successfully.` });
      return;
    }
    res.send({
      message: `Cannot update category. Maybe category was not found.`,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || `An error occured while updating the category`,
    });
  }
};

exports.delete = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({ message: `No category selected` });
    return;
  }
  try {
    const updateStatus = await Category.destroy({
      where: { id: req.params.id },
    });
    if (updateStatus == 1) {
      res.send({ message: `Category was deleted successfully.` });
      return;
    }
    res.send({
      message: `Cannot delete category. Maybe category was not found.`,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || `An error occured while deleting the category`,
    });
  }
};

exports.addAGame = async (req, res) => {
  if (!req.body.gameId) {
    res.status(400).send({ message: `Please provide a game id.` });
    return;
  }
  try {
    await Category.addGame(req.body.gameId);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        `An error occured while adding a game to the category.`,
    });
  }
};

exports.findWithGames = async (req, res) => {
  try {
    const categories = await Category.findAll({ include: [db.games] });
    res.send(categories);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || `An error occured while retrieving the categories`,
    });
  }
};
