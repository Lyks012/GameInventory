module.exports = (app) => {
  const category = require("../controllers/category.controller");
  let router = require("express").Router();

  router.get("/", category.findAll);

  router.get("/withGames", category.findWithGames);

  router.post("/", category.create);
  router.post("/:gameId", category.addAGame);

  router.put("/", category.update);

  router.delete("/:id", category.delete);

  app.use("/api/category", router);
};
